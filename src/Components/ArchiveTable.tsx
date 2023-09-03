import { useEffect, useState } from "react";
import axios from "axios";
import ArchiveSideButtons from "../assets/Icons/ArchiveSideButtons";
const Token = import.meta.env.VITE_SOME_KEY;

interface RequestData {
  id: number;
  request_type: string;
  request_data: {
    media_url: string;
    media_urls: string;
    type: string;
    filename: string;
    linkaddress:string;
  };
  duration: string;
  date: string;
}
const apiUrl = "https://harf.roshan-ai.ir/api/requests";

function ArchiveTable() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          apiUrl,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: "Token " + Token,
            },
          });
        setData(data.results); // نوع داده‌ها به صورت any
      } catch (error) {
        setError("مشکلی در دریافت داده‌ها وجود دارد.");
      }
    }

    fetchData();
  }, []);

  return (
    <table className="table-auto mx-auto mt-[20px] w-[80%] border-separate border-spacing-y-6">
      <thead className="">
        <tr className="head-row ">
          <th className="text-center  mr-[10px]"></th>
          <th className="text-right w-[30%]">نام فایل</th>
          <th className="text-center">تاریخ بارگذاری</th>
          <th className="text-center">نوع فایل</th>
          <th className="text-center">مدت زمان</th>
          <th className="text-center w-[10%]"></th>
        </tr>
      </thead>
      <tbody>
        <tr className="">
          <td className="text-center">{ArchiveSideButtons.Link}</td>
          <td className="text-center">
            <p className="truncate w-[90%] text-sky-600" dir="ltr">
              https://irsv.upmusics.com/Downloads/Musics/Sirvan%20Ky637fgbndrt94
            </p>
          </td>
          <td className="text-center">۱۴۰۰-۰۸-۲۱</td>
          <td className="text-center">mp3.</td>
          <td className="text-center">۴:۲۹</td>
          <td className="flex flex-row justify-evenly items-center text-center h-9">
            <div className="cursor-pointer ">{ArchiveSideButtons.Download}</div>
            <div className="cursor-pointer ">{ArchiveSideButtons.Word}</div>
            <div className="cursor-pointer ">{ArchiveSideButtons.Copy}</div>
            <div className="cursor-pointer hover:bg-red-500 hover:rounded-full">
              {ArchiveSideButtons.Delete}
            </div>
          </td>
        </tr>
        {data.map((item: any) => (
            <tr key={item.id}>
              <td className="text-center">{item.request_data.type ==="file" && ArchiveSideButtons.Upload}{item.request_data.type ==="link" && ArchiveSideButtons.Link}{item.request_data.type ==="record" && ArchiveSideButtons.Record}</td>
              <td className="text-right w-[30%]">{item.request_data.type ==="file" && item.request_data.filename}{item.request_data.type ==="link" && item.request_data.linkaddress}</td>
              <td className="text-center">{item.date}
              </td>
              <td className="text-center">{item.duration}</td>
              <td className="text-center">{item.date}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default ArchiveTable;
