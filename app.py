"""
app.py - Flask backend for the character drill app.

Serves the frontend (templates/index.html + static/) and exposes a small
JSON API backed by chardrill.db.

Cards and their readings live in separate tables: `cards` holds the
character and its pile, `senses` holds py/zy/meaning (one card can have
several senses). Card routes return each card's own fields plus a `senses`
list, added by attach_senses() and ordered by `order` (primary sense first).

Exception: POST /api/cards still returns the old flat shape
({id, hz, zy, py, mn, ...}). renderSenses() in app.js falls back to those
flat fields when a card has no `senses` list.

Run with:
    python app.py
Then open http://127.0.0.1:5000 in your browser.
"""

import sqlite3
from datetime import date, datetime, timezone
from tone_simplifier import strip_tones

from flask import Flask, g, jsonify, render_template, request

DATABASE = "chardrill.db"

app = Flask(__name__)


def get_db():
    """One connection per request, reused if called more than once in the same request."""
    if "db" not in g:
        g.db = sqlite3.connect(DATABASE)
        g.db.row_factory = sqlite3.Row
        g.db.execute("PRAGMA foreign_keys = ON;")
    return g.db


@app.teardown_appcontext
def close_db(exception=None):
    db = g.pop("db", None)
    if db is not None:
        db.close()


# ---------- Frontend ----------

@app.route("/")
def index():
    return render_template("index.html")


# ---------- Cards ----------

CARDS_BASE = """
    SELECT id, hz, level, source, pile, streak
    FROM cards
    ORDER BY id
"""

@app.route("/api/cards", methods=["GET"])
def get_cards():
    db = get_db()
    rows = db.execute(CARDS_BASE).fetchall()
    return jsonify(attach_senses(rows, db))

def attach_senses(cards_rows, db):
    """Fetch every sense for a list of cards and group them onto each card as card['senses']."""
    cards_list = [dict(r) for r in cards_rows]
    if not cards_list:
        return cards_list
    ids = [c["id"] for c in cards_list]
    placeholders = ",".join("?" for _ in ids)
    sense_rows = db.execute(f"""
        SELECT card_id, py, zy, pos, meaning, "order", audio_file
        FROM senses
        WHERE card_id IN ({placeholders})
        ORDER BY card_id, "order"
    """, ids).fetchall()

    senses_by_card = {}
    for s in sense_rows:
        sense = dict(s)
        # Backend owns the "where do audio files live" knowledge - hand the
        # frontend a ready-to-use URL instead of a bare filename.
        sense["audio_url"] = f"/static/audio/{sense['audio_file']}" if sense["audio_file"] else None
        senses_by_card.setdefault(s["card_id"], []).append(sense)

    for c in cards_list:
        c["senses"] = senses_by_card.get(c["id"], [])
    return cards_list


@app.route("/api/cards", methods=["POST"])
def add_card():
    data = request.get_json(force=True)
    hz = (data.get("hz") or "").strip()
    zy = (data.get("zy") or "").strip()
    py = (data.get("py") or "").strip()
    mn = (data.get("mn") or "").strip()

    if not hz or not py or not mn:
        return jsonify({"error": "hz, py, and mn are required"}), 400

    db = get_db()
    cur = db.execute(
        "INSERT INTO cards (hz, level, pile, streak, source) VALUES (?, NULL, 'new', 0, 'custom')",
        (hz,),
    )
    card_id = cur.lastrowid
    db.execute(
        'INSERT INTO senses (card_id, py, py_plain, zy, pos, meaning, classifier, "order") '
        "VALUES (?, ?, ?, ?, NULL, ?, NULL, 0)",
        (card_id, py, strip_tones(py), zy, mn)
    )
    db.commit()

    return jsonify({"id": card_id, "hz": hz, "zy": zy, "py": py, "mn": mn, "level": None, "source": "custom", "pile": "new", "streak": 0}), 201


@app.route("/api/cards/<int:card_id>", methods=["DELETE"])
def delete_card(card_id):
    db = get_db()
    db.execute("DELETE FROM cards WHERE id = ?", (card_id,))  # cascades to senses/variants/card_tags
    db.commit()
    return jsonify({"success": True})


