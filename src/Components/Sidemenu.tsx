// side menu of project
import Mainicon from "./Icons/Mainicon";
import Speechicon from "./Icons/Speechicon";
import Archiveicon from "./Icons/Archiveicon";
import background from "./../../public/Sidemenubackground.png";

//includes : back , contents and icons
function Sidemenu() {
  return (
    //main box of sidemenu
    <nav
      className="rounded-tl-[10px] rounded-bl-[10px] w-[166px] h-[924px] absolute right-0 "
      style={{
        backgroundColor: "#00BA9F",
        backgroundImage: `url(${background})`,
      }}
    >
      {/* title of sidemenu */}
      <ul className="w-[54px] h-[38px] static">
        <header
          className="text-[#ffffff] text-right absolute left-[53px] top-[48px]"
          style={{ font: "700 20px" }}
        >
          آوا
        </header>
        {/* icon of side menu */}
        <header className=" absolute left-[88px] top-[48px]">
          <Mainicon></Mainicon>
        </header>
        {/* section of Goftar : content */}
        <li className="bg-[#02816e] rounded-[10px] w-[150px] h-12 left-[8px] top-[256px] absolute">
          <span
            className="text-[#ffffff] text-right absolute left-[18px] top-[11px]"
            style={{ font: "700 16px" }}
          >
            تبدیل گفتار
          </span>
          {/* section of Goftar : icon */}
          <div className=" absolute left-[107px] top-[13px]">
            <Speechicon></Speechicon>
          </div>
        </li>
        {/* section of Archive */}
        <li className="w-[87px] h-7 static">
          <span
            className="text-[#ffffff] text-right absolute left-[46px] top-[354px]"
            style={{ font: "400 16px" }}
          >
            آرشیو
          </span>
          {/* icon of archive */}

          <section className=" absolute left-[113px] top-[357px]">
            <Archiveicon></Archiveicon>
          </section>
        </li>
      </ul>
    </nav>
  );
}

export default Sidemenu;
