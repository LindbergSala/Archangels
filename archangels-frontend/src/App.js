import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./components/Homepage";
import CharacterList from "./components/CharacterList";
import SquadList from "./components/SquadList";
// ...importera fler vid behov

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Hem</Link> |{" "}
        <Link to="/characters">Karaktärer</Link> |{" "}
        <Link to="/squads">Squads</Link>
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/characters" element={<CharacterList />} />
        <Route path="/squads" element={<SquadList />} />
        {/* Lägg till fler routes här om du vill */}
      </Routes>
    </Router>
  );
}

export default App;
