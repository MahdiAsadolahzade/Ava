import ArchiveSideButtons from "../assets/Icons/ArchiveSideButtons";

function ArchiveTable() {
  return (
    <table className="table-auto mx-auto">
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
        <tr className="w-[100%]">
          <td className="w-[10%]">{ArchiveSideButtons.Link}</td>
          <td className="w-[40%] ">
            <p className="truncate w-[100%] text-sky-600">
              https://irsv.upmusics.com/Downloads/Musick
            </p>
          </td>
          <td className="w-[10%]">۱۴۰۰-۰۸-۲۱</td>
          <td className="w-[10%]">.mp3</td>
          <td className="w-[10%]">۴:۲۹</td>
          <td className="flex flex-row justify-around w-[20%]">
            <div>{ArchiveSideButtons.Download}</div>
            <div>{ArchiveSideButtons.Word}</div>
            <div>{ArchiveSideButtons.Copy}</div>
            <div>{ArchiveSideButtons.Delete}</div>
          </td>
        </tr>
        <tr>
          <td>{ArchiveSideButtons.Upload}</td>
          <td className="w-[400px] flex flex-row">
            <p className="truncate w-[90%]">khaterate To</p>
          </td>
          <td>The Eagles</td>
          <td>1972</td>
        </tr>
        <tr>
          <td>Shining Star</td>
          <td>Earth, Wind, and Fire</td>
          <td>1975</td>
        </tr>
      </tbody>
    </table>
  );
}

export default ArchiveTable;
