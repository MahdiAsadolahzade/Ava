import Texticon from "../assets/Icons/Texticon";
import Timeicon from "../assets/Icons/Timeicon";
import Downloadicon from "../assets/Icons/Downloadicon";
import Copyicon from "../assets/Icons/Copyicon";
import Refreshicon from "../assets/Icons/Refreshicon";
import { useState } from "react";
import AudioPlayer from "./Audioplayer";
import Showsimpletext from "./Showsimpletext";
import Showtimedtext from "./Showtimedtext";


interface FileProps {
  FileUpload?: File ;
  Section : string;
  ExportData: any ;
}

const UploadingFileSection: React.FC<FileProps> = ({FileUpload , Section , ExportData})=> {
 
 //--------------------
 const [currentTime, setCurrentTime] = useState<number>(0);
 const handleTimeUpdate = (newTime: number) => {
  setCurrentTime(newTime);
};
 //--------------------
  const [choice, setchoice] = useState("simpletext");
  return (
    <div className="flex flex-col w-[100%]">
      <div className="flex flex-row mt-[25px] mb-[10px] justify-between items-center w-[80%] mx-auto">
        <div className="flex flex-row justify-between items-center">
          <div
            className="flex flex-row  items-center w-24 cursor-pointer"
            onClick={() => {
              setchoice("simpletext");
            }}
          >
            <Texticon></Texticon>
            <span className="text-sm font-normal">متن ساده</span>
          </div>

          <div
            className="flex flex-row  items-center w-36 cursor-pointer"
            onClick={() => {
              setchoice("timedtext");
            }}
          >
            <Timeicon></Timeicon>
            <span className="text-sm font-normal">متن زمان بندی شده</span>
          </div>
        </div>

        <div className="flex flex-row items-center">
          <div className="cursor-pointer">
            <Downloadicon></Downloadicon>
          </div>

          <div className="mx-[20px] cursor-copy">
            <Copyicon></Copyicon>
          </div>

          <div className={`flex flex-row justify-center items-center w-28 h-8  rounded-2xl cursor-pointer ${Section==="upload" &&"bg-sky-600"} ${Section==="link" &&"bg-rose-500"}`}>
            <Refreshicon></Refreshicon>
            <span className="text-[#ffffff] ">شروع دوباره</span>
          </div>
        </div>
      </div>

      
      <hr className="w-[80%] mx-auto" />
      {choice === "simpletext" && (
        <div className="w-[10%] h-px border-[1.5px] border-black ml-auto mr-[75px]"></div>
      )}
      {choice === "timedtext" && (
        <div className="w-[17%] h-px border-[1.5px] border-black ml-auto mr-[175px]"></div>
      )}
      <div className="flex flex-row justify-center">
        {choice === "simpletext" && <Showsimpletext Data={ExportData}></Showsimpletext>}
        {choice === "timedtext" && <Showtimedtext Data={ExportData} currentTime={currentTime} Section={Section}></Showtimedtext>}
      </div>

      <div className="my-[10px] ">
        <AudioPlayer audioFile={FileUpload} AudioSection={Section} currentTime={currentTime} onTimeUpdate={handleTimeUpdate} ></AudioPlayer>
      </div>
    </div>
  );
}

export default UploadingFileSection;
