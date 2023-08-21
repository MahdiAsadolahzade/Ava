interface SimpleProps {
  Data: any[];
}

const Showsimpletext: React.FC<SimpleProps> = ({ Data }) => {
  return (
    <div className="w-[80%] mx-auto h-64 text-right text-black text-base font-light mt-[10px]">
      {Data.map((item, index) => (
        <span key={index}>{item["text"] + " "}</span>
      ))}
    </div>
  );
};

export default Showsimpletext;
