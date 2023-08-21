interface TimedProps {
  Data : any[];
}

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

const Showtimedtext: React.FC<TimedProps> =({Data}) => {
  

  return (
    <div className="w-[80%] mx-auto h-64 text-right text-black text-base font-light mt-[10px] overflow-auto">
      {Data.map((item , index ) => (
        <div
          key={index}
          className={`w-[100%] h-16  my-[5px] flex flex-row items-center ${
            index % 2 === 0 &&
            "w-[100%] h-16  my-[5px] flex flex-row  bg-zinc-100 rounded-3xl"
          }`}
        >
          <div className="mx-[10px]">{convertToPersianNumbers(item["end"])}</div>
          <div className="mx-[10px]">{convertToPersianNumbers(item["start"])}</div>
          {item["text"]}
        </div>
      ))}
    </div>
  );
}

export default Showtimedtext;
