"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

/* Badge styles */
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
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s",
};

const clubBadge = {
  ...courseBadge,
  background: "#4caf50",
};

/* Skeleton loader component */
function Skeleton({ height = 20 }) {
  return (
    <div
      style={{
        height,
        width: "100%",
        borderRadius: 8,
        background: "linear-gradient(90deg, #1e293b, #334155, #1e293b)",
        backgroundSize: "200% 100%",
        animation: "pulse 1.4s infinite",
        marginBottom: 12,
      }}
    />
  );
}

export default function StudentProfile() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/student/${id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }, [id]);

  if (!student) {
    return (
      <div style={{ padding: 40, maxWidth: 720, margin: "0 auto" }}>
        <Skeleton height={80} />
        <Skeleton />
        <Skeleton />
        <Skeleton height={40} />
      </div>
    );
  }

  const avatar = student.name.charAt(0).toUpperCase();

  return (
    <div
      style={{
        padding: 32,
        maxWidth: 720,
        margin: "40px auto",
        background: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(14px)",
        borderRadius: 24,
        boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
      }}
    >
      <a
        href="/students"
        style={{
          display: "inline-block",
          marginBottom: 16,
          color: "#93c5fd",
          fontSize: "0.9rem",
        }}
      >
        ← Back to Students
      </a>

      {/* Avatar */}
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #6366f1, #22d3ee)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2.2rem",
          fontWeight: "bold",
          marginBottom: 20,
          boxShadow: "0 0 0 6px rgba(99,102,241,0.15)",
        }}
      >
        {avatar}
      </div>

      {/* Student info */}
      <h1>{student.name}</h1>
      <p>
        <strong>Email:</strong> {student.email}
      </p>
      <p>
        <strong>Department:</strong> {student.department}
      </p>

      {/* Courses */}
      <h3>Courses</h3>
      <div style={badgeWrap}>
        {student.courses.map((c) => (
          <span
            key={c}
            style={courseBadge}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {c}
          </span>
        ))}
      </div>

      {/* Clubs */}
      <h3 style={{ marginTop: 20 }}>Clubs</h3>
      <div style={badgeWrap}>
        {student.clubs.map((c) => (
          <span
            key={c}
            style={clubBadge}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
