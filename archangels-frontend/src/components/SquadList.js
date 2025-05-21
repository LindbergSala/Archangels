import React, { useEffect, useState } from "react";
import { getSquads } from "../api/api";
import { Link } from "react-router-dom";

export default function SquadList() {
  const [squads, setSquads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getSquads()
      .then(data => setSquads(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Laddar squads...</div>;
  if (error) return <div>Fel: {error}</div>;

  return (
    <div>
      <h2>Alla Squads</h2>
      <ul>
        {squads.map(squad => (
          <li key={squad.id}>
            <Link to={`/squads/${squad.id}`}>
              {squad.name} ({squad.company}) – {squad.specialization}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
