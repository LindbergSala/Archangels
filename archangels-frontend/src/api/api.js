// src/api/api.js
const API_BASE = "http://localhost:5000";

// Hämta alla karaktärer
export async function getCharacters() {
  const res = await fetch(`${API_BASE}/characters`);
  if (!res.ok) throw new Error("Kunde inte hämta karaktärer");
  return await res.json();
}
