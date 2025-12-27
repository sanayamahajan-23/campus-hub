import { db } from "@/lib/db";

export default async function handler(req, res) {
  const { id } = req.query;

  const [[student]] = await db.query(
    `
    SELECT s.id, s.name, s.email, d.name AS department
    FROM students s
    JOIN departments d ON s.department_id = d.id
    WHERE s.id = ?
  `,
    [id]
  );

  const [courses] = await db.query(
    `
    SELECT c.title
    FROM enrollments e
    JOIN courses c ON e.course_id = c.id
    WHERE e.student_id = ?
  `,
    [id]
  );

  const [clubs] = await db.query(
    `
    SELECT cl.name
    FROM club_memberships cm
    JOIN clubs cl ON cm.club_id = cl.id
    WHERE cm.student_id = ?
  `,
    [id]
  );

  res.json({
    ...student,
    courses: courses.map((c) => c.title),
    clubs: clubs.map((c) => c.name),
  });
}
