import { db } from "@/lib/db";

export default async function handler(req, res) {
  const [students] = await db.query(`
    SELECT s.id, s.name, s.email, d.name AS department
    FROM students s
    JOIN departments d ON s.department_id = d.id
  `);

  const [enrollments] = await db.query(`
    SELECT e.student_id, c.title
    FROM enrollments e
    JOIN courses c ON e.course_id = c.id
  `);

  const [clubs] = await db.query(`
    SELECT cm.student_id, cl.name
    FROM club_memberships cm
    JOIN clubs cl ON cm.club_id = cl.id
  `);

  // Map courses and clubs per student
  const data = students.map((s) => {
    return {
      ...s,
      courses: enrollments
        .filter((e) => e.student_id === s.id)
        .map((e) => e.title),
      clubs: clubs.filter((c) => c.student_id === s.id).map((c) => c.name),
    };
  });

  res.json(data);
}
