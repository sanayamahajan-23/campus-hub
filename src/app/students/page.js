"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/dashboard.module.css";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState(""); // search query

  // Fetch students
  useEffect(() => {
    fetch("/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  // Filter students by search query (name or department)
  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.department.toLowerCase().includes(query.toLowerCase())
  );

  // Highlight matching text
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span
          key={i}
          style={{
            background: "#facc15",
            color: "#000",
            padding: "2px 4px",
            borderRadius: 4,
          }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ marginBottom: "20px" }}>Students</h1>

      {/* Search & Clear */}
      <div
        style={{ marginBottom: 30, display: "flex", gap: 10, flexWrap: "wrap" }}
      >
        <input
          type="text"
          placeholder="Search students by name or department..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: 12,
            width: "100%",
            maxWidth: 400,
            borderRadius: 10,
            border: "none",
            outline: "none",
          }}
        />
        <button
          onClick={() => setQuery("")}
          style={{
            padding: "12px 16px",
            borderRadius: 10,
            background: "#f87171",
            color: "white",
            fontWeight: "500",
            cursor: "pointer",
            border: "none",
            transition: "0.3s",
          }}
        >
          Clear
        </button>
      </div>

      {/* Students Grid */}
      <div className={styles.dashboard}>
        {filtered.length > 0 ? (
          filtered.map((s) => (
            <div key={s.id} className={styles.card}>
              <h3>{highlightMatch(s.name, query)}</h3>
              <p>{highlightMatch(s.department, query)}</p>

              <a
                href={`/students/${s.id}`}
                style={{
                  marginTop: "12px",
                  display: "inline-block",
                  color: "#93c5fd",
                  fontWeight: "500",
                  transition: "0.3s",
                }}
              >
                View Profile →
              </a>
            </div>
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              border: "1px dashed #f87171",
              borderRadius: 12,
              background: "rgba(248, 113, 113, 0.1)",
              color: "#f87171",
              fontWeight: 500,
            }}
          >
            No students found for "{query}"
          </div>
        )}
      </div>
    </div>
  );
}
