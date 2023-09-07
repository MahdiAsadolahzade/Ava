import { NavLink } from "react-router-dom";
import Goftarsection from "./Goftarsection";
import Archivesection from "./Archivesection";
import Mainicon from "../assets/Icons/Mainicon";
import background from "./../../public/sidebar.svg";

export default function Sidemenu() {
  return (
    <div>
      <nav
        className="rounded-tl-[10px] rounded-bl-[10px] "
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <div className="flex flex-row justify-center pt-[48px] pb-[182px]">
          <div className="m-[11px]">
            <Mainicon></Mainicon>
          </div>
          <div className="flex flex-row items-center">
            <section className="text-[#ffffff]" style={{ font: "700 20px" }}>
              آوا
            </section>
          </div>
        </div>

        <ul>
          <li className=" flex flex-row justify-center">
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex flex-row items-center  w-[90%] "
                  : isActive
                  ? "bg-[#02816e] rounded-[10px]  w-[90%] h-[48px] flex flex-row justify-center items-center"
                  : ""
              }
              to="/Ava/"
            >
              <Goftarsection></Goftarsection>
            </NavLink>
          </li>
          <li className="flex flex-row justify-center">
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex flex-row items-center  w-[90%] "
                  : isActive
                  ? "bg-[#02816e] rounded-[10px]  w-[90%] h-[48px] flex flex-row items-center justify-center"
                  : ""
              }
              to="/Ava/archive/"
            >
              <Archivesection></Archivesection>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
