import Dropdown from "../Components/DropMenu";
import Sidemenu from "../Components/Sidemenu";


function Archivepage() {
  return (
    <>
      <div className="grid grid-cols-9 gap-0">
        <div>
          <Sidemenu></Sidemenu>
        </div>
        <div className="col-span-8">
          <Dropdown></Dropdown>
        </div>
      </div>
    </>
  );
}

export default Archivepage;
