import sqlite3
import requests
import time
import os
from keys import AZURE_API_KEY

REGION = "eastus"
ENDPOINT = f"https://{REGION}.tts.speech.microsoft.com/cognitiveservices/v1"
DB_PATH = "D:/Education/Chinese/chinese_character_app/chardrill-app/chardrill.db"
AUDIO_OUTPUT_DIR = "D:/Education/Chinese/chinese_character_app/chardrill-app/static/audio"

def get_flagged_senses():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        SELECT s.id, c.hz, s.zy
        FROM senses s
        JOIN cards c ON c.id = s.card_id
        WHERE c.id IN (
            SELECT card_id FROM senses
            JOIN cards ON cards.id = senses.card_id
            WHERE LENGTH(cards.hz) = 1
            GROUP BY card_id
            HAVING COUNT(*) > 1
        )
        AND (s.audio_file IS NULL OR s.audio_file = '')
    """)
    rows = cursor.fetchall()
    conn.close()
    return rows

def build_ssml(hz, zy):
    ssml = f'''<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="zh-TW">
<voice name="zh-TW-HsiaoChenNeural">
<phoneme alphabet="sapi" ph="{zy}">{hz}</phoneme>
</voice>
</speak>'''
    return ssml

def synthesize_via_azure(ssml, sense_id):
    headers = {
        "Ocp-Apim-Subscription-Key": AZURE_API_KEY,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
        "User-Agent": "chardrill-app"
    }

    response = requests.post(ENDPOINT, headers=headers, data=ssml.encode("utf-8"))

    if response.status_code == 200:
        filename = f"{sense_id}.mp3"
        filepath = os.path.join(AUDIO_OUTPUT_DIR, filename)
        with open(filepath, "wb") as f:
            f.write(response.content)
        return filename
    else:
        print(f"FAILED sense_id={sense_id}: {response.status_code} - {response.text}")
        return None

def update_db(sense_id, filename):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("UPDATE senses SET audio_file = ? WHERE id = ?", (filename, sense_id))
    conn.commit()
    conn.close()

if __name__ == "__main__":
    rows = get_flagged_senses()
    print(f"Found {len(rows)} senses to process")

    success_count = 0
    fail_count = 0

    for i, (sense_id, hz, zy) in enumerate(rows, start=1):
        ssml = build_ssml(hz, zy)
        filename = synthesize_via_azure(ssml, sense_id)

        if filename:
            update_db(sense_id, filename)
            success_count += 1
        else:
            fail_count += 1

        if i % 25 == 0:
            print(f"Progress: {i}/{len(rows)} (success: {success_count}, failed: {fail_count})")

        time.sleep(0.3)

    print(f"Done. {success_count} succeeded, {fail_count} failed.")