import Dropdown from "../Components/DropMenu";
import Sidemenu from "../Components/Sidemenu";
import Archivetitle from "../Components/Archivetitle";
import ArchiveTable from "../Components/ArchiveTable";

function Archivepage() {
  return (
    <>
      <div className="grid grid-cols-9 gap-0">
        <div>
          <Sidemenu></Sidemenu>
        </div>
        <div className="col-span-8">
          <Dropdown></Dropdown>
          <Archivetitle></Archivetitle>
          <ArchiveTable></ArchiveTable>
        </div>
      </div>
    </>
  );
}

export default Archivepage;
