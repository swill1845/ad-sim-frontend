export default function SavesTab({ saves, saveName, setSaveName, onCreate, onLoad }) {
  return (
    <div>
      <h2>💾 Career Saves</h2>

      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Enter new save name"
          value={saveName}
          onChange={(e) => setSaveName(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button
          onClick={onCreate}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Create Save
        </button>
      </div>

      <div>
        {saves.length === 0 ? (
          <p>No saves found.</p>
        ) : (
          <ul>
            {saves.map((s) => (
              <li key={s.id}>
                <strong>{s.save_name}</strong> (School: {s.active_school}){" "}
                <button
                  onClick={() => onLoad(s.id)}
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "4px 8px",
                    cursor: "pointer",
                  }}
                >
                  Load
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
