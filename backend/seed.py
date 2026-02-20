from models import init_db, get_connection

init_db()
conn = get_connection()
cur = conn.cursor()

cur.execute("DELETE FROM mastery")
cur.execute("DELETE FROM students")

cur.execute("INSERT INTO students (name) VALUES ('Aarav')")
cur.execute("INSERT INTO students (name) VALUES ('Luna')")

cur.execute("INSERT INTO mastery VALUES (NULL, 1, 'Numbers', 1, 0.8)")
cur.execute("INSERT INTO mastery VALUES (NULL, 1, 'Fractions', 2, 0.6)")
cur.execute("INSERT INTO mastery VALUES (NULL, 2, 'Numbers', 1, 0.9)")

conn.commit()
conn.close()

print("Seed complete")
