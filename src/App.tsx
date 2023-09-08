import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Goftarpage from "./Pages/Goftarpage";
import Archivepage from "./Pages/Archivepage";

function App() {
  return (
    <>
      <Router >
        <Routes>
          <Route path="/" element={<Goftarpage />} />
          <Route path="/archive/" element={<Archivepage />} />
          <Route path="*" element={<Navigate to="/Ava/#/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
