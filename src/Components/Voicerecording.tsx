import Voiceicon from "../assets/Icons/Voiceicon";
export default function Voicerecording() {
  return (
    <main className="bg-[#ffffff] rounded-tl-[25px] rounded-br-[25px] rounded-bl-[25px]  border-solid border-teal-500 border-1 w-[50vw] h-[50vh] flex flex-col justify-center items-center ">
      <button>
        <Voiceicon></Voiceicon>
      </button>
      <div className="text-[#969696] w-[35%] text-center mt-[12px]">
        برای شروع به صحبت، دکمه را فشار دهید متن پیاده شده آن، در اینجا ظاهر شود
      </div>
    </main>
  );
}
