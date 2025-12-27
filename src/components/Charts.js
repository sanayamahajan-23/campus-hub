"use client";
import { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
} from "chart.js";
import { Bar, PolarArea } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale
);

export default function Charts() {
  const [studentsData, setStudentsData] = useState(null);
  const [coursesData, setCoursesData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const barRef = useRef(null);

  // Detect screen size
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    fetch("/api/students-per-department")
      .then((res) => res.json())
      .then((data) => {
        const colors = ["#3b82f6", "#22c55e", "#facc15", "#f472b6", "#f97316"];
        setStudentsData({
          labels: data.map((d) => d.department),
          datasets: [
            {
              label: "Students",
              data: data.map((d) => d.total),
              backgroundColor: colors.slice(0, data.length),
              borderRadius: 10,
              barThickness: isMobile ? 14 : 22,
            },
          ],
        });
      });

    fetch("/api/course-enrollments")
      .then((res) => res.json())
      .then((data) => {
        const colors = ["#3b82f6", "#22c55e", "#facc15", "#f472b6", "#f97316"];
        setCoursesData({
          labels: data.map((d) => d.course),
          datasets: [
            {
              data: data.map((d) => d.total),
              backgroundColor: colors.slice(0, data.length),
              hoverOffset: 8,
            },
          ],
        });
      });
  }, [isMobile]);

  return (
    <div
      style={{
        padding: isMobile ? "20px" : "40px",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <h2 style={{ marginBottom: 16 }}>Students per Department</h2>

      <div
        style={{
          height: isMobile ? "280px" : "420px",
        }}
      >
        {studentsData && (
          <Bar
            ref={barRef}
            data={studentsData}
            options={{
              indexAxis: isMobile ? "x" : "y", // 🔥 vertical on mobile
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: "#111827",
                  titleColor: "#f9fafb",
                  bodyColor: "#cbd5f5",
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: "#e5e7eb",
                    maxRotation: isMobile ? 45 : 0,
                    font: { size: isMobile ? 10 : 12 },
                  },
                  grid: { color: "rgba(255,255,255,0.08)" },
                },
                y: {
                  ticks: {
                    color: "#e5e7eb",
                    font: { size: isMobile ? 10 : 12 },
                  },
                  grid: { color: "rgba(255,255,255,0.05)" },
                },
              },
            }}
          />
        )}
      </div>

      <h2 style={{ margin: "40px 0 16px" }}>Course Enrollments</h2>

      <div
        style={{
          height: isMobile ? "300px" : "420px",
        }}
      >
        {coursesData && (
          <PolarArea
            data={coursesData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1000,
              },
              plugins: {
                legend: {
                  position: isMobile ? "bottom" : "right", // 🔥 key fix
                  labels: {
                    color: "#e5e7eb",
                    font: { size: isMobile ? 10 : 12 },
                    boxWidth: 10,
                  },
                },
                tooltip: {
                  backgroundColor: "#111827",
                  titleColor: "#f9fafb",
                  bodyColor: "#cbd5f5",
                },
              },
              scales: {
                r: {
                  ticks: {
                    color: "#e5e7eb",
                    font: { size: isMobile ? 9 : 11 },
                  },
                  grid: { color: "rgba(255,255,255,0.1)" },
                  angleLines: { color: "rgba(255,255,255,0.1)" },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
