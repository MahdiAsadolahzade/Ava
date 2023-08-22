import CenterLinkicon from "../assets/Icons/CenterLinkicon";
import { useState } from "react";
import axios from "axios";

export default function Linkbutton() {
  const [audioSource, setAudioSource] = useState<string | undefined>(undefined);

  const handleLinkSubmit = async (link: string) => {
    try {
      const response = await axios.get(link, { responseType: "blob" });
      const blob = new Blob([response.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(blob);
      setAudioSource(audioUrl);
      console.log(audioSource);
    } catch (error) {
      console.error("Error downloading audio:", error);
    }
  };

  return (
    <main className="bg-[#ffffff] rounded-[25px] border-solid border-[#ff1654] border-[1.5px] w-[50vw] h-[50vh] flex flex-col justify-center items-center">
      <div className=" bg-white rounded-3xl border-1 border-rose-600 w-[50%] flex flex-row justify-end">
        <input
          className="w-[100%] text-center rounded-3xl "
          type="text"
          placeholder="example.com/sample.mp3"
          style={{ borderStyle: "none", outlineStyle: "none" }}
          onChange={(e) => handleLinkSubmit(e.target.value)}
        />
        <button className="mx-[10px] my-[8px]">
          <CenterLinkicon></CenterLinkicon>
        </button>
      </div>
      <div className="text-[#969696] w-[50%] text-center mt-[12px]">
        نشانی اینترنتی فایل حاوی گفتار (صوتی/تصویری) را وارد و دکمه را فشار دهید
      </div>
    </main>
  );
}
