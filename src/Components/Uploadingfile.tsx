import BigUploadicon from "../assets/Icons/BigUploadicon";
import { useState } from "react";
import UploadingFileSection from "./UploadingFileSection";


const Uploadingfile: React.FC = () => {
  const [uploaded, setuploaded] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0]
    console.log(file);
    setFile(file);
    setuploaded(true)
  };

  return (
    <main className="bg-[#ffffff] rounded-[25px] border-solid border-[#118ad3] border-[1.5px] w-[100%] h-[50vh] justify-center flex flex-col">
      {uploaded ? (
        <UploadingFileSection FileUpload={file} Section={"upload"} ExportData={undefined} />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="fileInput" className="cursor-pointer">
            <BigUploadicon></BigUploadicon>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />

          <div className="text-[#969696] w-[50%] text-center mt-[12px]">
            برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید متن پیاده
            شده آن، در اینجا ظاهر می شود
          </div>
        </div>
      )}
    </main>
  );
};

export default Uploadingfile;
