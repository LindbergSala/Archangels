import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function SquadDetails() {
  const { id } = useParams();
  const [squad, setSquad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/squads/${id}/details`)
      .then(res => res.json())
      .then(data => setSquad(data))
      .catch(err => setError("Kunde inte hämta squad"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!squad) return <div>Squad Missing!</div>;

  return (
    <div>
      <h2>{squad.name} ({squad.company})</h2>
      <p><b>Specialization:</b> {squad.specialization}</p>
      <p><b>Numbers of Missions:</b> {squad.nr_missions}</p>
      <h3>Gear</h3>
      {squad.gear_name ? (
        <ul>
          <li><b>Name:</b> {squad.gear_name}</li>
          <li><b>Weaoponry:</b> {squad.weapons}</li>
          <li><b>Armors:</b> {squad.armors}</li>
          <li><b>Special Equipment:</b> {squad.special_equipment}</li>
          <li><b>Relics/Artifacts:</b> {squad.relics_artifacts}</li>
        </ul>
      ) : (
        <div>No loadout equipt.</div>
      )}
      <h3>Members</h3>
      {squad.members && squad.members.length > 0 ? (
        <ul>
          {squad.members.map(member => (
            <li key={member.id}>
              {member.name} {member.title && `- ${member.title}`} ({member.race})
              {member.psyker ? " [Psyker]" : ""}
              {member.specializt && <> – <i>{member.specializt}</i></>}
            </li>
          ))}
        </ul>
      ) : (
        <div>No named characters in this squad.</div>
      )}
      <p>
        <Link to="/squads">Back to squads</Link>
      </p>
    </div>
  );
}
