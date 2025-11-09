export default function DashboardTab({ health, framework, yearResult, onRunYear }) {
  return (
    <div>
      <h2>🏠 Dashboard Overview</h2>
      <section>
        <h3>Backend Health</h3>
        <pre>{health ? JSON.stringify(health, null, 2) : "Loading..."}</pre>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Framework Status</h3>
        <pre>
          {framework ? JSON.stringify(framework, null, 2) : "Loading..."}
        </pre>
      </section>

      <section style={{ marginTop: 20 }}>
        <button
          onClick={onRunYear}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0066ff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Run Year
        </button>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Year Simulation Output</h3>
        <pre>
          {yearResult
            ? JSON.stringify(yearResult, null, 2)
            : "No simulation yet."}
        </pre>
      </section>
    </div>
  );
}

