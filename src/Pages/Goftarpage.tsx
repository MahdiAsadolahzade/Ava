import Dropmenu from "../Components/DropMenu";
import Sidemenu from "../Components/Sidemenu";
import Maintitle from "../Components/Maintitle";
import Mainbox from "../Components/Mainbox";
import Goftar from "../Components/Goftar";
import Maindescription from "../Components/Maindescription";

function Goftarpage() {
  return (
    <>
      <div className="grid grid-cols-9  gap-0">
        <div>
          <Sidemenu></Sidemenu>
        </div>
        <div className="col-span-8">
        <Dropmenu></Dropmenu>
          <Maintitle></Maintitle>
          <Maindescription></Maindescription>
          <Mainbox></Mainbox>
          <Goftar></Goftar>
          
        </div>
      </div>
    </>
  );
}

export default Goftarpage;
