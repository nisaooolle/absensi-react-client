import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faPrint } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { Pagination } from "flowbite-react";
import { API_DUMMY } from "../../../utils/api";
import SidebarNavbar from "../../../components/SidebarNavbar";
import NavbarAdmin from "../../../components/NavbarAdmin";

function Lembur() {
  const [lembur, setLembur] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAllLembur = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${API_DUMMY}/api/lembur/getall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLembur(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAllLembur();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  useEffect(() => {
    const filteredData = lembur.filter(
      (lembur) =>
        (lembur.user?.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ??
          false) ||
        (lembur.keteranganLembur
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ??
          false) ||
        (formatDate(lembur.tanggalLembur)
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ??
          false)
    );
    setTotalPages(Math.ceil(filteredData.length / limit));
  }, [searchTerm, limit, lembur]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    setCurrentPage(1); // Reset to the first page when limit changes
  };

  function onPageChange(page) {
    setCurrentPage(page);
  }

  const filteredLembur = lembur.filter(
    (lembur) =>
      (lembur.user?.username.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false) ||
      (lembur.keteranganLembur
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ??
        false) ||
      (formatDate(lembur.tanggalLembur)
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ??
        false)
  );

  const paginatedLembur = filteredLembur.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const generatePdf = async (id) => {
    const token = localStorage.getItem("token");
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda ingin mengunduh file PDF?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Unduh!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios({
            url: `${API_DUMMY}/api/lembur/download-pdf/${id}`,
            method: "GET",
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Surat Lembur.pdf");
          document.body.appendChild(link);
          link.click();

          Swal.fire("Berhasil", "Berhasil Mengunduh Pdf", "success");
        } catch (error) {
          console.log(error);
          Swal.fire("Gagal", "Gagal Mengunduh Pdf", "error");
        }
      } else {
        Swal.fire("Dibatalkan", "Pengunduhan dibatalkan", "info");
      }
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <SidebarNavbar />
      </div>
      <div className="flex h-full">
        <div className="sticky top-16 z-40">
          <NavbarAdmin />
        </div>
        <div className="content-page flex-1 p-8 md:ml-64 mt-16 text-center overflow-auto">
          <div className="tabel-absen bg-white p-5 rounded-xl shadow-xl border border-gray-300">
            <div className="flex flex-col md:flex-row justify-between">
              <h2 className="text-xl font-bold mb-4 md:mb-0">Lembur</h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="relative w-64">
                  <input
                    type="search"
                    id="search-dropdown"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="block p-2.5 w-full z-20 text-sm rounded-l-md text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search name..."
                    required
                  />
                </div>
                <select
                  value={limit}
                  onChange={handleLimitChange}
                  className="flex-shrink-0 z-10 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="5">05</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <hr />
            </div>
            <div className="relative overflow-x-auto mt-5">
              <table
                id="dataKehadiran"
                className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
              >
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Keterangan Lembur
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Tanggal Lembur
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 whitespace-nowrap text-center"
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="text-left">
                  {paginatedLembur.length > 0 ? (
                    paginatedLembur.map((lemburData, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {(currentPage - 1) * limit + index + 1}
                        </th>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {lemburData.user.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {lemburData.keteranganLembur}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatDate(lemburData.tanggalLembur)}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center -space-x-4 ml-12">
                            <a href={`/admin/detailLembur/${lemburData.id}`}>
                              <button className="z-30 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-red-50">
                                <span className="relative inline-block">
                                  <FontAwesomeIcon
                                    icon={faInfo}
                                    className="h-4 w-4"
                                  />
                                </span>
                              </button>
                            </a>
                            <button
                              type="button"
                              onClick={() => generatePdf(lemburData.id)}
                              className="z-30 block rounded-full border-2 border-white bg-yellow-100 p-4 text-yellow-700 active:bg-red-50"
                            >
                              <span className="relative inline-block">
                                <FontAwesomeIcon
                                  icon={faPrint}
                                  className="h-4 w-4"
                                />
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        Tidak ada data yang ditampilkan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
              className="mt-5"
              layout="table"
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              showIcons
              previousLabel=""
              nextLabel=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lembur;
