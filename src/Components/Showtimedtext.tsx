function Showtimedtext() {
  const text =
    "[با] [---] [---] [با] و[---][---] [با][---][---][---][---] کجایی تو [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری شد [عشق شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می خوام] که [چشم تو] [و با رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی] [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و و [او]";
  const wordsArray = text.split(/\s+/);

  return (
    <div className="w-[80%] mx-auto h-64 text-right text-black text-base font-light mt-[10px] overflow-auto">
      {wordsArray.map((word, index) => (
        <div
          key={index}
          className={`w-[100%] h-16  my-[5px] flex flex-row ${
            index % 2 === 0 &&
            "w-[100%] h-16  my-[5px] flex flex-row  bg-zinc-100 rounded-3xl"
          }`}
        >
          <div className="mx-[10px]">۰۰:۰۰</div>
          <div className="mx-[10px]">۰۰:۰۰</div>
          {word}
        </div>
      ))}
    </div>
  );
}

export default Showtimedtext;
