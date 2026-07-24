"""
import_tocfl.py

Imports tocfl-cedict.csv into chardrill.db (cards, senses, variants tables).

USAGE:
    python import_tocfl.py                          # looks for tocfl-cedict.csv in this folder
    python import_tocfl.py path/to/tocfl-cedict.csv  # or point it at any file
    python import_tocfl.py my.csv --db other.db      # optionally target a different db

Safe to re-run: any existing rows with source='tocfl' are deleted before
re-importing, so you won't get duplicates from running this twice. Your own
hand-added cards (source='custom') are never touched.
"""

import argparse
import json
import re
import sqlite3
import sys

import pandas as pd
import dragonmapper.transcriptions as trans

# Matches a <br>-separated meaning block that OPENS with a hz/pinyin tag, e.g.:
#   "妳 [nǐ] you (informal...)"   -> hz="妳", py="nǐ", meaning="you (informal...)"
#   "[hào] to be fond of..."      -> hz="",  py="hào", meaning="to be fond of..."
# The hz portion is restricted to bare Chinese characters (0-6 of them) so that
# a bracket buried mid-sentence in an aside (e.g. "...also pr. [di4] or [di5]...")
# is NOT mistaken for a leading tag - it only matches brackets that genuinely
# open the block, not ones referenced partway through English prose.
BLOCK_PATTERN = re.compile(r'^\s*([\u4e00-\u9fff]{0,6})\s*\[([^\]]+)\]\s*(.*)$')

LEVEL_PATTERN = re.compile(r'^(L\d+)-')

# Matches an inline classifier annotation like "/CL:個|个[ge4],位[wei4]" that CEDICT
# tacks onto the end of a gloss. A single meaning can carry more than one of these
# (e.g. "telephone/CL:部[bu4]/phone call/CL:通[tong1]/phone number"), so this is
# applied with findall, not a single match.
CLASSIFIER_PATTERN = re.compile(r'/?CL:([^/]+)')


def extract_classifier(meaning):
    """
    Pulls all 'CL:...' annotations out of a meaning string and returns
    (classifier_str_or_None, cleaned_meaning). Multiple classifier tags in one
    meaning are joined with '; '. Leftover slashes left behind by removal are
    collapsed so the cleaned meaning doesn't end up with stray '//' or a
    trailing '/'.
    """
    if not meaning:
        return None, meaning
    matches = CLASSIFIER_PATTERN.findall(meaning)
    if not matches:
        return None, meaning
    classifier = "; ".join(m.strip() for m in matches)
    cleaned = CLASSIFIER_PATTERN.sub('', meaning)
    cleaned = re.sub(r'/+', '/', cleaned).strip('/').strip()
    return classifier, cleaned


def parse_args():
    parser = argparse.ArgumentParser(description="Import TOCFL CEDICT CSV into chardrill.db")
    parser.add_argument(
        "csv_path", nargs="?", default="tocfl-cedict.csv",
        help="Path to the TOCFL CSV file (default: tocfl-cedict.csv in the current folder)",
    )
    parser.add_argument(
        "--db", default="chardrill.db",
        help="Path to the SQLite database (default: chardrill.db in the current folder)",
    )
    return parser.parse_args()


def parse_level(id_str):
    m = LEVEL_PATTERN.match(str(id_str))
    return m.group(1) if m else None


def split_slash(value):
    """Split a slash-joined field like '你/妳' into ['你', '妳'], stripped."""
    if pd.isna(value):
        return []
    return [v.strip() for v in str(value).split('/') if v.strip()]


def parse_variants_json(variants_str):
    if pd.isna(variants_str) or not str(variants_str).strip():
        return []
    try:
        return json.loads(variants_str)
    except json.JSONDecodeError:
        return []


def collect_variant_hz(primary_hz, trad_tokens, simplified_raw, variants_json):
    """Gather every alternate written form for this card, deduped, excluding the primary hz."""
    seen = {primary_hz}
    variants = []

    def add(hz):
        if hz and hz not in seen:
            seen.add(hz)
            variants.append(hz)

    for t in trad_tokens[1:]:
        add(t)
    for v in variants_json:
        add(v.get("Traditional"))
    for s in split_slash(simplified_raw):
        add(s)

    return variants


