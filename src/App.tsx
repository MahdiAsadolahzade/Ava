
import "./index.css";
import Dropdown from "./Components/DropDown";
import Sidemenu from './Components/Sidemenu';
import {Maintitle} from './Components/Maintitle';
import {Maindescription} from './Components/Maindescription';

function App() {
  return (
    <>
    <div><Maintitle></Maintitle></div>
    <div><Maindescription></Maindescription></div>
    <div className="relative"><Dropdown></Dropdown></div>
    <div className="relative"><Sidemenu></Sidemenu></div>
    </>
  )

}

export default App;