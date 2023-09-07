import Texticon from "../assets/Icons/Texticon";
import Timeicon from "../assets/Icons/Timeicon";
import { useEffect, useState } from "react";
import AudioPlayer from "./Audioplayer";
import Showsimpletext from "./Showsimpletext";
import Showtimedtext from "./Showtimedtext";
import loadingaudio from "../../public/loadingaudio.gif"

interface Archiveprops {
  Section: string;
  ExportData: any;
}

const ArchiveDetail: React.FC<Archiveprops> = ({ Section, ExportData }) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const handleTimeUpdate = (newTime: number) => {
    setCurrentTime(newTime);
  };
  const [choice, setchoice] = useState("simpletext");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (ExportData && ExportData["media_url"]) {
      setIsLoading(true); // آغاز بارگیری

      fetch(ExportData["media_url"])
        .then((response) => response.blob())
        .then((blob) => {
          // ایجاد یک فایل با Blob دریافتی
          const file = new File([blob], "audio.mp3", { type: "audio/mp3" });
          setAudioFile(file);
          setIsLoading(false); // پایان بارگیری
        })
        .catch((error) => {
          console.error("خطا در دریافت فایل صوتی: ", error);
          setIsLoading(false); // در صورت بروز خطا نیز پایان بارگیری
        });
    }
  }, [ExportData]);

  return (
    <div className="flex flex-col w-[100%]">
      <div className="flex flex-row  mb-[10px] justify-between items-center w-[80%] mx-auto">
        <div className="flex flex-row justify-between items-center mt-[20px]">
          <div
            className="flex flex-row  items-center w-24 cursor-pointer"
            onClick={() => {
              setchoice("simpletext");
            }}
          >
            <Texticon></Texticon>
            <span className="text-sm font-normal">متن ساده</span>
          </div>

          <div
            className="flex flex-row  items-center w-36 cursor-pointer"
            onClick={() => {
              setchoice("timedtext");
            }}
          >
            <Timeicon></Timeicon>
            <span className="text-sm font-normal">متن زمان بندی شده</span>
          </div>
        </div>
      </div>

      {choice === "simpletext" && (
        <div className="w-[7%] h-px border-[1.5px] border-black ml-auto mr-[120px]"></div>
      )}
      {choice === "timedtext" && (
        <div className="w-[11%] h-px border-[1.5px] border-black ml-auto mr-[215px]"></div>
      )}
      <div className="flex flex-row justify-center">
        {choice === "simpletext" && ExportData && (
          <Showsimpletext Data={ExportData["segments"]} currentTime={currentTime}
          Section={Section}></Showsimpletext>
        )}

        {choice === "timedtext" && ExportData && (
          <Showtimedtext
            Data={ExportData["segments"]}
            currentTime={currentTime}
            Section={Section}
          ></Showtimedtext>
        )}
      </div>

      {isLoading ? (
        <div
        className="flex flex-row justify-center items-center w-[80px] h-[80px] mx-auto"
        style={{
          background: `url(${loadingaudio})`,
          backgroundSize: "cover",
        }}
      ></div>
      ) : (
        <>
          <div className="my-[10px] w-[70%] mx-auto">
            {ExportData && ExportData["media_url"] && audioFile && (
              <AudioPlayer
                audioFile={audioFile}
                AudioSection={Section}
                currentTime={currentTime}
                onTimeUpdate={handleTimeUpdate}
              ></AudioPlayer>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ArchiveDetail;
