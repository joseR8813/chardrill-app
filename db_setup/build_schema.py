"""
build_schema.py
Creates the five tables for the Chinese character drill app in chardrill.db.
Safe to run multiple times — uses CREATE TABLE IF NOT EXISTS.
"""

import sqlite3

DB_PATH = "chardrill.db"  # adjust if your file is literally named "chardrill" with no extension

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# Enforce foreign key constraints (SQLite has this off by default per-connection)
cursor.execute("PRAGMA foreign_keys = ON;")

# --- cards ---------------------------------------------------------------
# Pronunciation-agnostic. One row per unique character/word.
cursor.execute("""
CREATE TABLE IF NOT EXISTS cards (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    hz      TEXT NOT NULL,
    level   TEXT,               -- TOCFL L0-L5, blank for hand-added cards
    pile    TEXT NOT NULL DEFAULT 'new',  -- 'new' / 'practice' / 'mastered'
    streak  INTEGER NOT NULL DEFAULT 0,
    source  TEXT NOT NULL DEFAULT 'custom',  -- 'tocfl' or 'custom'
    book_source  TEXT                -- which textbook/wordlist this card came from, if any
);
""")

# --- senses ----------------------------------------------------------------
# One-to-many off cards. Handles polyphonic characters
# (e.g. 覺 as jué/verb vs jiào/noun) by keeping pronunciation here, not on cards.
cursor.execute("""
CREATE TABLE IF NOT EXISTS senses (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    card_id     INTEGER NOT NULL,
    py          TEXT,
    py_plain    TEXT,               -- toneless pinyin (search only, no diacritics/ü)
    zy          TEXT,               -- zhuyin, populated later by conversion step
    pos         TEXT,
    meaning     TEXT,
    classifier  TEXT,               -- measure word, e.g. 個/隻 - unused for now, fine blank
    "order"     INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE
);
""")

# --- variants ----------------------------------------------------------------
# Alternate written forms, e.g. 你/妳, 台灣/臺灣
cursor.execute("""
CREATE TABLE IF NOT EXISTS variants (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    card_id     INTEGER NOT NULL,
    hz_variant  TEXT NOT NULL,
    FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE
);
""")

# --- tags ----------------------------------------------------------------
# User-defined custom groupings, independent of TOCFL's native level field
cursor.execute("""
CREATE TABLE IF NOT EXISTS tags (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    name  TEXT NOT NULL UNIQUE
);
""")

# --- card_tags ----------------------------------------------------------------
# Join table - a card can have multiple custom tags
cursor.execute("""
CREATE TABLE IF NOT EXISTS card_tags (
    card_id  INTEGER NOT NULL,
    tag_id   INTEGER NOT NULL,
    PRIMARY KEY (card_id, tag_id),
    FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id)  REFERENCES tags(id)  ON DELETE CASCADE
);
""")

# --- history ----------------------------------------------------------------
# One row per day of drilling - powers the History tab's bar chart + log.
# Added after the original 5-table design; not linked to cards by design,
# it's just a daily aggregate (matches what the old artifact tracked).
cursor.execute("""
CREATE TABLE IF NOT EXISTS history (
    date     TEXT PRIMARY KEY,
    correct  INTEGER NOT NULL DEFAULT 0,
    total    INTEGER NOT NULL DEFAULT 0
);
""")

conn.commit()

# --- sanity check: list tables just created ---
cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';")
tables = [row[0] for row in cursor.fetchall()]
print(f"Tables in {DB_PATH}: {tables}")

conn.close()
