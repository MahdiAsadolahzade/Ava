// section of Goftar
import Dropdownicon from "../assets/Icons/Dropdownicon";
import Droppedupicon from "../assets/Icons/Droppedupicon";
import {useState} from "react";
function Goftar() {
  const [open, setOpen] = useState(false);
  return (
    // main content of Goftar
    <div className="flex flex-row-reverse ml-[370px] mr-auto mt-[10px] text">
      <div className="bg-[#fefefe] rounded-[20px] border-solid border-teal-500 border-[1.5px] w-[105px] h-[37px] flex flex-row justify-center items-center">
      
        <span
          className="text-teal-500 text-center"
          style={{ font: "400 14px" }}
        >
          {open? "انگلیسی" : "فارسی"}
        </span>
  
        <section className="mr-[10px] cursor-pointer p-[6px]"
        onClick={()=> {setOpen(!open)}}>
          {open? <Droppedupicon /> : <Dropdownicon />}
        </section>

       
      </div>

      <div
          className="text-[#969696] text-[15px] font-[400] ml-[13px] flex flex-row justify-center items-center"
        >
          زبان گفتار:
        </div>
    </div>
  );
}

export default Goftar;
