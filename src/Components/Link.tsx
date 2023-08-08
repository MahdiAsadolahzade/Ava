import CenterLinkicon from "../assets/Icons/CenterLinkicon";
export default function Linkbutton() {
  return (
    <main className="bg-[#ffffff] rounded-[25px] border-solid border-[#ff1654] border-1 w-[50vw] h-[50vh] flex flex-col justify-center items-center">
      <form className=" bg-white rounded-3xl border-1 border-rose-600 w-[50%] flex flex-row justify-end">
      
        <input className="w-[100%] text-center rounded-3xl "  type="text" placeholder="example.com/sample.mp3" style={{borderStyle:"none" , outlineStyle:"none"}}/>
        <button className="mx-[10px] my-[8px]"><CenterLinkicon></CenterLinkicon></button>
      </form>
      <div className="text-[#969696] w-[50%] text-center mt-[12px]">
        نشانی اینترنتی فایل حاوی گفتار (صوتی/تصویری) را وارد و دکمه را فشار دهید
      </div>
    </main>
  );
}
