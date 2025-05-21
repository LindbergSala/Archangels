import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./components/Homepage";
import CharacterList from "./components/CharacterList";
import SquadList from "./components/SquadList";
import SquadDetails from "./components/SquadDetails";
import CharacterDetails from "./components/CharacterDetails";
import EliteUnitList from "./components/EliteUnitList";
// ...importera fler vid behov

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Hem</Link> |{" "}
        <Link to="/characters">Karaktärer</Link> |{" "}
        <Link to="/squads">Squads</Link> |{" "}
        <Link to="/elite-units">Elite Units</Link>
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/characters" element={<CharacterList />} />
        <Route path="/squads" element={<SquadList />} />
        <Route path="/squads/:id" element={<SquadDetails />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/characters" element={<CharacterList />} />
        <Route path="/characters/:id" element={<CharacterDetails />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/characters" element={<CharacterList />} />
        <Route path="/squads" element={<SquadList />} />
        <Route path="/elite-units" element={<EliteUnitList />} />
        {/* Lägg till fler routes här om du vill */}
      </Routes>
    </Router>
  );
}

export default App;
