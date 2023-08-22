import { useState, useEffect } from "react";
import axios from "axios";
import Voiceicon from "../assets/Icons/Voiceicon";
import IconCircleStop from "../assets/Icons/StopVoiceicon";
import UploadingFileSection from "./UploadingFileSection";

const Token = import.meta.env.VITE_SOME_KEY;

export default function Voicerecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [stopRecord, setStopRecord] = useState(false);
  const [, setAudioBlob] = useState<Blob | undefined>(undefined);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioFile, setAudioFile] = useState<File | undefined>(undefined);
  const [extracteddata, setExtracteddata] = useState(null);

  useEffect(() => {
    if ( audioFile) {
      uploadAudioToApi(audioFile);
    }
  }, [stopRecord, audioFile]);

  const handleRecordClick = async (): Promise<void> => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const startRecording = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        setAudioBlob(audioBlob);
        const audioFile = new File([audioBlob], "recorded_audio.wav", {
          type: "audio/wav",
        });
        setAudioFile(audioFile);
        
      };

      recorder.start();
      setIsRecording(true);
      setMediaRecorder(recorder);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = (): void => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const uploadAudioToApi = async (file: File): Promise<void> => {
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
      console.log("API response:", data[0]["segments"]);
      setStopRecord(true);
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  return (
    <main className="bg-[#ffffff] rounded-tl-[25px] rounded-br-[25px] rounded-bl-[25px]  border-solid  border-teal-500 border-[1.5px] w-[100%] h-[50vh] justify-center  flex flex-col ">
      
      {stopRecord === false && (
        <div className="flex flex-col justify-center items-center">
          <button onClick={handleRecordClick}>
            {isRecording ? <IconCircleStop /> : <Voiceicon />}
          </button>
          <div className="text-[#969696] w-[35%] text-center mt-[12px]">
            برای شروع به صحبت، دکمه را فشار دهید متن پیاده شده آن، در اینجا ظاهر
            شود
          </div>
        </div>
      )}

      {stopRecord === true && (
        <UploadingFileSection
          FileUpload={audioFile}
          Section={"voice"}
          ExportData={extracteddata}
        />
      )}
    </main>
  );
}
