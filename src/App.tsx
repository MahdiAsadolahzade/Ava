import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Goftarpage from "./Pages/Goftarpage";
import Archivepage from "./Pages/Archivepage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Goftarpage />} />
          <Route path="/archive" element={<Archivepage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
