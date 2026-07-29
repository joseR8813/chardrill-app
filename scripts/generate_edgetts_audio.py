import sqlite3
import subprocess
import time
import os

VOICE = "zh-TW-HsiaoChenNeural"
DB_PATH = "D:/Education/Chinese/chinese_character_app/chardrill-app/chardrill.db"
AUDIO_OUTPUT_DIR = "D:/Education/Chinese/chinese_character_app/chardrill-app/static/audio"

def get_pending_senses():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        SELECT s.id, c.hz
        FROM senses s
        JOIN cards c ON c.id = s.card_id
        WHERE s.audio_file IS NULL OR s.audio_file = ''
    """)
    rows = cursor.fetchall()
    conn.close()
    return rows

def generate_audio_for_sense(sense_id, hz):
    filename = f"{sense_id}.mp3"
    filepath = os.path.join(AUDIO_OUTPUT_DIR, filename)

    cmd = [
        "edge-tts",
        "--voice", VOICE,
        "--text", hz,
        "--write-media", filepath
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode == 0:
        return filename
    else:
        print(f"FAILED sense_id={sense_id}: {result.stderr}")
        return None

def update_db(sense_id, filename):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("UPDATE senses SET audio_file = ? WHERE id = ?", (filename, sense_id))
    conn.commit()
    conn.close()

if __name__ == "__main__":
    rows = get_pending_senses()
    print(f"Found {len(rows)} senses to process")

    success_count = 0
    fail_count = 0

    for i, (sense_id, hz) in enumerate(rows, start=1):
        filename = generate_audio_for_sense(sense_id, hz)

        if filename:
            update_db(sense_id, filename)
            success_count += 1
        else:
            fail_count += 1

        if i % 100 == 0:
            print(f"Progress: {i}/{len(rows)} (success: {success_count}, failed: {fail_count})")

        time.sleep(0.1)

    print(f"Done. {success_count} succeeded, {fail_count} failed.")