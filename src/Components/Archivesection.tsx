import Archiveicon from "../assets/Icons/Archiveicon";

export default function Archivesection() {
  return (
    <>
      <div className="flex flex-row justify-center my-[13px] mr-[10px]">
        <div className="flex flex-row items-center">
        <Archiveicon></Archiveicon>
        </div>
        <p className="text-[#ffffff] mr-[12px] " style={{ font: "700 16px" }}>
          آرشیو
        </p>
      </div>
      {/* icon of archive */}
    </>
  );
}
