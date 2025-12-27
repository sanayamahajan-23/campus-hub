export default function Skeleton({ height = 20 }) {
  return (
    <div
      style={{
        height,
        width: "100%",
        borderRadius: 6,
        background: "linear-gradient(90deg, #1e293b, #334155, #1e293b)",
        animation: "pulse 1.5s infinite",
      }}
    />
  );
}
