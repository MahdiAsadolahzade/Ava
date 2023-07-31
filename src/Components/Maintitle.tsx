export interface IProps {}

export const Maintitle = ({}: IProps): JSX.Element => {
  return (
    <div
      dir="rtl"
      className="text-left fixed w-[227px] h-[48px] left-[549px] top-[86px] text-3xl font-bold"
      style={{ font: "700 28px , sans-serif", color: "#00BA9F" }}
    >
      تبدیل گفتار به متن
    </div>
  );
};
