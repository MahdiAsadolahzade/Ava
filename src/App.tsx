import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Goftarpage from "./Pages/Goftarpage";
import Archivepage from "./Pages/Archivepage";

function App() {
  return (
    <>
      <Router >
        <Routes>
          <Route path="/Ava/" element={<Goftarpage />} />
          <Route path="/Ava/archive/" element={<Archivepage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
