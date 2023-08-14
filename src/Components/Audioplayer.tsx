import Example from "../assets/Example.mp3";
import Pauseicon from "../assets/Icons/Pauseicon";
import Playicon from "../assets/Icons/Playicon";
import Stopicon from "../assets/Icons/Stopicon";
import Volumebaricon from "../assets/Icons/Volumebaricon";

import React, { useRef, useState, useEffect } from "react";

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbPosition, setThumbPosition] = useState(0);
  const [loadedProgress, setLoadedProgress] = useState(0);

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
    <div className="flex flex-row justify-center items-center" dir="ltr">
      <audio ref={audioRef} src={Example} />
      <div className="ml-[10px] cursor-pointer"
      onClick={handleStop}>
        <Stopicon></Stopicon>
      </div>
      <div className="px-[10px] cursor-pointer" onClick={togglePlay}>
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
          }}
        />
        <div
          className="w-full h-px border border-[#C6C6C6]"
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 0,
          }}
        ></div>
        <div
          className="progress-bar w-full h-px border-1 border-[#898989] absolute"
          style={{ width: `${loadedProgress}%`, zIndex: 1 }}
        ></div>
        <div
          className="played w-full h-px border-1 border-sky-600 absolute"
          style={{ width: `${thumbPosition}%`, zIndex: 3 }}
        ></div>
      </div>

      <div>
        
      </div>
    </div>
  );
};

export default AudioPlayer;
