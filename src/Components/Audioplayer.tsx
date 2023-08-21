import Pauseicon from "../assets/Icons/Pauseicon";
import Playicon from "../assets/Icons/Playicon";
import Stopicon from "../assets/Icons/Stopicon";
import Volumebaricon from "../assets/Icons/Volumebaricon";

import React, { useRef, useState, useEffect } from "react";

interface AudioPlayerProps {
  audioFile: File | undefined | null;
  AudioSection: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioFile,
  AudioSection,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbPosition, setThumbPosition] = useState(0);
  const [loadedProgress, setLoadedProgress] = useState(0);
  const [volume, setVolume] = useState<number>(1);
  let playercolor;
  if (AudioSection === "voice") {
    playercolor = "#00BA9F";
  } else if (AudioSection === "upload") {
    playercolor = "#118AD3";
  }
  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = document.querySelector(
      ".volume-progress-bar"
    ) as HTMLDivElement;
    const progressBarWidth = progressBar.offsetWidth;
    const rect = progressBar.getBoundingClientRect();

    const offsetX = e.clientX - rect.left;
    const newVolume = Math.min(1, Math.max(0, offsetX / progressBarWidth));

    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    if (audioRef.current && audioFile) {
      const audioUrl = URL.createObjectURL(audioFile);
      audioRef.current.src = audioUrl;
    }
  }, [audioFile]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return convertToPersianNumbers(`${minutes}:${seconds}`);
  };

  const convertToPersianNumbers = (input: string): string => {
    const persianNumbers: string[] = [
      "۰",
      "۱",
      "۲",
      "۳",
      "۴",
      "۵",
      "۶",
      "۷",
      "۸",
      "۹",
    ];
    return input.replace(/\d/g, (match) => persianNumbers[parseInt(match)]);
  };

  const togglePlay = () => {
    if (audioRef.current?.paused) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const handleInputRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPosition = parseFloat(e.target.value);
    setThumbPosition(newPosition);

    if (audioRef.current) {
      audioRef.current.currentTime =
        (newPosition / 100) * audioRef.current.duration;
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const progressInterval = setInterval(() => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        const totalDuration = audioRef.current.duration;
        const newThumbPosition = (currentTime / totalDuration) * 100;
        setThumbPosition(newThumbPosition);

        if (audioRef.current.buffered.length > 0) {
          const loadedTime = audioRef.current.buffered.end(0);
          const newLoadedProgress = (loadedTime / totalDuration) * 100;
          setLoadedProgress(newLoadedProgress);
        }
      }
    }, 100);

    return () => clearInterval(progressInterval);
  }, [audioRef]);

  return (
    <div
      className="w-[80%] mx-auto flex flex-row justify-center items-center bg-stone-50 rounded-lg h-8"
      dir="ltr"
    >
      <audio ref={audioRef} />
      <div className="p-[5px] cursor-pointer" onClick={handleStop}>
        <Stopicon></Stopicon>
      </div>
      <div className="p-[5px] cursor-pointer" onClick={togglePlay}>
        {isPlaying ? <Pauseicon /> : <Playicon />}
      </div>
      <div className="play w-full flex flex-row items-center relative">
        <input
          type="range"
          className="w-full h-px thumb"
          min="0"
          max="100"
          step="0.01"
          value={thumbPosition}
          onChange={handleInputRangeChange}
          style={{
            appearance: "none",
            cursor: "pointer",
            zIndex: 2,
            outline: "none",
            border: "none",
            width: "100%",
            accentColor: playercolor,
          }}
        />
        <style></style>
        <div
          className="w-full h-px border rounded border-stone-300"
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 0,
          }}
        ></div>
        <div
          className="progress-bar w-full h-px border-1 rounded border-zinc-500 absolute"
          style={{ width: `${loadedProgress}%`, zIndex: 1 }}
        ></div>
        <div
          className={`played w-full h-px border-1 rounded ${
            AudioSection === "upload" && "border-sky-600"
          }  ${AudioSection === "voice" && "border-teal-500"} absolute`}
          style={{ width: `${thumbPosition}%`, zIndex: 3 }}
        ></div>
      </div>

      <div className="time relative px-[8px]">
        {formatTime(audioRef.current?.currentTime || 0)}
      </div>

      <div className="ml-[10px] cursor-pointer">
        <Volumebaricon></Volumebaricon>
      </div>
      <div
        className="w-[20%] h-[20px] flex flex-row items-center justify-center cursor-pointer"
        onClick={handleVolumeChange}
      >
        <div className="w-full h-px border border-stone-300 relative rounded mr-[5px]  volume-progress-bar">
          <div
            className={`played h-px border-1 ${
              AudioSection === "upload" && "border-sky-600"
            }  ${
              AudioSection === "voice" && "border-teal-500"
            } rounded absolute`}
            style={{ width: `${volume * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
