import BigUploadicon from "../assets/Icons/BigUploadicon";
import { useState } from "react";
import axios from "axios";

import UploadingFileSection from "./UploadingFileSection";

export default function Uploadingfilebutton() {
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    console.log(file);
  };
  // --------------------------------------------



  // --------------------------------------------

  return (
    <main className="bg-[#ffffff] rounded-[25px] border-solid border-[#118ad3] border-1 w-[50vw] h-[50vh] flex flex-col">
      {/* <label htmlFor="fileInput" className="cursor-pointer">
        <BigUploadicon></BigUploadicon>
      </label>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />

      <div className="text-[#969696] w-[50%] text-center mt-[12px]">
        برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید متن پیاده شده
        آن، در اینجا ظاهر می شود
      </div> */}

      <UploadingFileSection></UploadingFileSection>
    </main>
  );
}