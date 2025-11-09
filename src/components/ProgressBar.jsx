import React, { useState, useEffect } from "react";

export default function ProgressBar({ label, value }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(Math.min(value, 100)), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const getLevel = (val) => {
    if (val >= 90)
      return {
        title: "Legendary",
        color: "#B22222",
        glow: "rgba(178,34,34,0.6)",
      };
    if (val >= 80)
      return { title: "Elite", color: "#FFD700", glow: "rgba(255,215,0,0.5)" };
    if (val >= 70)
      return {
        title: "Respected",
        color: "#228B22",
        glow: "rgba(34,139,34,0.5)",
      };
    if (val >= 60)
      return {
        title: "Rising Star",
        color: "#1E90FF",
        glow: "rgba(30,144,255,0.6)",
      };
    if (val >= 50)
      return {
        title: "Developing",
        color: "#808080",
        glow: "rgba(128,128,128,0.4)",
      };
    return {
      title: "Unknown",
      color: "#C0C0C0",
      glow: "rgba(192,192,192,0.3)",
    };
  };

  const level = getLevel(value);

  return (
    <div
      style={{ marginBottom: "18px" }}
      title={`${label}: ${level.title}`}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}
      >
        <span style={{ fontWeight: "bold" }}>{label}</span>
        <span>{value}/100</span>
      </div>

      <div
        style={{
          width: "100%",
          height: "16px",
          backgroundColor: "#e0e0e0",
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${width}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${level.color}, ${lightenColor(
              level.color,
              0.25
            )})`,
            transition: "width 0.8s ease-in-out",
            boxShadow: `0 0 10px ${level.glow}`,
            animation: "pulseGlow 2.5s ease-in-out infinite",
          }}
        />
      </div>

      <div
        style={{
          fontSize: "13px",
          color: "#555",
          marginTop: "3px",
          fontStyle: "italic",
        }}
      >
        {level.title}
      </div>

      <style>{`
        @keyframes pulseGlow {
          0% { filter: brightness(1); }
          50% { filter: brightness(1.2); }
          100% { filter: brightness(1); }
        }
      `}</style>
    </div>
  );
}

function lightenColor(color, amount) {
  let col = color.replace("#", "");
  const num = parseInt(col, 16);
  const r = Math.min(255, (num >> 16) + 255 * amount);
  const g = Math.min(255, ((num >> 8) & 0x00ff) + 255 * amount);
  const b = Math.min(255, (num & 0x0000ff) + 255 * amount);
  return `rgb(${r},${g},${b})`;
}
