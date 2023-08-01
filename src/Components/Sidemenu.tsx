import Mainicon from "./Icons/Mainicon";
import background from "./../../public/Sidemenubackground.png"

function Sidemenu() {
  return (
    <div
      className="rounded-tl-[10px] rounded-bl-[10px] w-[166px] h-[924px] absolute right-0 "
      style={{ backgroundColor: "#00BA9F" , backgroundImage: `url(${background})`}}
    >
      <div className="w-[54px] h-[38px] static">
        <div
          className="text-[#ffffff] text-right absolute left-[53px] top-[48px]"
          style={{ font: "700 20px" }}
        >
          آوا
        </div>
        <div className=" absolute left-[88px] top-[48px]">
          <Mainicon></Mainicon>
        </div>
      </div>
    </div>
  );
}

export default Sidemenu;
