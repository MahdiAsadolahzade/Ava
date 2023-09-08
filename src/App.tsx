import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Goftarpage from "./Pages/Goftarpage";
import Archivepage from "./Pages/Archivepage";

function App() {
  return (
    <>
      <Router>
        
        <Routes>
          <Route path="/Ava/" element={<Goftarpage />} />
          <Route path="/Ava/archive/" element={<Archivepage />} />
          {/* <Route path="*" element={<Navigate to="/Archivepage" />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
