import Uploadingfilebutton from "./Uploadingfilebutton";
import Linkbutton from "./Linkbutton";
import Voicerecordingbutton from "./Voicerecordingbutton";
import { useState } from "react";

function Mainbox() {
  return (
    <div className="relative">
      <a className=" absolute left-[870px] top-[251px] ">
        <Voicerecordingbutton />
      </a>
      <a className="absolute left-[722px] top-[251px] ">
        <Uploadingfilebutton />
      </a>
      <a className="absolute left-[646px] top-[251px]">
        <Linkbutton />
      </a>

      <main className="bg-[#ffffff] rounded-tl-[25px] rounded-br-[25px] rounded-bl-[25px] border-solid border-teal-500 border-1 w-[653px] h-[429px] left-[336px] top-[285px] absolute"></main>
    </div>
  );
}

export default Mainbox;
