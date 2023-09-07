import BigUploadicon from "../assets/Icons/BigUploadicon";
import { useState } from "react";
import axios from "axios";
import UploadingFileSection from "./UploadingFileSection";
const Token = import.meta.env.VITE_SOME_KEY;

const Uploadingfile: React.FC = () => {
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const [extracteddata, setExtracteddata] = useState(null);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    console.log(file);
    setFile(file);
    if (file) {
      uploadAudioToApi(file);
    }
  };

  const uploadAudioToApi = async (file: File): Promise<void> => {
    setLoading(true);

    const formData = new FormData();
    formData.append("media", file);
    formData.append("language", "fa");

    try {
      const { data } = await axios.post(
        "https://harf.roshan-ai.ir/api/transcribe_files/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: "Token " + Token,
          },
        }
      );

      console.log("API response:", data);
      setExtracteddata(data[0]["segments"]);
      setUploaded(true);
    } catch (error) {
      console.error("Error uploading audio:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#ffffff] rounded-[25px] border-solid border-[#118ad3] border-[1.5px] w-[100%] h-[50vh] justify-center flex flex-col">
      {uploaded ? (
        <UploadingFileSection
          FileUpload={file}
          Section={"upload"}
          ExportData={extracteddata}
        />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="fileInput" className="cursor-pointer">
            {loading ? (
              <div className="animate-bounce bg-sky-500 rounded-full w-[62px] h-[62px] text-center flex flex-row justify-center items-center">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>
            ) : (
              <BigUploadicon></BigUploadicon>
            )}
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />

          <div className="text-[#969696] w-[50%] text-center mt-[12px]">
            {loading ? (
              <div>در حال بارگذاری...</div>
            ) : (
              <div>
                برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید متن
                پیاده شده آن، در اینجا ظاهر می‌شود
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Uploadingfile;
