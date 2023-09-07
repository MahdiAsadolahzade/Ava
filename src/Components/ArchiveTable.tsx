import { useEffect, useState } from "react";
import axios from "axios";
import ArchiveSideButtons from "../assets/Icons/ArchiveSideButtons";
import { parseISO } from "date-fns";
import moment from "jalali-moment";
import loadingbar from "../../public/loadingbar.gif";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import React from "react";
import "./ArchieTable.css";
import "./Voicerecording.css";
import ArchiveDetail from "./ArchiveDetail";

const Token = import.meta.env.VITE_SOME_KEY;
const apiUrl = "https://harf.roshan-ai.ir/api/requests";

function convertToPersianDigits(input: string | null) {
  if (input === null) {
    return "";
  }

  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return input.replace(/[0-9]/g, (match) => persianDigits[parseInt(match)]);
}

function convertAndFormatDate(dateTimeString: string) {
  const dateObject = parseISO(dateTimeString);
  const gregorianDate = dateObject.toISOString().split("T")[0];
  const jalaliDate = moment(gregorianDate, "YYYY-MM-DD").locale("fa");
  const faDate = jalaliDate.format("jYYYY-jMM-jDD");
  const formattedFaDate = convertToPersianDigits(faDate);
  return formattedFaDate;
}

function extractFileType(mediaUrls: any) {
  if (Array.isArray(mediaUrls)) {
    return "link";
  } else if (typeof mediaUrls === "string") {
    if (mediaUrls.startsWith("http://harf.roshan-ai.ir/media/files")) {
      return "file";
    } else {
      return "link";
    }
  } else {
    return "نامعلوم";
  }
}

function extractFileNameFromUrl(url: string) {
  if (typeof url === "string") {
    const urlParts = url.split("/");
    const fileNameWithExtension = urlParts[urlParts.length - 1];
    const fileNameWithoutExtension = fileNameWithExtension.split(".")[0];
    const fileNameWithoutNumber = fileNameWithoutExtension.split("-")[1];
    return fileNameWithoutNumber;
  }
}

function extractFileExtension(url: string) {
  if (typeof url === "string") {
    const parts = url.split(".");
    if (parts.length > 1) {
      return parts[parts.length - 1];
    }
  }
  return "نامعلوم";
}

async function fetchData(
  page: number,
  setData: (data: any) => void,
  setTotalPages: (totalPages: number) => void,
  setIsLoading: (isLoading: boolean) => void,
  setError: (error: string | null) => void
) {
  setIsLoading(true);
  try {
    const { data } = await axios.get(apiUrl, {
      params: { page },
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: "Token " + Token,
      },
    });
    setData(data.results);
    setTotalPages(data.count);
    setIsLoading(false);
  } catch (error) {
    setError("مشکلی در دریافت داده‌ها وجود دارد.");
    setIsLoading(false);
  }
}

