from flask import Blueprint, jsonify
from models import get_connection

api = Blueprint("api", __name__)

@api.route("/")
def health():
    return "Backend is running"

@api.route("/students")
def students():
    conn = get_connection()
    students = conn.execute("SELECT * FROM students").fetchall()

    data = []
    for s in students:
        mastery = conn.execute(
            "SELECT concept, level, mastery FROM mastery WHERE student_id=?",
            (s["id"],)
        ).fetchall()

        data.append({
            "id": s["id"],
            "name": s["name"],
            "mastery": [dict(m) for m in mastery]
        })

    conn.close()
    return jsonify(data)

from flask import Blueprint, jsonify
from models import get_connection

api = Blueprint("api", __name__)

@api.route("/")
def health():
    return "Backend is running"

@api.route("/students")
def students():
    conn = get_connection()
    students = conn.execute("SELECT * FROM students").fetchall()

    data = []
    for s in students:
        mastery = conn.execute(
            "SELECT concept, level, mastery FROM mastery WHERE student_id=?",
            (s["id"],)
        ).fetchall()

        data.append({
            "id": s["id"],
            "name": s["name"],
            "mastery": [dict(m) for m in mastery]
        })

    conn.close()
    return jsonify(data)
