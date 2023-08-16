import Voiceicon from "../assets/Icons/Voiceicon";
import IconCircleStop from "../assets/Icons/StopVoiceicon";
import { useState } from "react";
import UploadingFileSection from "./UploadingFileSection";


export default function Voicerecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [stoprecord, setstoprecord] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | undefined>(undefined);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audiofile, setAudiofile] = useState<File | undefined>(undefined);

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
        const audiofile = new File(audioChunks, "recorded_audio.wav", {
          type: "audio/wav",
        });
        setAudiofile(audiofile);
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
      setstoprecord(true);
    }
  };

  return (
    <main className="bg-[#ffffff] rounded-tl-[25px] rounded-br-[25px] rounded-bl-[25px]  border-solid border-teal-500 border-1 w-[100%] h-[50vh] justify-center  flex flex-col ">
      {stoprecord ? (
        <UploadingFileSection FileUpload={audiofile} Section={"voice"} />
      ) : (
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
    </main>
  );
}
