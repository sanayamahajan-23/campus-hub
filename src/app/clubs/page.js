"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/dashboard.module.css";

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/clubs") // API should return [{id, name, members: [{id,name}]}]
      .then((res) => res.json())
      .then((data) => setClubs(data));
  }, []);

  const filtered = clubs.filter((c) =>
    c.name?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ marginBottom: "20px" }}>Clubs</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search clubs..."
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
              style={{
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
            >
              <h3>{c.name}</h3>
              <p>
                <strong>Members:</strong>{" "}
                <span
                  style={{
                    background: "#22c55e",
                    padding: "4px 10px",
                    borderRadius: 12,
                    fontSize: "0.85rem",
                  }}
                >
                  {c.members?.length ?? 0}
                </span>
              </p>

              {/* Show top 3 members */}
              {c.members && c.members.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  <strong>Top Members:</strong>
                  <ul style={{ paddingLeft: 20, marginTop: 4 }}>
                    {c.members.slice(0, 3).map((m) => (
                      <li key={m.id} style={{ fontSize: "0.85rem" }}>
                        {m.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <p style={{ color: "#f87171" }}>No clubs found.</p>
        )}
      </div>
    </div>
  );
}
