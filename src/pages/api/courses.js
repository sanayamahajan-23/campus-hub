import { db } from "@/lib/db";

export default async function handler(req, res) {
  const [rows] = await db.query(`
    SELECT 
      c.id,
      c.title,
      c.credits,
      d.name AS department,
      COUNT(e.student_id) AS enrolled
    FROM courses c
    LEFT JOIN departments d ON c.department_id = d.id
    LEFT JOIN enrollments e ON e.course_id = c.id
    GROUP BY c.id
  `);
  res.json(rows);
}
