import ArchiveSideButtons from "../assets/Icons/ArchiveSideButtons";

function ArchiveTable() {
  return (
    <table className="table-auto mx-auto mt-[20px] w-[80%]">
      <thead>
        <tr>
          <th></th>
          <th>نام فایل</th>
          <th>تاریخ بارگذاری</th>
          <th>نوع فایل</th>
          <th>مدت زمان</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        <tr className="justify-around">
          <td className="w-[5%]">{ArchiveSideButtons.Link}</td>
          <td className=" w-[40%]">
            <p className="truncate w-[435px] text-sky-600">
            https://irsv.upmusics.com/Downloads/Musics/Sirvan%20Ky637fgbndrt94
            </p>
          </td>
          <td className="w-[15%]">۱۴۰۰-۰۸-۲۱</td>
          <td className="w-[10%]">.mp3</td>
          <td className="w-[10%]">۴:۲۹</td>
          <td className="flex flex-row justify-evenly items-center ">
            <div className="cursor-pointer ">{ArchiveSideButtons.Download}</div>
            <div className="cursor-pointer ">{ArchiveSideButtons.Word}</div>
            <div className="cursor-pointer " >{ArchiveSideButtons.Copy}</div>
            <div className="cursor-pointer hover:bg-red-500 hover:rounded-full">{ArchiveSideButtons.Delete}</div>
          </td>
        </tr>

      </tbody>
    </table>
  );
}

export default ArchiveTable;
