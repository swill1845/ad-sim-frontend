import { useEffect, useState } from "react";
import {
  getHealth,
  getFrameworkStatus,
  runYear,
  getSaves,
  createSave,
  loadSave,
} from "./api";
import DashboardTab from "./components/DashboardTab";
import SavesTab from "./components/SavesTab";
import FinancesTab from "./components/FinancesTab";
import SportsTab from "./components/SportsTab";
import StaffTab from "./components/StaffTab";
import ProfileTab from "./components/ProfileTab"; 
import "./theme.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [health, setHealth] = useState(null);
  const [framework, setFramework] = useState(null);
  const [yearResult, setYearResult] = useState(null);
  const [saves, setSaves] = useState([]);
  const [saveName, setSaveName] = useState("");

  // Fetch backend and framework data
  const refreshData = async () => {
    const [h, f] = await Promise.all([getHealth(), getFrameworkStatus()]);
    setHealth(h);
    setFramework(f);
  };

  // Load all career saves
  const refreshSaves = async () => {
    const list = await getSaves();
    setSaves(list);
  };

  // Run one simulated year
  const handleRunYear = async () => {
    const result = await runYear();
    setYearResult(result);
  };

  // Create a new career save
  const handleCreateSave = async () => {
    if (!saveName) return alert("Enter a save name first.");
    const res = await createSave(saveName);
    alert(JSON.stringify(res, null, 2));
    setSaveName("");
    refreshSaves();
  };

  // Load an existing save
  const handleLoadSave = async (id) => {
    const res = await loadSave(id);
    alert(`Loaded save:\n${JSON.stringify(res, null, 2)}`);
  };

  // Initial data load
  useEffect(() => {
    refreshData();
    refreshSaves();
  }, []);

  // ✅ Tab Switcher
  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardTab
            health={health}
            framework={framework}
            yearResult={yearResult}
            onRunYear={handleRunYear}
          />
        );
      case "saves":
        return (
          <SavesTab
            saves={saves}
            saveName={saveName}
            setSaveName={setSaveName}
            onCreate={handleCreateSave}
            onLoad={handleLoadSave}
          />
        );
      case "finances":
        return <FinancesTab />;
      case "sports":
        return <SportsTab />;
      case "staff":
        return <StaffTab />;
      case "profile": 
        return <ProfileTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
        background: "#f0f2f5",
      }}
    >
      {/* Sidebar Navigation */}
      <aside
        style={{
          width: "230px",
          background: "#002147",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          padding: "20px",
        }}
      >
        <h2 style={{ color: "#FFD700", marginBottom: "30px" }}>🏛️ AD Simulator</h2>

        {[
          { id: "dashboard", label: "🏠 Dashboard" },
          { id: "saves", label: "💾 Career Saves" },
          { id: "finances", label: "📊 Finances" },
          { id: "sports", label: "🏟️ Sports" },
          { id: "staff", label: "🧑‍💼 Staff" },
          { id: "profile", label: "🎓 AD Profile" }, // Added here
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? "#FFD700" : "transparent",
              color: activeTab === tab.id ? "#002147" : "white",
              border: "none",
              textAlign: "left",
              fontSize: "16px",
              fontWeight: activeTab === tab.id ? "bold" : "normal",
              borderRadius: "6px",
              padding: "10px 12px",
              marginBottom: "8px",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id)
                e.currentTarget.style.background = "#0a3a7a";
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id)
                e.currentTarget.style.background = "transparent";
            }}
          >
            {tab.label}
          </button>
        ))}
      </aside>

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "#f6f8fa",
        }}
      >
        {/* Header Bar */}
        <header
          style={{
            background: "#ffffff",
            borderBottom: "1px solid #ddd",
            padding: "10px 25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left: School logo + info */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <img
              src="/school_logo.png"
              alt="School Logo"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "2px solid #FFD700",
                objectFit: "cover",
              }}
            />
            <div>
              <h1 style={{ margin: 0, fontSize: "20px", color: "#002147" }}>
                University of Texas Athletics
              </h1>
              <div style={{ fontSize: "13px", color: "#666" }}>
                Athletic Director: You (Prestige: 75)
              </div>
            </div>
          </div>

          {/* Right: Season info */}
          <div style={{ fontSize: "14px", color: "#666" }}>Season Year: 1</div>
        </header>

        {/* Dynamic Tab Content */}
        <div style={{ padding: "30px", flex: 1 }}>{renderTab()}</div>
      </main>
    </div>
  );
}