@app.route("/api/cards/reset", methods=["POST"])
def reset_cards():
    """Bulk-reset a set of cards back to pile='new', streak=0. Used when a
    filtered set is fully mastered and the frontend wants to start it over."""
    data = request.get_json(force=True)
    ids = data.get("ids") or []
    if not ids:
        return jsonify([])

    db = get_db()
    placeholders = ",".join("?" for _ in ids)
    db.execute(
        f"UPDATE cards SET pile = 'new', streak = 0 WHERE id IN ({placeholders})",
        ids,
    )
    db.commit()

    rows = db.execute(
        f"SELECT id, pile, streak FROM cards WHERE id IN ({placeholders})", ids
    ).fetchall()
    return jsonify([dict(r) for r in rows])

# ---------- Tags / Sets ----------

@app.route("/api/tags", methods=["GET"])
def get_tags():
    db = get_db()
    rows = db.execute("""
        SELECT t.id, t.name, COUNT(ct.card_id) AS card_count
        FROM tags t
        LEFT JOIN card_tags ct ON ct.tag_id = t.id
        GROUP BY t.id
        ORDER BY t.name
    """).fetchall()
    return jsonify([dict(r) for r in rows])


@app.route("/api/tags", methods=["POST"])
def create_tag():
    data = request.get_json(force=True)
    name = (data.get("name") or "").strip()
    if not name:
        return jsonify({"error": "name is required"}), 400

    db = get_db()
    try:
        cur = db.execute("INSERT INTO tags (name) VALUES (?)", (name,))
        db.commit()
    except sqlite3.IntegrityError:
        return jsonify({"error": "a set with that name already exists"}), 409

    return jsonify({"id": cur.lastrowid, "name": name, "card_count": 0}), 201


@app.route("/api/tags/<int:tag_id>/cards", methods=["GET"])
def get_tag_cards(tag_id):
    db = get_db()
    rows = db.execute("""
        SELECT c.id, c.hz, c.level, c.source, c.pile, c.streak
        FROM cards c
        JOIN card_tags ct ON ct.card_id = c.id AND ct.tag_id = ?
        ORDER BY c.hz
    """, (tag_id,)).fetchall()
    return jsonify(attach_senses(rows, db))


@app.route("/api/cards/search", methods=["GET"])
def search_cards():
    q = request.args.get("q", "").strip()
    if not q:
        return jsonify([])

    db = get_db()
    like = f"%{q}%"
    exact = q.lower()
    starts = f"{q.lower()}%"
    rows = db.execute("""
        SELECT c.id, c.hz, c.level, c.source, c.pile, c.streak
        FROM cards c
        LEFT JOIN senses s ON s.card_id = c.id
        WHERE c.hz LIKE ? OR s.py LIKE ? OR s.py_plain LIKE ? OR s.meaning LIKE ?
        GROUP BY c.id
        ORDER BY MIN(
            CASE
                WHEN c.hz = ? OR s.py_plain = ?    THEN 1
                WHEN c.hz LIKE ? OR s.py_plain LIKE ?      THEN 2
                WHEN s.py LIKE ? OR s.py_plain LIKE ? OR c.hz LIKE ? THEN 3
                ELSE 4                          
            END
        )
        LIMIT 30
    """, (like, like, like, like,  exact, exact,  starts, starts,  like, like, like)).fetchall()
    return jsonify(attach_senses(rows, db))


@app.route("/api/cards/<int:card_id>/tags", methods=["POST"])
def add_card_tag(card_id):
    data = request.get_json(force=True)
    tag_id = data.get("tag_id")

    db = get_db()
    try:
        db.execute("INSERT INTO card_tags (card_id, tag_id) VALUES (?, ?)", (card_id, tag_id))
        db.commit()
    except sqlite3.IntegrityError:
        pass  # already tagged - treat as success rather than error

    return jsonify({"success": True})


@app.route("/api/cards/<int:card_id>/tags/<int:tag_id>", methods=["DELETE"])
def remove_card_tag(card_id, tag_id):
    db = get_db()
    db.execute("DELETE FROM card_tags WHERE card_id = ? AND tag_id = ?", (card_id, tag_id))
    db.commit()
    return jsonify({"success": True})

# ---------- Grading (drill) ----------

