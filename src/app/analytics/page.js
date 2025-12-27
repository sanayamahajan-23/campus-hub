import { db } from "@/lib/db";
import AnalyticsCharts from "@/components/AnalyticsCharts";

export default async function Analytics() {
  // Fetch department analytics including total enrollments
  const [deptData] = await db.query(`
    SELECT 
      d.name AS department,
      COUNT(DISTINCT s.id) AS students,
      COUNT(e.course_id) AS total_enrollments
    FROM departments d
    LEFT JOIN students s ON s.department_id = d.id
    LEFT JOIN enrollments e ON e.student_id = s.id
    GROUP BY d.id
  `);

  // Fetch clubs analytics
  const [clubsData] = await db.query(`
    SELECT 
      c.name AS club,
      COUNT(cm.student_id) AS members
    FROM clubs c
    LEFT JOIN club_memberships cm ON cm.club_id = c.id
    GROUP BY c.id
  `);

  // Fetch top courses
  const [coursesData] = await db.query(`
    SELECT 
      c.title AS course,
      COUNT(e.student_id) AS enrolled
    FROM courses c
    LEFT JOIN enrollments e ON e.course_id = c.id
    GROUP BY c.id
    ORDER BY enrolled DESC
    LIMIT 5
  `);

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ marginBottom: 24 }}>Analytics Overview</h1>

      <AnalyticsCharts
        deptData={deptData}
        clubsData={clubsData}
        coursesData={coursesData}
      />

      <h2 style={{ marginTop: 40, marginBottom: 24 }}>Clubs Overview</h2>
      <div style={dashboardGrid}>
        {clubsData.map((c) => (
          <div key={c.club} style={cardStyle}>
            <h3>{c.club}</h3>
            <p>Members: {c.members}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const cardStyle = {
  background: "linear-gradient(180deg, #1e293b, #020617)",
  borderRadius: 18,
  padding: 24,
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
};

const dashboardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: 24,
};
