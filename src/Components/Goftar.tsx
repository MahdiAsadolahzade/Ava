// section of Goftar
import Dropdownicon from "../assets/Icons/Dropdownicon";
function Goftar() {
  return (
    // main content of Goftar
    <section className="absolute">
      <div className="w-[179px] h-[37px] relative">
        {/* box of goftar */}
        <div className="bg-[#fefefe] rounded-[30px] border-solid border-teal-500 border-1 w-[105px] h-[37px] absolute left-[335px] top-[728px]"></div>
        {/* main content of the box */}
        <span
          className="text-teal-500 text-center absolute left-[376px] top-[734px]"
          style={{ font: "400 14px" }}
        >
          فارسی
        </span>
        {/* dropdown icon of the box */}
        <section className="absolute left-[351px] top-[745px]">
          <Dropdownicon></Dropdownicon>
        </section>
        {/* description of box */}
        <span
          className="text-[#626262] text-right relative left-[454px] top-[735px] "
          style={{ font: "300 13px" }}
          dir="rtl"
        >
          زبان گفتار:
        </span>
      </div>
    </section>
  );
}

export default Goftar;
