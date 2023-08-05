/* Code generated with AutoHTML Plugin for Figma */
import Usericon from "../assets/Icons/Usericon";
import Dropdownicon from "../assets/Icons/Dropdownicon";

//function of drop down including: dropdown icon , content , user icon
function Dropdown() {
  return (
    //div for container
    <div className="flex flex-row-reverse ml-[48px] mt-[48px] ">
        {/* rounded border of dropdown */}
        <div className="bg-[#fefefe] rounded-[20px] border-solid border-teal-500 border-[1.5px] w-[121px] h-[37px] flex flex-row justify-center items-center">
          <section className=" overflow-visible">
            <Usericon></Usericon>
          </section>

          <span
            className=" text-left text-teal-500 mx-[5px]"
            style={{
              font: "400 15px",
            }}
          >
            مهمان
          </span>
          {/* icon of dropdown*/}
          <section className=" overflow-visible">
            <Dropdownicon></Dropdownicon>
          </section>
          {/* /icon of user */}
        </div>
    </div>
  );
}

export default Dropdown;
