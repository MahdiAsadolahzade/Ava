// section of Goftar
import Dropdownicon from "../assets/Icons/Dropdownicon";
function Goftar() {
  return (
    // main content of Goftar
    <section className="">
      <div className="">
        {/* box of goftar */}
        <div className="bg-[#fefefe] rounded-[30px] border-solid border-teal-500 border-1"></div>
        {/* main content of the box */}
        <span
          className="text-teal-500 text-center"
          style={{ font: "400 14px" }}
        >
          فارسی
        </span>
        {/* dropdown icon of the box */}
        <section className="">
          <Dropdownicon></Dropdownicon>
        </section>
        {/* description of box */}
        <span
          className="text-[#626262] text-right "
          style={{ font: "300 13px" }}
        >
          زبان گفتار:
        </span>
      </div>
    </section>
  );
}

export default Goftar;
