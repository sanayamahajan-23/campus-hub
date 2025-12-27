import { db } from "@/lib/db";

export default async function handler(req, res) {
  const [rows] = await db.query(`
    SELECT courses.title AS course, COUNT(enrollments.student_id) AS total
    FROM courses
    LEFT JOIN enrollments ON enrollments.course_id = courses.id
    GROUP BY courses.id
  `);

  res.json(rows);
}
