import Example from "../assets/Example.mp3";
import Pauseicon from "../assets/Icons/Pauseicon";
import Playicon from "../assets/Icons/Playicon";
import Stopicon from "../assets/Icons/Stopicon";
import Volumebaricon from "../assets/Icons/Volumebaricon";

function Audioplayer() {
  return (
    <div
      className="Container bg-[#F8F8F8] rounded-lg flex flex-row items-center justify-center w-[80%] mx-auto h-8"
      dir="ltr"
    >
      <div className="ml-[10px]">
        <Stopicon></Stopicon>
      </div>
      <div className="mx-[10px]">
        <Pauseicon></Pauseicon>
      </div>
      

      <div className="play w-[100%] flex flex-row relative">
        <div className="w-[100%]  h-px border border-[#C6C6C6] absolute"></div>
        <div className="w-[70%] h-px border-1 border-[#898989] absolute"></div>
        <div className="w-[40%] h-px border-1 border-sky-600 absolute"></div>
        <div className="w-3.5 h-3.5 left-[40%] top-[-7px] bg-sky-600 rounded-full border border-sky-600 absolute"></div>
      </div>

      <div className="mx-[10px] ">
        ۴:۲۹
      </div>

      <div className="mx-[5px]">
        <Volumebaricon></Volumebaricon>
      </div>
      <div className="volume w-[20%] flex flex-row relative">
        <div className="w-[80%]  h-px border border-[#C6C6C6] absolute"></div>
        <div className="w-[40%] h-px border-1 border-sky-600 absolute"></div>
      </div>
    </div>
  );
}

export default Audioplayer;
