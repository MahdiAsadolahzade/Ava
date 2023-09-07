import CenterLinkicon from "../assets/Icons/CenterLinkicon";
import { useState } from "react";
import axios from "axios";
import UploadingFileSection from "./UploadingFileSection";
const Token = import.meta.env.VITE_SOME_KEY;

const Link: React.FC = () => {
  const [audioSource, setAudioSource] = useState<string | undefined>(undefined);
  const [audioSourceFile, setAudioSourceFile] = useState<File | undefined>(
    undefined
  );
  const [extracteddata, setExtracteddata] = useState(null);
  const [submited, setSubmited] = useState(false);
  const [loading, setLoading] = useState(false);

  const uploadAudioToApi = async (link: string): Promise<void> => {
    setLoading(true);
    
  
    try {
      const requestData = {
        media_urls: [link],
        language: "fa",
      };
  
      const { data } = await axios.post(
        "https://harf.roshan-ai.ir/api/transcribe_files/",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: "Token " + Token,
          },
        }
      );
  
      console.log("API response:", data);
      setExtracteddata(data[0]["segments"]);
      setSubmited(true);
    } catch (error) {
      console.error("Error uploading audio:", error);
      
    } finally {
      setLoading(false);
    }
  };

  const handleLinkSubmit = async (link: string) => {
    try {
      setLoading(true);

      const response = await axios.get(link, { responseType: "blob" });
      const audioBlob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const audioFile = new File([audioBlob], "audio.mp3", {
        type: response.headers["content-type"],
      });
      setAudioSourceFile(audioFile);
      setAudioSource(URL.createObjectURL(audioFile));
      uploadAudioToApi(link);
    } catch (error) {
      console.error("Error downloading audio:", error);
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#ffffff] rounded-[25px] border-solid border-[#ff1654] border-[1.5px] w-[50vw] h-[50vh] flex flex-col justify-center items-center">
      {submited ? (
        <UploadingFileSection
          FileUpload={audioSourceFile}
          Section={"link"}
          ExportData={extracteddata}
        />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className=" bg-white rounded-3xl border-[1.5px] border-rose-600 w-[70%] flex flex-row justify-end">
            <input
              className="w-[90%] text-center rounded-3xl "
              type="text"
              placeholder="example.com/sample.mp3"
              style={{ borderStyle: "none", outlineStyle: "none" }}
              onChange={(e) => handleLinkSubmit(e.target.value)}
            />
            {loading ? (
              <>
                <div className=" bg-rose-500 rounded-full w-[30px] h-[30px] mx-[10px] my-[10px]  flex flex-row justify-center items-center">
                  <div
                    className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <button className="mx-[10px] my-[10px]" disabled={loading}>
                <CenterLinkicon></CenterLinkicon>
              </button>
            )}
          </div>
          <div className="text-[#969696] w-[70%] text-center mt-[12px]">
            نشانی اینترنتی فایل حاوی گفتار (صوتی/تصویری) را وارد و دکمه را فشار
            دهید
          </div>
        </div>
      )}
    </main>
  );
};

export default Link;
