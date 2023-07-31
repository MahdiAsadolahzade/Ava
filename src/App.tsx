
import "./index.css";
import {Dropdown} from "./Components/DropDown";
import {Maintitle} from './Components/Maintitle';
import {Maindescription} from './Components/Maindescription';

function App() {
  return (
    <>
    <div><Maintitle></Maintitle></div>
    <div><Maindescription></Maindescription></div>
    <div><Dropdown></Dropdown></div>

    </>
  )

}

export default App;