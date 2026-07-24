"""
backfill_py_plain.py
One-off script: computes py_plain for every existing row in `senses`,
using tone_simplifier.strip_tones(). Safe to re-run more than once —
it just recomputes and overwrites py_plain each time (idempotent).
"""

import sqlite3
from tone_simplifier import strip_tones

DB_PATH = "chardrill.db"

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

rows = cursor.execute("SELECT id, py FROM senses").fetchall()
print(f"Found {len(rows)} rows to process.")

for sense_id, py in rows:
    py_plain = strip_tones(py)
    cursor.execute("UPDATE senses SET py_plain = ? WHERE id = ?", (py_plain, sense_id))

conn.commit()
print(f"Done. Updated {len(rows)} rows.")

# Quick sanity check right after
sample = cursor.execute("SELECT id, py, py_plain FROM senses LIMIT 5").fetchall()
print("Sample after backfill:", sample)

conn.close()