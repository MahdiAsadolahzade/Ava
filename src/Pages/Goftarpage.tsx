import Dropdown from "../Components/DropDown";
import Sidemenu from "../Components/Sidemenu";
import Maintitle from "../Components/Maintitle";
import Mainbox from "../Components/Mainbox";
import Goftar from "../Components/Goftar";
import Maindescription from "../Components/Maindescription";


function Goftarpage() {
  return (
    <>
      <Maintitle></Maintitle>
      <Maindescription></Maindescription>
      <Dropdown></Dropdown>

      <Sidemenu></Sidemenu>

      <Mainbox></Mainbox>
      <Goftar></Goftar>

      
    </>
  );
}

export default Goftarpage;
