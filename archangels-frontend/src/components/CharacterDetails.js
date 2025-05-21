import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function CharacterDetails() {
  const { id } = useParams();
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/characters/${id}/details`)
      .then(res => res.json())
      .then(data => setChar(data))
      .catch(() => setError("Kunde inte hämta karaktär"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!char) return <div>Character missing!</div>;

  return (
    <div>
      <h2>{char.name} {char.title && `– ${char.title}`}</h2>
      <p><b>Race:</b> {char.race}</p>
      <p><b>Faction:</b> {char.faction}</p>
      <p><b>Status:</b> {char.status}</p>
      <p><b>Psyker:</b> {char.psyker ? "Yes" : "No"}</p>
      {char.specializt && <p><b>Specialization:</b> {char.specializt}</p>}
      <hr/>
      <h3>Squad</h3>
      {char.squad_name ? (
        <p>
          {char.squad_name} ({char.squad_company})<br/>
          Specialization: {char.squad_specialization}<br/>
          Numbers of Missions: {char.squad_nr_missions}
        </p>
      ) : (
        <div>No squad assigned.</div>
      )}
      <h3>Gear</h3>
      {char.gear_name ? (
        <ul>
          <li><b>Name:</b> {char.gear_name}</li>
          <li><b>Weaoponry:</b> {char.gear_weapons}</li>
          <li><b>Armors:</b> {char.gear_armors}</li>
          <li><b>Special Equipment:</b> {char.gear_special_equipment}</li>
          <li><b>Relics/Artifacts:</b> {char.gear_relics_artifacts}</li>
        </ul>
      ) : (
        <div>No loadout assigned.</div>
      )}
      <p>
        <Link to="/characters">Back To Characters</Link>
      </p>
    </div>
  );
}