def parse_senses(meaning, primary_hz, primary_py, pos):
    """
    Split a Meaning cell into one or more senses.
    Each <br>-separated block may carry its own '[pinyin]' (and optionally a
    leading hz, for a different written variant); blocks with neither fall
    back to this row's own hz/pinyin.
    POS isn't reliably alignable to individual blocks (compound POS strings
    don't consistently line up 1:1 with blocks), so the row's full POS string
    is stored on every sense derived from that row.
    """
    if pd.isna(meaning):
        return [{"hz": primary_hz, "py": primary_py, "meaning": None, "pos": pos}]

    blocks = [b.strip() for b in str(meaning).split('<br>')]
    senses = []
    for b in blocks:
        m = BLOCK_PATTERN.match(b)
        if m:
            hz_part = m.group(1).strip()
            py_part = m.group(2).strip()
            meaning_part = m.group(3).strip()
            hz = hz_part if hz_part else primary_hz
            py = py_part
        else:
            hz = primary_hz
            py = primary_py
            meaning_part = b
        senses.append({"hz": hz, "py": py, "meaning": meaning_part, "pos": pos})
    return senses


def safe_zhuyin(py):
    if not py:
        return None
    try:
        return trans.to_zhuyin(py)
    except Exception:
        pass
    try:
        # Rare case: a capitalized proper-noun vowel with a tone mark (e.g. "Ōuzhōu")
        # isn't recognized, but the same syllable lowercased is. Try that before giving up.
        return trans.to_zhuyin(py.lower())
    except Exception:
        return None  # leave blank rather than crash the whole import on one bad value


def main():
    args = parse_args()

    print(f"Reading {args.csv_path} ...")
    try:
        df = pd.read_csv(args.csv_path)
    except FileNotFoundError:
        print(f"ERROR: could not find '{args.csv_path}'. "
              f"Pass the full path, e.g.:\n  python import_tocfl.py \"D:/path/to/tocfl-cedict.csv\"")
        sys.exit(1)

    print(f"Loaded {len(df)} rows.")

    conn = sqlite3.connect(args.db)
    conn.execute("PRAGMA foreign_keys = ON;")
    cur = conn.cursor()

    # Safe to re-run: clear out any previously imported TOCFL data first.
    cur.execute("DELETE FROM senses WHERE card_id IN (SELECT id FROM cards WHERE source='tocfl');")
    cur.execute("DELETE FROM variants WHERE card_id IN (SELECT id FROM cards WHERE source='tocfl');")
    cur.execute("DELETE FROM card_tags WHERE card_id IN (SELECT id FROM cards WHERE source='tocfl');")
    cur.execute("DELETE FROM cards WHERE source='tocfl';")

    cards_inserted = 0
    senses_inserted = 0
    variants_inserted = 0
    zhuyin_failures = 0
    classifiers_extracted = 0

    for _, row in df.iterrows():
        level = parse_level(row["ID"])
        trad_tokens = split_slash(row["Traditional"])
        primary_hz = trad_tokens[0] if trad_tokens else str(row["Traditional"]).strip()
        variants_json = parse_variants_json(row.get("Variants"))

        cur.execute(
            "INSERT INTO cards (hz, level, pile, streak, source) VALUES (?, ?, 'new', 0, 'tocfl')",
            (primary_hz, level),
        )
        card_id = cur.lastrowid
        cards_inserted += 1

        # --- variants (alternate written forms) ---
        variant_hzs = collect_variant_hz(primary_hz, trad_tokens, row.get("Simplified"), variants_json)
        for hz in variant_hzs:
            cur.execute("INSERT INTO variants (card_id, hz_variant) VALUES (?, ?)", (card_id, hz))
            variants_inserted += 1

        # --- senses ---
        pos = row.get("POS")
        pos = None if pd.isna(pos) else str(pos)
        senses = parse_senses(row.get("Meaning"), primary_hz, row.get("Pinyin"), pos)

        for order, s in enumerate(senses):
            zy = safe_zhuyin(s["py"])
            if s["py"] and zy is None:
                zhuyin_failures += 1
            classifier, cleaned_meaning = extract_classifier(s["meaning"])
            if classifier:
                classifiers_extracted += 1
            cur.execute(
                """INSERT INTO senses (card_id, py, zy, pos, meaning, classifier, "order")
                   VALUES (?, ?, ?, ?, ?, ?, ?)""",
                (card_id, s["py"], zy, s["pos"], cleaned_meaning, classifier, order),
            )
            senses_inserted += 1

    conn.commit()
    conn.close()

    print()
    print("Import complete:")
    print(f"  cards inserted:    {cards_inserted}")
    print(f"  senses inserted:   {senses_inserted}")
    print(f"  variants inserted: {variants_inserted}")
    print(f"  classifiers extracted: {classifiers_extracted}")
    if zhuyin_failures:
        print(f"  zhuyin conversion failures (left blank): {zhuyin_failures}")


if __name__ == "__main__":
    main()
