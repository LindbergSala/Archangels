import React, { useEffect, useState } from "react";
import { getEliteUnits } from "../api/api";

export default function EliteUnitList() {
  const [eliteUnits, setEliteUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getEliteUnits()
      .then(data => setEliteUnits(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading elite units...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Elite Units</h2>
      <ul>
        {eliteUnits.map(unit => (
          <li key={unit.id}>
            <b>{unit.unit_name}</b> (Captian: {unit.captain})<br />
            Specialization: {unit.specialization}<br />
            Gear: {unit.unique_gear}<br />
            Numbers of Missions: {unit.nr_missions}
          </li>
        ))}
      </ul>
    </div>
  );
}
