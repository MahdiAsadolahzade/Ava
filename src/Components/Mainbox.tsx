import Uploadicon from "../assets/Icons/Uploadicon";
import Linkicon from "../assets/Icons/Linkicon";
import { useState } from "react";
import Micicon from "../assets/Icons/Micicon";
import Voicerecording from "./Voicerecording";
import Link from "./Link";
import Uploadingfile from "./Uploadingfile";


function Mainbox() {
  const [selectedPlatform, setSelectedPlatform] = useState("record");

  return (
    <div className="w-[50%] flex flex-col justify-center items-center flex-wrap mt-[47px] mx-auto ">
      <div className=" buttons flex flex-row justify-start w-[100%] ">
        <button
          onClick={() => setSelectedPlatform("record")}
          className={`flex flex-row justify-center items-center text-[#969696]  ml-[15px] ${
            selectedPlatform === "record" &&
            "bg-teal-500 rounded-tl-[10px] rounded-tr-[10px] text-[#ffffff] w-auto h-[48px] p-[10px]"
          }`}
        >
          <div className="mx-[1px]"><Micicon></Micicon></div>
          ضبط صدا
        </button>
        <button
          onClick={() => setSelectedPlatform("upload")}
          className={`flex flex-row justify-center items-center text-[#969696] mx-[15px] ${
            selectedPlatform === "upload" &&
            " bg-[#118ad3] rounded-tl-[10px] rounded-tr-[10px] text-[#ffffff] w-auto h-[48px] p-[10px]"
          }`}
        >
          <div className="mx-[2px]"><Uploadicon></Uploadicon></div>
          بارگذاری فایل
        </button>

        <button
          onClick={() => setSelectedPlatform("link")}
          className={`flex flex-row justify-center items-center text-[#969696] mr-[15px] ${
            selectedPlatform === "link" &&
            "bg-[#ff1654] rounded-tl-[10px] rounded-tr-[10px] text-[#ffffff] w-auto h-[48px] p-[10px]"
          }`}
        >
          <div className="mx-[1px]"><Linkicon></Linkicon></div>
          لینک
        </button>
      </div>

      <div className="flex flex-row justify-center w-[100%]">
      {selectedPlatform === "record" && <Voicerecording />}
      {selectedPlatform === "upload" && <Uploadingfile />}
      {selectedPlatform === "link" && <Link />}
      </div>
    </div>
  );
}

export default Mainbox;