function ArchiveTable() {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<number | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [details, setDetails] = useState<any | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [copyMessages, setCopyMessages] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [fileSizeMessage, setFileSizeMessage] = useState<{
    size: string | null;
    rowId: number | null;
  }>({ size: null, rowId: null });
  const [hoveredRowId, setHoveredRowId] = useState<number | null>(null);

  async function fetchDetails(id: number) {
    try {
      const { data } = await axios.get(
        `https://harf.roshan-ai.ir/api/get_request/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + Token,
          },
        }
      );
      setDetails(data.response_data[0]); // ذخیره اطلاعات جزئیت در state
      console.log(data.response_data[0].segments);
    } catch (error) {
      console.error("خطا در دریافت اطلاعات جزئیت: ", error);
    }
  }

  const toggleRowExpansion = (id: number) => {
    setSelectedItemId(selectedItemId === id ? null : id);
  };

  const handleDeleteClick = (id: number) => {
    setItemToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const getFullText = (idToCollect: number) => {
    if (!details || !details.segments) {
      return ""; // اگر اطلاعات یا segments موجود نباشد، یک مقدار خالی برگردانید
    }

    // چک کنید که idToCollect با selectedItemId یکسان است
    if (idToCollect === selectedItemId) {
      // اگر یکسان باشند، متن‌ها را از segments جمع‌آوری کنید
      const collectedTexts = details.segments.map(
        (segment: { text: any }) => segment.text
      );
      return collectedTexts.join(" ");
    }

    return ""; // اگر idToCollect با selectedItemId مطابقت نداشته باشد، یک مقدار خالی برگردانید
  };

  function showFileSize(url: string, callback: (size: string) => void) {
    fetch(url)
      .then((response) => {
        const contentLength = response.headers.get("Content-Length");
        if (contentLength) {
          const bytes = parseInt(contentLength);
          const megabytes = bytes / (1024 * 1024); // تبدیل به مگابایت
          const formattedSize =
            convertToPersianDigits(megabytes.toFixed(2)) + " مگابایت"; // نمایش با دقت دو رقم اعشار و به اعداد فارسی
          callback(formattedSize);
        }
      })
      .catch((error) => {
        console.error("خطا در دریافت اندازه فایل: ", error);
      });
  }

  function downloadAudio(url: string) {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "audio.mp3";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("خطا در دانلود فایل صوتی: ", error);
      });
  }

  function downloadTextAsWord(text: string) {
    const blob = new Blob([text], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "text.txt";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  const handleCopyText = (id: number) => {
    const textToCopy = getFullText(id);
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // بروزرسانی وضعیت کپی پیام برای سطر مورد نظر
        setCopyMessages((prevCopyMessages) => ({
          ...prevCopyMessages,
          [id]: true,
        }));

        setTimeout(() => {
          // حذف پیام کپی بعد از 2 ثانیه
          setCopyMessages((prevCopyMessages) => ({
            ...prevCopyMessages,
            [id]: false,
          }));
        }, 2000);
      })
      .catch((error) => {
        console.error("خطا در کپی متن به کلیپ‌بورد!", error);
      });
  };

  const confirmDelete = async () => {
    if (itemToDeleteId !== null) {
      try {
        const response = await axios.delete(
          `https://harf.roshan-ai.ir/api/get_request/${itemToDeleteId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Token " + Token,
            },
          }
        );
        window.location.reload();
        if (response.status === 204) {
          await fetchData(
            currentPage,
            setData,
            setTotalPages,
            setIsLoading,
            setError
          );
        } else {
        }
      } catch (error) {
        // خطایی در اجرای درخواست حذف رخ داده است
        console.error("خطا در حذف: ", error);
      }
    }
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    fetchData(currentPage, setData, setTotalPages, setIsLoading, setError);
  }, [currentPage]);

  const handlePageChange = async (page: number) => {
    try {
      const { data: newData } = await axios.get(apiUrl, {
        params: { page },
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "Token " + Token,
        },
      });
      setData(newData.results);

      setCurrentPage(page);
    } catch (error) {
      setError("مشکلی در دریافت داده‌ها وجود دارد.");
    }
  };

  const visiblePageCount = 5;
  const start = Math.max(1, currentPage - Math.floor(visiblePageCount / 2));
  const end = Math.min(totalPages, start + visiblePageCount - 1);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination flex flex-row justify-center mt-[20px]">
        {currentPage > 1 && (
          <span
            className="cursor-pointer mx-[10px] font-bold hover:text-rose-500"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {"<"}
          </span>
        )}

        {pageNumbers.map((pageNumber) => {
          if (
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= start && pageNumber <= end)
          ) {
            return (
              <div
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`page-number ${
                  currentPage === pageNumber
                    ? "active text-white bg-teal-500 rounded-full w-[25px] h-[25px] "
                    : ""
                } flex flex-row justify-center cursor-pointer mx-[5px]`}
              >
                {pageNumber}
              </div>
            );
          } else if (pageNumber === start - 1 || pageNumber === end + 1) {
            return (
              <span className="mx-[10px]" key={pageNumber}>
                {" ... "}
              </span>
            );
          }
          return null;
        })}

        {currentPage < totalPages && (
          <span
            className="cursor-pointer mx-[10px] font-bold hover:text-rose-500 "
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {">"}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      {isLoading ? (
        <div
          className="flex flex-row justify-center items-center w-[150px] h-[150px] mt-[200px]"
          style={{
            background: `url(${loadingbar})`,
            backgroundSize: "cover",
          }}
        ></div>
      ) : (
        <>
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirmDelete={() => confirmDelete()}
          />
          <div
            className="mx-auto mt-[10px] w-[85%] custom-scroll"
            style={{ maxHeight: 550 }}
          >
            <table className="table-auto  table ">
              <thead className="">
                <tr className="head-row ">
                  <th className="text-center "></th>
                  <th className="text-right">نام فایل</th>
                  <th className="text-center ">تاریخ بارگذاری</th>
                  <th className="text-center ">نوع فایل</th>
                  <th className="text-center ">مدت زمان</th>
                  <th className="text-center "></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: any) => (
                  <React.Fragment key={item.id}>
                    <tr
                      className={`hover:shadow  ${
                        expandedRows.has(item.id) ? "expanded" : ""
                      } ${item.id}`}
                    >
                      <td className="text-center h-9  w-[10%]">
                        {extractFileType(item.request_data.media_urls) ===
                          "file" && ArchiveSideButtons.Upload}
                        {extractFileType(item.request_data.media_urls) ===
                          "link" && ArchiveSideButtons.Link}
                      </td>
                      <td className="w-[30%] ">
                        <p
                          className={`truncate text-right w-[400px] cursor-pointer  ${
                            extractFileType(item.request_data.media_urls) ===
                              "link" && "text-sky-600"
                          }`}
                          dir="ltr"
                          onClick={() => {
                            toggleRowExpansion(item.id);
                            fetchDetails(item.id);
                          }}
                        >
                          {extractFileType(item.request_data.media_urls) ===
                            "file" &&
                            extractFileNameFromUrl(
                              item.request_data.media_urls
                            )}
                          {extractFileType(item.request_data.media_urls) ===
                            "link" && item.request_data.media_urls}
                        </p>
                      </td>
                      <td className="text-center  w-[15%]">
                        {convertAndFormatDate(item.date)}
                      </td>
                      <td className="text-center w-[15%] ">
                        {extractFileType(item.request_data.media_urls) ===
                          "file" &&
                          extractFileExtension(item.request_data.media_urls) +
                            "."}
                        {extractFileType(item.request_data.media_urls) ===
                          "link" &&
                          extractFileExtension(
                            item.request_data.media_urls[0]
                          ) + "."}
                      </td>
                      <td className="text-center w-[15%]">
                        {convertToPersianDigits(item.duration)}
                      </td>
                      <td className="flex flex-row relative items-center text-center h-9">
                      {fileSizeMessage.size &&
                          fileSizeMessage.rowId === item.id && (
                            <div
                              className={`file-size-message ${
                                hoveredRowId === item.id ? "" : "hidden"
                              }`}
                            >
                              {fileSizeMessage.size}
                            </div>
                          )}
                        <div
                          className="cursor-pointer w-7 h-7 flex items-center"
                          onClick={() => downloadAudio(details["media_url"])}
                          onMouseEnter={() => {
                            setHoveredRowId(item.id);
                            showFileSize(
                              item.request_data.media_urls,
                              (size) => {
                                // تغییر مقدار حجم در state و ارسال شناسه سطر
                                setFileSizeMessage({ size, rowId: item.id });
                              }
                            ); // ارسال شناسه سطر به تابع showFileSize
                          }}
                          onMouseLeave={() => {
                            // حذف مقدار حجم از state و ارسال شناسه سطر به تابع showFileSize
                            setFileSizeMessage({ size: null, rowId: item.id });
                          }}
                        >
                          {ArchiveSideButtons.Download}
                        </div>
                       
                        <div
                          className="cursor-pointer w-7 h-7 flex items-center"
                          onClick={() =>
                            downloadTextAsWord(getFullText(item.id))
                          }
                        >
                          {ArchiveSideButtons.Word}
                        </div>
                        <div
                          className="cursor-pointer w-7 h-7 flex items-center "
                          onClick={() => handleCopyText(item.id)}
                        >
                          {ArchiveSideButtons.Copy}
                        </div>
                        {copyMessages[item.id] && (
                          <div className="copy-message">متن کپی شد!</div>
                        )}
                        <div
                          onClick={() => handleDeleteClick(item.id)}
                          className="cursor-pointer w-7 h-7 flex justify-center  text-[#8F8F8F] hover:text-white items-center hover:bg-rose-500 hover:rounded-full "
                        >
                          {ArchiveSideButtons.Delete}
                        </div>
                      </td>
                    </tr>
                    {selectedItemId === item.id && (
                      <tr className="expanded-details ">
                        <td
                          colSpan={6}
                          className={`border-[1px] rounded-[25px]  ${
                            extractFileType(item.request_data.media_urls) ===
                              "file" && "border-sky-500"
                          } ${
                            extractFileType(item.request_data.media_urls) ===
                              "link" && "border-rose-500"
                          }`}
                        >
                          {extractFileType(item.request_data.media_urls) ===
                            "file" && (
                            <ArchiveDetail
                              Section={"upload"}
                              ExportData={details}
                            />
                          )}
                          {extractFileType(item.request_data.media_urls) ===
                            "link" && (
                            <ArchiveDetail
                              Section={"link"}
                              ExportData={details}
                            />
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {renderPageNumbers()}
        </>
      )}
    </div>
  );
}

export default ArchiveTable;
