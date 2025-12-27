"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/dashboard.module.css";
const badgeWrap = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginBottom: "12px",
};

const courseBadge = {
  background: "#667eea",
  color: "white",
  padding: "6px 14px",
  borderRadius: "20px",
  fontSize: "0.85rem",
};

const clubBadge = {
  background: "#4caf50",
  color: "white",
  padding: "6px 14px",
  borderRadius: "20px",
  fontSize: "0.85rem",
};
export default function StudentsRelations() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("/api/students-with-relations")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Students → Courses & Clubs</h1>
      <div className={styles.dashboard}>
        {students.map((s) => (
          <div key={s.id} className={styles.card}>
            <h3>{s.name}</h3>
            <p>
              <strong>Email:</strong> {s.email}
            </p>
            <p>
              <strong>Department:</strong> {s.department}
            </p>
            <div>
              <strong>Courses:</strong>
              <div style={badgeWrap}>
                {s.courses.map((c) => (
                  <span key={c} style={courseBadge}>
                    {c}
                  </span>
                ))}
              </div>

              <strong>Clubs:</strong>
              <div style={badgeWrap}>
                {s.clubs.map((c) => (
                  <span key={c} style={clubBadge}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
