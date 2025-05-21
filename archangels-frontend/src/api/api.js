// src/api/api.js
const API_BASE = "http://localhost:5000";

// Hämta alla karaktärer
export async function getCharacters() {
  const res = await fetch(`${API_BASE}/characters`);
  if (!res.ok) throw new Error("Kunde inte hämta karaktärer");
  return await res.json();
}

// src/api/api.js
export async function getSquads() {
  const res = await fetch("http://localhost:5000/squads");
  if (!res.ok) throw new Error("Kunde inte hämta squads");
  return await res.json();
}

export async function getEliteUnits() {
  const res = await fetch("http://localhost:5000/elite_units");
  if (!res.ok) throw new Error("Kunde inte hämta elite units");
  return await res.json();
}
