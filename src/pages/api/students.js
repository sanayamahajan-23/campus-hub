import { db } from "@/lib/db";

export default async function handler(req, res) {
  const [rows] = await db.query(`
    SELECT students.id, students.name, students.email,
           departments.name AS department
    FROM students
    JOIN departments ON students.department_id = departments.id
  `);

  res.status(200).json(rows);
}
