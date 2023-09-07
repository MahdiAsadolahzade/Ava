import { useEffect, useState, useRef } from "react";
import Voiceicon from "../assets/Icons/Voiceicon";
import Mutevoiceicon from "../assets/Icons/Mutevoiceicon";
import ArchiveSideButtons from "../assets/Icons/ArchiveSideButtons";
import "./Voicerecording.css";
import WaveBackground from "../../public/Wave.gif";
import WaveBackground2 from "../../public/Wave2.gif";

export default function Voicerecording() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const [, setSegments] = useState<
    { segment_id: number; text: string; start: string; end: string }[]
  >([]);
  const [currentStart, setCurrentStart] = useState("00:00:00");
  const [currentEnd, setCurrentEnd] = useState("00:00:00");
  const [isCopyMessageVisible, setIsCopyMessageVisible] = useState(false);
  const [lastChangeMap, setLastChangeMap] = useState<{ [key: number]: string }>(
    {}
  );
  const [fullTextArray, setFullTextArray] = useState<string[]>([]);
  const [wave, setWave] = useState(false);
  const getFullText = () => {
    return fullTextArray.join(" ");
  };

  const handleCopyText = () => {
    const textToCopy = getFullText();
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setIsCopyMessageVisible(true);
        setTimeout(() => {
          setIsCopyMessageVisible(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("خطا در کپی متن به کلیپ‌بورد!", error);
      });
  };

  useEffect(() => {
    const newSocket = new WebSocket(
      "wss://harf.roshan-ai.ir/ws_api/transcribe_files/"
    );

    newSocket.onopen = () => {
      console.log("WebSocket connection opened");
      socketRef.current = newSocket;
    };

    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setSegments((prevSegments) => {
        const updatedLastChangeMap = { ...lastChangeMap };
        updatedLastChangeMap[message.segment_id] = message.text;
        setLastChangeMap(updatedLastChangeMap);

        const updatedSegments = prevSegments.map((segment) => {
          if (segment.segment_id === message.segment_id) {
            return { ...segment, text: message.text };
          }
          return segment;
        });

        setCurrentStart(message.start);
        setCurrentEnd(message.end);

        setFullTextArray((prevFullTextArray) => {
          const updatedFullTextArray = [...prevFullTextArray];
          updatedFullTextArray[message.segment_id] = message.text;
          return updatedFullTextArray;
        });

        return updatedSegments;
      });
    };

    return () => {
      newSocket.close();
    };
  }, []);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          socketRef.current?.send(event.data);
        }
      };

      mediaRecorder.current.start(1000);
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const toggleMute = () => {
    if (mediaRecorder.current) {
      const audioTrack = mediaRecorder.current.stream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setWave(!wave);
    }
  };

  return (
    <main className="bg-[#ffffff] rounded-tl-[25px] rounded-br-[25px] rounded-bl-[25px] border-solid border-teal-500 border-[1.5px] w-[100%] h-[50vh] justify-center flex flex-col">
      {!isRecording ? (
        <div className="flex flex-col justify-center items-center">
          <button onClick={handleStartRecording}>
            <Voiceicon />
          </button>
          <div className="text-[#969696] w-[35%] text-center mt-[12px]">
            برای شروع به صحبت، دکمه را فشار دهید متن پیاده شده آن، در اینجا ظاهر
            شود
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-[100%]">
          <div className="flex flex-row mt-[25px] mb-[10px] justify-between items-center w-[80%] mx-auto">
            <div className="flex flex-row justify-between items-center">
              <div className=" w-24 ">{currentEnd}</div>

              <div className=" w-24 ">{currentStart}</div>
            </div>

            <div className="flex flex-row relative items-center">
              <div className="download-button">
                <a
                  className="download-link"
                  href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                    getFullText()
                  )}`}
                  download="voice_transcription.txt"
                >
                  {ArchiveSideButtons.Word}
                </a>
              </div>

              <div
                className="mx-[20px] cursor-copy  hover:text-teal-500"
                onClick={handleCopyText}
              >
                {ArchiveSideButtons.Copy}
              </div>
              {isCopyMessageVisible && (
                <div className="copy-message">متن کپی شد!</div>
              )}

              <div className="flex flex-row justify-end items-center w-28 ">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                </span>
              </div>
            </div>
          </div>

          <hr className="w-[80%] mx-auto" />

          <div className="flex flex-row justify-center">
            <div className="w-[80%] mx-auto h-60 text-right text-black text-base font-light overflow-auto mt-[10px]">
              {fullTextArray.map((text, index) => (
                <span
                  className={`${
                    index === fullTextArray.length - 1
                      ? "text-teal-500"
                      : "text-black"
                  }`}
                  key={index}
                >
                  {text + " "}
                </span>
              ))}
            </div>
          </div>

          <div className="my-[15px]  flex flex-row justify-center">
            <div
              className={`cursor-pointer  rounded-full w-[80px] h-[80px]  flex flex-row justify-center items-center hover:text-${
                wave ? "teal-500" : "rose-500"
              }  text-white`}
              onClick={toggleMute}
              style={{
                background: `url(${wave ? WaveBackground2 : WaveBackground})`,
                backgroundSize: `${wave ? "cover" : "contain"}`,
              }}
            >
              <Mutevoiceicon></Mutevoiceicon>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
