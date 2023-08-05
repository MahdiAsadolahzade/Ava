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
    <div className="w-[70%] flex flex-row justify-center ">
      <button
        onClick={() => setSelectedPlatform("record")}
        className={`flex flex-row justify-center text-[#969696]  ${
          selectedPlatform === "record" &&
          "bg-teal-500 rounded-tl-[10px] rounded-tr-[10px] text-[#ffffff] "
        }`}
      >
        <Micicon></Micicon>
        ضبط صدا
      </button>

      <button
        onClick={() => setSelectedPlatform("upload")}
        className={`flex flex-row justify-center text-[#969696]  ${
          selectedPlatform === "upload" &&
          "bg-[#118ad3] rounded-tl-[10px] rounded-tr-[10px] text-[#ffffff] "
        }`}
      >
        <Uploadicon></Uploadicon>
        بارگذاری فایل
      </button>

      <button
        onClick={() => setSelectedPlatform("link")}
        className={`flex flex-row justify-center text-[#969696]  ${
          selectedPlatform === "link" &&
          "bg-[#ff1654] rounded-tl-[10px] rounded-tr-[10px] text-[#ffffff] "
        }`}
      >
        <Linkicon></Linkicon>
        لینک
      </button>

      {selectedPlatform === "record" && <Voicerecording />}
      {selectedPlatform === "upload" && <Voicerecording />}
      {selectedPlatform === "link" && <Voicerecording />}
    </div>
  );
}

export default Mainbox;
