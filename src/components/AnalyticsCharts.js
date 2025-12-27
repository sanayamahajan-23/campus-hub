"use client";
import { useEffect, useState } from "react";
import { Bar, Doughnut, PolarArea } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale
);

export default function AnalyticsCharts({ deptData, clubsData, coursesData }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const animation = { duration: 1000, easing: "easeInOutQuart" };
  const gradientColor = (index) =>
    ["#3b82f6", "#22c55e", "#f97316", "#eab308", "#8b5cf6"][index % 5];

  const avgCoursesPerDept = deptData.map((d) => ({
    department: d.department,
    avg: d.students > 0 ? d.total_enrollments / d.students : 0,
  }));

  return (
    <div style={{ display: "grid", gap: 24 }}>
      {/* Row 1: Clubs & Top Courses */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 24,
        }}
      >
        <ChartCard title="Club Memberships" isMobile={isMobile}>
          <PolarArea
            data={{
              labels: clubsData.map((c) => c.club),
              datasets: [
                {
                  data: clubsData.map((c) => c.members),
                  backgroundColor: clubsData.map((_, i) => gradientColor(i)),
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              animation,
              plugins: {
                legend: {
                  position: isMobile ? "bottom" : "right",
                  labels: {
                    color: "#e5e7eb",
                    font: { size: isMobile ? 10 : 12 },
                  },
                },
              },
              scales: {
                r: {
                  ticks: { color: "#e5e7eb" },
                  grid: { color: "rgba(255,255,255,0.1)" },
                },
              },
            }}
          />
        </ChartCard>

        <ChartCard title="Top Courses by Enrollment" isMobile={isMobile}>
          <Doughnut
            data={{
              labels: coursesData.map((c) => c.course),
              datasets: [
                {
                  data: coursesData.map((c) => c.enrolled),
                  backgroundColor: coursesData.map((_, i) => gradientColor(i)),
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              animation,
              plugins: {
                legend: {
                  position: isMobile ? "bottom" : "right",
                  labels: {
                    color: "#e5e7eb",
                    font: { size: isMobile ? 10 : 12 },
                  },
                },
              },
            }}
          />
        </ChartCard>
      </div>

      {/* Row 2: Average Courses per Department */}
      <ChartCard title="Average Courses per Department" isMobile={isMobile}>
        <Bar
          data={{
            labels: avgCoursesPerDept.map((d) => d.department),
            datasets: [
              {
                label: "Avg Courses",
                data: avgCoursesPerDept.map((d) => Number(d.avg.toFixed(2))),
                backgroundColor: avgCoursesPerDept.map((_, i) =>
                  gradientColor(i)
                ),
                borderRadius: 10,
                barThickness: isMobile ? 14 : 20,
              },
            ],
          }}
          options={{
            indexAxis: isMobile ? "x" : "y",
            responsive: true,
            maintainAspectRatio: false,
            animation,
            plugins: { legend: { display: false } },
            scales: {
              x: {
                ticks: { color: "#e5e7eb", font: { size: isMobile ? 10 : 12 } },
                grid: { color: "rgba(255,255,255,0.08)" },
              },
              y: {
                ticks: { color: "#e5e7eb", font: { size: isMobile ? 10 : 12 } },
                grid: { color: "rgba(255,255,255,0.05)" },
              },
            },
          }}
        />
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, children, isMobile }) {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #1e293b, #020617)",
        borderRadius: 18,
        padding: 20,
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      }}
    >
      <h3>{title}</h3>
      <div className="chart-wrapper" style={{ height: isMobile ? 260 : 360 }}>
        {children}
      </div>
    </div>
  );
}
