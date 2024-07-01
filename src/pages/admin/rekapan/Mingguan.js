import React, { useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExport,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

function Mingguan() {
  const [absensi, setAbsensi] = useState({});
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (tanggalAwal && tanggalAkhir) {
      try {
        const response = await axios.get(
          "http://localhost:2024/api/absensi/rekap-mingguan",
          {
            params: {
              tanggalAwal: tanggalAwal,
              tanggalAkhir: tanggalAkhir,
            },
          }
        );
        setAbsensi(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      }
    }
  };

  const exportMingguan = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2024/api/absensi/export/absensi-mingguan",
        {
          params: {
            tanggalAwal: tanggalAwal,
            tanggalAkhir: tanggalAkhir,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "AbsensiMingguan.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      Swal.fire("Berhasil", "Berhasil mengunduh data", "success");
    } catch (error) {
      Swal.fire("Error", "Gagal mengunduh data", "error");
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const formatLamaKerja = (startKerja) => {
    const startDate = new Date(startKerja);
    const currentDate = new Date();

    const diffYears = currentDate.getFullYear() - startDate.getFullYear();

    let diffMonths = currentDate.getMonth() - startDate.getMonth();
    if (diffMonths < 0) {
      diffMonths += 12;
    }

    let diffDays = Math.floor(
      (currentDate - startDate) / (1000 * 60 * 60 * 24)
    );

    const lastDayOfLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
    if (currentDate.getDate() < startDate.getDate()) {
      diffMonths -= 1;
      diffDays -= lastDayOfLastMonth;
    }

    let durationString = "";
    if (diffYears > 0) {
      durationString += `${diffYears} tahun `;
    }
    if (diffMonths > 0) {
      durationString += `${diffMonths} bulan `;
    }
    if (diffDays > 0) {
      durationString += `${diffDays} hari`;
    }

    return durationString.trim();
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex h-full">
        <div className="fixed">
          <Sidebar />
        </div>
        <div className="sm:ml-64 content-page container p-8 ml-0 md:ml-64 mt-12">
          <div className="p-4">
            <div className="p-5">
              <div className="w-full p-4 text-center bg-white border border-gray-200 shadow sm:p-8 dark:bg-gray-800">
                <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  Rekap Mingguan
                </h6>
                <hr />
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-5"
                >
                  <input
                    type="date"
                    className="appearance-none block w-full bg-white border border-gray-300 rounded py-2 px-3 text-gray-700"
                    value={tanggalAwal}
                    onChange={(e) => setTanggalAwal(e.target.value)}
                  />
                  <input
                    type="date"
                    className="appearance-none block w-full bg-white border border-gray-300 rounded py-2 px-3 text-gray-700"
                    value={tanggalAkhir}
                    onChange={(e) => setTanggalAkhir(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo text-white font-bold py-2 px-4 rounded inline-block"
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                  <button
                    onClick={exportMingguan}
                    className="exp bg-green-500 hover:bg-green text-white font-bold py-2 px-4 rounded inline-block ml-auto"
                  >
                    <FontAwesomeIcon icon={faFileExport} />
                  </button>
                </form>
                {error && <div className="text-red-500 mt-4">{error}</div>}
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 py-3">
                  {Object.keys(absensi).length === 0 ? (
                    <div>
                      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mt-5 mb-3">
                        Tidak Ada Absen Minggu ini !!
                      </h1>
                      <p className="text-center">Silahkan pilih tanggal lain</p>
                    </div>
                  ) : (
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            No
                          </th>
                          {/* <th scope="col" className="px-6 py-3">
                            Rentang Tanggal
                          </th> */}
                          <th scope="col" className="px-6 py-3">
                            Nama
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Tanggal
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Jam Masuk
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Foto Masuk
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Jam Pulang
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Foto Pulang
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Jam Kerja
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Keterangan
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(absensi).map(
                          ([weekRange, absensiList], index) => (
                            <React.Fragment key={weekRange}>
                              {absensiList.map((absensi, idx) => (
                                <tr
                                  key={idx}
                                  className="bg-white border-b dark:bg-gray-800"
                                >
                                  <td className="px-6 py-4 text-center">
                                    {index + 1}
                                  </td>

                                  <td className="px-6 py-4 capitalize">
                                    {absensi.user.username}
                                  </td>
                                  <td className="px-6 py-4 capitalize">
                                    {formatDate(absensi.tanggalAbsen)}
                                  </td>
                                  <td className="px-6 py-4 capitalize">
                                    {absensi.jamMasuk}
                                  </td>
                                  <td className="px-6 py-4">
                                    <img
                                      src={absensi.fotoMasuk}
                                      alt="foto masuk"
                                      className="w-16 h-8 rounded-sm"
                                    />
                                  </td>
                                  <td className="px-6 py-4 capitalize">
                                    {absensi.jamPulang}
                                  </td>
                                  <td className="px-6 py-4">
                                    <img
                                      src={absensi.fotoPulang}
                                      alt="foto pulang"
                                      className="w-16 h-8 rounded-sm"
                                    />
                                  </td>
                                  <td className="px-6 py-4">
                                    {formatLamaKerja(absensi.user.startKerja)}
                                  </td>
                                  <td className="px-6 py-4 capitalize">
                                    {absensi.statusAbsen}
                                  </td>
                                </tr>
                              ))}
                            </React.Fragment>
                          )
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mingguan;
