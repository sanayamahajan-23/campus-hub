"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/dashboard.module.css";
import Charts from "@/components/Charts";

export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.card}>
          🎓 Students
          <br />
          {stats.students}
        </div>
        <div className={styles.card}>
          📘 Courses
          <br />
          {stats.courses}
        </div>
        <div className={styles.card}>
          🎭 Clubs
          <br />
          {stats.clubs}
        </div>
        <div className={styles.card}>
          🏫 Departments
          <br />
          {stats.departments}
        </div>
      </div>

      <Charts />
    </>
  );
}