@app.route("/api/cards/<int:card_id>/grade", methods=["POST"])
def grade_card(card_id):
    data = request.get_json(force=True)
    correct = bool(data.get("correct"))

    db = get_db()
    row = db.execute("SELECT pile, streak FROM cards WHERE id = ?", (card_id,)).fetchone()
    if row is None:
        return jsonify({"error": "card not found"}), 404

    pile, streak = row["pile"], row["streak"]

    # Pile progression (updated 2026-07-24): a correct answer retires a card
    # immediately, whether it's new or practice - no "prove it twice" penalty
    # for cards you already know. A miss always lands in/stays in practice,
    # which is where repetition should concentrate.
    #   new / practice -> mastered on correct; -> practice on a miss
    #   mastered        -> terminal: stays mastered regardless of correct/miss
    if pile in ("new", "practice"):
        pile = "mastered" if correct else "practice"
    # mastered: no change either way - falls through untouched
    streak = 0

    db.execute("UPDATE cards SET pile = ?, streak = ? WHERE id = ?", (pile, streak, card_id))

    # Upsert today's history row
    today = date.today().isoformat()
    db.execute(
        """INSERT INTO history (date, correct, total) VALUES (?, ?, 1)
           ON CONFLICT(date) DO UPDATE SET
               correct = correct + excluded.correct,
               total = total + 1""",
        (today, 1 if correct else 0),
    )

    # Per-card review log: one row per grade (card history, phase 1).
    db.execute(
        """INSERT INTO card_reviews (card_id, reviewed_at, correct, pile_before, set_key)
           VALUES (?, ?, ?, ?, ?)""",
        (
            card_id,
            datetime.now(timezone.utc).isoformat(timespec="seconds"),
            1 if correct else 0,
            row["pile"],
            data.get("set_key"),
        ),
    )

    db.commit()

    today_row = db.execute("SELECT date, correct, total FROM history WHERE date = ?", (today,)).fetchone()

    return jsonify({
        "card": {"id": card_id, "pile": pile, "streak": streak},
        "today": dict(today_row),
    })


# ---------- History ----------

@app.route("/api/history", methods=["GET"])
def get_history():
    db = get_db()
    rows = db.execute("SELECT date, correct, total FROM history ORDER BY date").fetchall()
    return jsonify([dict(r) for r in rows])


@app.route("/api/history/reset", methods=["POST"])
def reset_history():
    db = get_db()
    db.execute("DELETE FROM history")
    db.commit()
    return jsonify({"success": True})

# ---------- Completed Sessions ----------

@app.route("/api/sessions", methods=["POST"])
def log_completed_session():
    data = request.get_json(force=True)

    set_key = data.get("set_key")
    set_label = data.get("set_label")
    started_at = data.get("started_at")
    completed_at = data.get("completed_at")
    correct_count = data.get("correct_count", 0)
    miss_count = data.get("miss_count", 0)

    if not all([set_key, set_label, started_at, completed_at]):
        return jsonify({"error": "missing required fields"}), 400

    # duration is computed server-side from the two timestamps rather than
    # trusted from the client, so a paused/suspended tab can't report a
    # bogus duration
    from datetime import datetime
    start_dt = datetime.fromisoformat(started_at)
    end_dt = datetime.fromisoformat(completed_at)
    duration_seconds = int((end_dt - start_dt).total_seconds())

    db = get_db()
    db.execute(
        """INSERT INTO completed_sessions
           (set_key, set_label, started_at, completed_at, duration_seconds, correct_count, miss_count)
           VALUES (?, ?, ?, ?, ?, ?, ?)""",
        (set_key, set_label, started_at, completed_at, duration_seconds, correct_count, miss_count),
    )
    db.commit()

    return jsonify({"success": True}), 201


@app.route("/api/sessions/today", methods=["GET"])
def get_todays_sessions():
    db = get_db()
    today = date.today().isoformat()
    rows = db.execute(
        """SELECT set_key, set_label, started_at, completed_at, duration_seconds,
                  correct_count, miss_count
           FROM completed_sessions
           WHERE date(completed_at, 'localtime') = ?
           ORDER BY completed_at""",
        (today,),
    ).fetchall()
    return jsonify([dict(r) for r in rows])


if __name__ == "__main__":
    app.run(debug=True)

