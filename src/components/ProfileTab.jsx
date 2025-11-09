import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ProfileTab() {
  const [profile, setProfile] = useState({
    name: "Scott Williams",
    title: "Athletic Director",
    school: "University of Texas",
    yearsInRole: 3,
    championships: 1,
    prestige: 75,
    reputation: 68,
    finances: 82,
    morale: 61,
  });

  const [careerHistory] = useState([
    { year: 2022, school: "UTSA", achievement: "Improved Finances +20%" },
    { year: 2023, school: "UTSA", achievement: "Conference Title Win" },
    { year: 2024, school: "Texas", achievement: "Promotion to Power 5" },
  ]);

  const [jobOffers] = useState([
    { school: "Florida State", conference: "ACC", prestige: 82 },
    { school: "Oregon", conference: "Big Ten", prestige: 80 },
    { school: "USC", conference: "Big Ten", prestige: 84 },
  ]);

  const [seasonSummaries, setSeasonSummaries] = useState([
    { year: 2022, record: "6-6", budget: 85, prestige: 60, fanApproval: 70 },
    { year: 2023, record: "8-4", budget: 98, prestige: 68, fanApproval: 83 },
    { year: 2024, record: "10-2", budget: 112, prestige: 75, fanApproval: 91 },
  ]);

  function simulateNewSeason() {
    const last = seasonSummaries[seasonSummaries.length - 1];
    const next = {
      year: last.year + 1,
      record: "11-1",
      budget: Math.round(last.budget * 1.08),
      prestige: Math.min(last.prestige + 4, 100),
      fanApproval: Math.min(last.fanApproval + 3, 100),
    };
    setSeasonSummaries([...seasonSummaries, next]);
    setProfile((p) => ({
      ...p,
      yearsInRole: p.yearsInRole + 1,
      prestige: Math.min(p.prestige + 4, 100),
      reputation: Math.min(p.reputation + 3, 100),
      finances: Math.min(p.finances + 2, 100),
      morale: Math.min(p.morale + 3, 100),
    }));
  }

  return (
    <div style={{ padding: 20, maxWidth: 950, margin: "0 auto" }}>
      <h2 style={{ color: "#002147", marginBottom: 15 }}>
        🎓 Athletic Director Profile
      </h2>

      {/* Current Position */}
      <Card title="Current Position">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Title:</strong> {profile.title}</p>
        <p><strong>School:</strong> {profile.school}</p>
        <p><strong>Years in Role:</strong> {profile.yearsInRole}</p>
        <p><strong>Championships:</strong> {profile.championships}</p>
      </Card>

      {/* Metrics */}
      <Card title="Performance Metrics">
        <ProgressBar label="Prestige" value={profile.prestige} />
        <ProgressBar label="Reputation" value={profile.reputation} />
        <ProgressBar label="Finances" value={profile.finances} />
        <ProgressBar label="Department Morale" value={profile.morale} />
      </Card>

      {/* Season Summary */}
      <Card
        title="📅 Season Summaries"
        action={
          <button style={buttonStyle} onClick={simulateNewSeason}>
            ➕ Simulate Next Season
          </button>
        }
      >
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={th}>Year</th>
              <th style={th}>Record</th>
              <th style={th}>Budget ($M)</th>
              <th style={th}>Prestige</th>
              <th style={th}>Fan Approval</th>
            </tr>
          </thead>
          <tbody>
            {seasonSummaries.map((s) => (
              <tr key={s.year}>
                <td style={td}>{s.year}</td>
                <td style={td}>{s.record}</td>
                <td style={td}>{s.budget}</td>
                <td style={td}>{s.prestige}</td>
                <td style={td}>{s.fanApproval}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Graph */}
      <Card title="📈 Performance Trends">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={seasonSummaries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="prestige" stroke="#1E90FF" name="Prestige" />
            <Line dataKey="fanApproval" stroke="#32CD32" name="Fan Approval" />
            <Line dataKey="budget" stroke="#FFD700" name="Budget ($M)" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Career History */}
      <Card title="🏆 Career History">
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={th}>Year</th>
              <th style={th}>School</th>
              <th style={th}>Achievement</th>
            </tr>
          </thead>
          <tbody>
            {careerHistory.map((c) => (
              <tr key={c.year}>
                <td style={td}>{c.year}</td>
                <td style={td}>{c.school}</td>
                <td style={td}>{c.achievement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Job Offers */}
      <Card title="💼 Career Opportunities">
        <p style={{ color: "#666", fontSize: 14 }}>
          Job offers based on your current reputation and prestige:
        </p>
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={th}>School</th>
              <th style={th}>Conference</th>
              <th style={th}>Prestige</th>
              <th style={th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobOffers.map((o) => (
              <tr key={o.school}>
                <td style={td}>{o.school}</td>
                <td style={td}>{o.conference}</td>
                <td style={td}>{o.prestige}</td>
                <td style={td}>
                  <button
                    style={{ ...buttonStyle, background: "#FFD700", color: "#333" }}
                    onClick={() => alert(`You accepted the offer from ${o.school}!`)}
                  >
                    Accept Offer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ---------- Reusable Card Component ---------- */
function Card({ title, children, action }) {
  return (
    <div style={cardStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <h3 style={heading}>{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

/* ---------- Shared Styles ---------- */
const cardStyle = {
  background: "#fff",
  padding: 20,
  borderRadius: 8,
  boxShadow: "0 0 6px rgba(0,0,0,0.1)",
  marginBottom: 25,
};

const heading = { color: "#333", margin: 0 };

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: 10,
};

const th = {
  textAlign: "left",
  padding: 8,
  borderBottom: "2px solid #ddd",
};

const td = {
  padding: 8,
  borderBottom: "1px solid #eee",
  color: "#444",
};

const buttonStyle = {
  background: "#1E90FF",
  border: "none",
  borderRadius: 6,
  padding: "6px 12px",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
};

