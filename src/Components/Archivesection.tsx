import Archiveicon from "../assets/Icons/Archiveicon";

export default function Archivesection() {
  return (
    <>
      <div className="flex flex-row  my-[13px] ml-[20px]">
        <div className="flex flex-row items-center ml-auto">
        <Archiveicon></Archiveicon>
        </div>
        <div className="text-[#ffffff] mr-[12px] " style={{ font: "700 16px" }}>
          آرشیو
        </div>
      </div>
      {/* icon of archive */}
    </>
  );
}
