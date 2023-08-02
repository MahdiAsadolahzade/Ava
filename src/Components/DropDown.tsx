/* Code generated with AutoHTML Plugin for Figma */
import Usericon from "./Icons/Usericon";
import Dropdownicon from "./Icons/Dropdownicon";

//function of drop down including: dropdown icon , content , user icon
function Dropdown() {
  return (
    //div for container
    <section className="relative" style={{ inset: "0" }}>
      {/* rounded border of dropdown */}
      <div className="bg-[#fefefe] rounded-[20px] border-solid border-teal-500 border-[1.5px] w-[121px] h-[37px] fixed left-[47px] top-[48px]"></div>
      {/* main content of dropdown */}
      <span
        className=" text-left text-teal-500 fixed left-[83px] top-[53px]"
        style={{
          font: "400 15px",
        }}
      >
        مهمان
      </span>
      {/* icon of dropdown*/}
      <section className=" fixed left-[62px] top-[63.47px] overflow-visible">
        <Dropdownicon></Dropdownicon>
      </section>
      {/* /icon of user */}
      <section className="fixed left-[127.97px] top-[57px] overflow-visible">
        <Usericon></Usericon>
      </section>
    </section>
  );
}

export default Dropdown;


