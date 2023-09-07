import "./ArchieTable.css";

interface SimpleProps {
  Data: any[];
  currentTime: number;
  Section: string;
}

const timeToSeconds = (timeString: string): number => {
  const parts = timeString.split(":").map(Number);
  return parts[0] * 3600 + parts[1] * 60 + parts[2];
};

const Showsimpletext: React.FC<SimpleProps> = ({
  Data,
  currentTime,
  Section,
}) => {
  return (
    <div className="w-[80%] mx-auto h-64 text-right text-black text-base font-light custom-scroll mt-[10px]">
      {Data.map((item, index) => (
        <span
          className={`${
            currentTime >= timeToSeconds(item["start"]) &&
            currentTime <= timeToSeconds(item["end"]) &&
            `${Section === "upload" && "text-sky-500"} ${
              Section === "link" && "text-rose-500"
            }`
          }`}
          key={index}
        >
          {item["text"] + " "}
        </span>
      ))}
    </div>
  );
};

export default Showsimpletext;
