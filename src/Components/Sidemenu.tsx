import { Link, NavLink } from "react-router-dom";

import Goftarsection from "./Goftarsection";
import Archivesection from "./Archivesection";
import Mainicon from "../assets/Icons/Mainicon";
import background from "./../../public/Sidemenubackground.png";

export default function Sidemenu() {
  return (
    <div className="relative">
      <nav
        className="rounded-tl-[10px] rounded-bl-[10px] w-[166px] h-[100vh] absolute  inset-y-0 right-0"
        style={{
          backgroundColor: "#00BA9F",
          backgroundImage: `url(${background})`,
        }}
      >
        <ul className="relative">
          <li
            className="text-[#ffffff] text-right absolute left-[53px] top-[48px]"
            style={{ font: "700 20px" }}
          >
            آوا
          </li>
          {/* icon of side menu */}
          <li className=" absolute left-[88px] top-[48px]">
            <Mainicon></Mainicon>
          </li>
          <li className="w-[150px] h-12 left-[8px] top-[256px] absolute text-center">
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? " "
                  : isActive
                  ? "bg-[#02816e] rounded-[10px] w-[150px] h-12 inline-block text-center"
                  : ""
              }
              to="/"
            >
              <Goftarsection></Goftarsection>
            </NavLink>
          </li>
          <li className="w-[150px] h-12 left-[8px] top-[354px] absolute text-center">
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? ""
                  : isActive
                  ? "bg-[#02816e] rounded-[10px] w-[150px] h-12 inline-block text-center"
                  : ""
              }
              to="/archive"
            >
              <Archivesection></Archivesection>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
