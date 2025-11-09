const BASE = "http://localhost:8000"; // backend server

console.log("Backend base URL:", BASE);


export async function getHealth() {
  const res = await fetch(`${BASE}/api/health`);
  return await res.json();
}

export async function getFrameworkStatus() {
  const res = await fetch(`${BASE}/api/framework/status`);
  return await res.json();
}

export async function runYear() {
  const res = await fetch(`${BASE}/api/framework/run_year`);
  return await res.json();
}

export async function getSaves() {
  const res = await fetch("http://127.0.0.1:8000/api/saves");
  return await res.json();
}

export async function createSave(save_name, active_school = "TEX") {
  const res = await fetch("http://127.0.0.1:8000/api/saves/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ save_name, active_school }),
  });
  return await res.json();
}

export async function loadSave(id) {
  const res = await fetch(`http://127.0.0.1:8000/api/saves/load/${id}`);
  return await res.json();
}
