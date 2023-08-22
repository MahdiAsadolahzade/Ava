import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Goftarpage from "./Pages/Goftarpage";
import Archivepage from "./Pages/Archivepage";

function App() {
  return (
    <>
      <Router 
      basename={import.meta.env.DEV ? '/' : '/Ava/'}
      >
        <Routes>
          <Route path="/Ava/" element={<Goftarpage />} />
          <Route path="/archive" element={<Archivepage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
