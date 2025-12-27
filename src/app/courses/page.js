"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/dashboard.module.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  // Safe filter
  const filtered = courses.filter(
    (c) =>
      c.title?.toLowerCase().includes(query.toLowerCase()) ||
      c.department?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ marginBottom: "20px" }}>Courses</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search courses by title or department..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: 12,
          width: "100%",
          maxWidth: 400,
          borderRadius: 10,
          border: "none",
          marginBottom: 30,
          outline: "none",
          background: "#1e293b",
          color: "#f9fafb",
        }}
      />

      <div className={styles.dashboard}>
        {filtered.length > 0 ? (
          filtered.map((c) => (
            <div
              key={c.id}
              className={styles.card}
              style={{ transition: "transform 0.3s, box-shadow 0.3s" }}
            >
              <h3>{c.title}</h3>
              <p>
                <strong>Credits:</strong> {c.credits}
              </p>
              <p>
                <strong>Department:</strong>{" "}
                <span
                  style={{
                    background: "#3b82f6",
                    padding: "4px 10px",
                    borderRadius: 12,
                    fontSize: "0.85rem",
                  }}
                >
                  {c.department || "N/A"}
                </span>
              </p>
              <p>
                <strong>Enrolled Students:</strong>{" "}
                <span
                  style={{
                    background: "#22c55e",
                    padding: "4px 10px",
                    borderRadius: 12,
                    fontSize: "0.85rem",
                  }}
                >
                  {c.enrolled ?? 0}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p style={{ color: "#f87171" }}>No courses found.</p>
        )}
      </div>
    </div>
  );
}
