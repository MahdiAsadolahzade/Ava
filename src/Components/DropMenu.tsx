/* Code generated with AutoHTML Plugin for Figma */
import Dropdownicon from "../assets/Icons/Dropdownicon";
import Droppedupicon from "../assets/Icons/Droppedupicon";
import Usericon from "../assets/Icons/Usericon";
import Exiticon from "../assets/Icons/Exiticon";
import { useState } from "react";
//function of drop down including: dropdown icon , content , user icon
function DropMenu() {
  const [open, setOpen] = useState(false);
  return (
    //div for container
    <div className="w-[121px] h-[81px] flex mr-auto ml-[48px] mt-[48px]">
      <div
        className={`flex flex-row justify-center items-center rounded-2xl border-1 w-32 h-9 border-teal-500 ${
          open === true && "h-[80px] flex flex-row flex-wrap "
        }`}
      >
        {open ? (
          true && (
            <>
              <div className="flex flex-row justify-center items-center">
                <div className="ml-[5px]">
                  <Usericon></Usericon>
                </div>
                <div className="text-teal-500 text-[15px] font-[400] ml-[6px]">
                  مهمان
                </div>
                <div
                  className="cursor-pointer p-[6px]"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  {open ? (
                    <Droppedupicon></Droppedupicon>
                  ) : (
                    <Dropdownicon></Dropdownicon>
                  )}
                </div>
              </div>
              <div className="w-20 h-px border-1 border-teal-500"></div>
              <div className="flex flex-row justify-center items-center">
                <div className="ml-[5px]">
                  <Exiticon></Exiticon>
                </div>
                <div className="text-teal-500 text-[15px] font-[400] ml-[6px]">
                  خروج
                </div>
              </div>
            </>
          )
        ) : (
          <>
            <div className="ml-[5px]">
              <Usericon></Usericon>
            </div>
            <div className="text-teal-500 text-[15px] font-[400] ml-[6px]">
              مهمان
            </div>
            <div
              className="cursor-pointer p-[6px]"
              onClick={() => {
                setOpen(!open);
              }}
            >
              {open ? (
                <Droppedupicon></Droppedupicon>
              ) : (
                <Dropdownicon></Dropdownicon>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DropMenu;
