import { db } from "@/lib/db";

export default async function handler(req, res) {
  const [[students]] = await db.query("SELECT COUNT(*) AS total FROM students");
  const [[courses]] = await db.query("SELECT COUNT(*) AS total FROM courses");
  const [[clubs]] = await db.query("SELECT COUNT(*) AS total FROM clubs");
  const [[departments]] = await db.query(
    "SELECT COUNT(*) AS total FROM departments"
  );

  res.json({
    students: students.total,
    courses: courses.total,
    clubs: clubs.total,
    departments: departments.total,
  });
}
