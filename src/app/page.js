"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main style={styles.container}>
      {/* Decorative floating shapes */}
      <div
        style={{
          ...styles.floatingShape,
          top: 50,
          left: 30,
          width: 140,
          height: 140,
          background: "rgba(255,255,255,0.08)",
        }}
      />
      <div
        style={{
          ...styles.floatingShape,
          top: 180,
          right: 60,
          width: 100,
          height: 100,
          background: "rgba(255,255,255,0.12)",
        }}
      />
      <div
        style={{
          ...styles.floatingShape,
          bottom: 120,
          left: 60,
          width: 120,
          height: 120,
          background: "rgba(255,255,255,0.1)",
        }}
      />
      <div
        style={{
          ...styles.floatingShape,
          bottom: 160,
          right: 80,
          width: 80,
          height: 80,
          background: "rgba(255,255,255,0.15)",
        }}
      />

      {/* Hero Card */}
      <div style={styles.heroCard}>
        <h1 style={styles.title}>CampusHub</h1>
        <p style={styles.subtitle}>Smart College Management Portal</p>

        <button style={styles.button} onClick={() => router.push("/dashboard")}>
          Go to Dashboard
        </button>
      </div>

      {/* Decorative SVG wave */}
      <svg
        style={styles.wave}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="rgba(255,255,255,0.05)"
          d="M0,128L80,154.7C160,181,320,235,480,250.7C640,267,800,245,960,229.3C1120,213,1280,203,1360,197.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
    </main>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)", // Modern deep blue gradient
    position: "relative",
    overflow: "hidden",
    padding: 20,
  },
  heroCard: {
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(20px)",
    padding: "60px 50px",
    borderRadius: 30,
    textAlign: "center",
    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    maxWidth: 480,
    width: "100%",
    zIndex: 10,
  },
  title: {
    fontSize: "3rem",
    marginBottom: 10,
    color: "white",
    textShadow: "0 4px 20px rgba(0,0,0,0.5)",
  },
  subtitle: {
    fontSize: "1.4rem",
    marginBottom: 40,
    color: "white",
    opacity: 0.9,
  },
  button: {
    padding: "18px 36px",
    fontSize: "1rem",
    borderRadius: 35,
    border: "none",
    cursor: "pointer",
    background: "#ffcd3c", // bright, appealing CTA color
    color: "#1f2937",
    fontWeight: "bold",
    transition: "0.3s",
    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
  },
  floatingShape: {
    position: "absolute",
    borderRadius: "50%",
    animation: "float 6s ease-in-out infinite alternate",
  },
  wave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 200,
    zIndex: 5,
  },
};

// Keyframes & hover effects
if (typeof window !== "undefined") {
  const styleEl = document.createElement("style");
  styleEl.innerHTML = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
      100% { transform: translateY(0px); }
    }
    button:hover {
      transform: translateY(-5px);
      box-shadow: 0 18px 40px rgba(0,0,0,0.45);
    }
    div[style*="heroCard"]:hover {
      transform: translateY(-8px);
      box-shadow: 0 35px 70px rgba(0,0,0,0.55);
    }
  `;
  document.head.appendChild(styleEl);
}
