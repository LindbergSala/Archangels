import React, { useEffect, useState } from "react";
import { getCharacters } from "../api/api";

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCharacters()
      .then(data => setCharacters(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Laddar karaktärer...</div>;
  if (error) return <div>Fel: {error}</div>;

  return (
    <div>
      <h2>Alla karaktärer</h2>
      <ul>
        {characters.map(char => (
          <li key={char.id}>
            {char.name} {char.title && `- ${char.title}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
