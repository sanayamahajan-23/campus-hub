import { db } from "@/lib/db";

export default async function handler(req, res) {
  const [rows] = await db.query(`
    SELECT departments.name AS department, COUNT(students.id) AS total
    FROM departments
    LEFT JOIN students ON students.department_id = departments.id
    GROUP BY departments.id
  `);

  res.json(rows);
}
