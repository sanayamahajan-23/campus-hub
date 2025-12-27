import { db } from "@/lib/db";

export default async function handler(req, res) {
  // Get all clubs with their members
  const [clubs] = await db.query(`
    SELECT 
      c.id AS club_id,
      c.name AS club_name,
      s.id AS student_id,
      s.name AS student_name
    FROM clubs c
    LEFT JOIN club_memberships cm ON cm.club_id = c.id
    LEFT JOIN students s ON s.id = cm.student_id
    ORDER BY c.id
  `);

  // Transform flat results into nested structure
  const clubsMap = {};
  clubs.forEach((row) => {
    if (!clubsMap[row.club_id]) {
      clubsMap[row.club_id] = {
        id: row.club_id,
        name: row.club_name,
        members: [],
      };
    }
    if (row.student_id) {
      clubsMap[row.club_id].members.push({
        id: row.student_id,
        name: row.student_name,
      });
    }
  });

  res.json(Object.values(clubsMap));
}
