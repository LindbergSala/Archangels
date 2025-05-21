import React, { useEffect, useState } from "react";
import { getCharacters } from "../api/api";
import { Link } from "react-router-dom";

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
            <Link to={`/characters/${char.id}`}>
              {char.name} {char.title && `- ${char.title}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}