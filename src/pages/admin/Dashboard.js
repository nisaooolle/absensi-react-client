import React, { useEffect, useState } from "react";
import Sidebar from "../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faClipboardUser, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/NavbarUser";
// import Highcharts from "highcharts";

function Dashboard() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Perbarui setiap detik

    return () => clearInterval(interval);
  }, []); // Tidak ada dependensi, jadi efek ini hanya dipanggil sekali saat komponen dimuat

  // Fungsi untuk menambah nol di depan angka jika angka kurang dari 10
  const addLeadingZero = (num) => {
    return num < 10 ? "0" + num : num;
  };

  // Mendapatkan informasi hari, tanggal, dan waktu
  const day = currentDateTime.toLocaleDateString("id-ID", { weekday: "long" });
  const date = currentDateTime.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const time =
    addLeadingZero(currentDateTime.getHours()) +
    ":" +
    addLeadingZero(currentDateTime.getMinutes()) +
    ":" +
    addLeadingZero(currentDateTime.getSeconds());

  // useEffect(() => {
  //   const chartOptions = {
  //     chart: {
  //       type: "column",
  //     },
  //     title: {
  //       text: "Total Absensi per Hari",
  //     },
  //     xAxis: {
  //       type: "category",
  //       categories: ["2024-02-29"],
  //     },
  //     yAxis: {
  //       title: {
  //         text: "Jumlah Absensi",
  //       },
  //     },
  //     series: [
  //       {
  //         name: "Total Absensi",
  //         colorByPoint: true,
  //         data: [
  //           {
  //             name: "2024-02-29",
  //             y: 1,
  //           },
  //         ],
  //       },
  //     ],
  //   };

  //   Highcharts.chart("container", chartOptions);
  // }, []);
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex h-full">
        <div className="fixed">
          <Sidebar />
        </div>
        <div className="content-page container p-8  ml-0 md:ml-64 mt-12">
          <div class="menu-items text-center bg-slate-300 h-28 ">
          <h1 className="judul text-3xl font-semibold text-center mb-6">
            Selamat Datang di Absensi
          </h1>
            <a class="profile-menu-link">{day}, </a>
            <a class="profile-menu-link active">{date} - </a>
            <a class="profile-menu-link">{time}</a>
          </div>{" "}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-12">
            {/* Ubah class untuk lebar saat di mode desktop */}
            <div className="pl-2 h-32 bg-green-400 rounded-lg shadow-md md:w-auto">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">User</p>
                  <p className="text-lg">Jumlah User</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faUsers} size="2x" />
                </div>
              </div>
            </div>
            <div className="pl-2 h-32 bg-red-400 rounded-lg shadow-md md:w-auto">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">Absensi</p>
                  <p className="text-lg">Jumlah Absen</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faClipboardUser} size="2x" />{" "}
                  {/* Menggunakan properti size untuk memperbesar ikon */}
                </div>
              </div>
            </div>
            <div className="pl-2 h-32 bg-red-800 rounded-lg shadow-md md:w-auto">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">Cuti</p>
                  <p className="text-lg">Jumlah Cuti</p>
                </div>
                <div className="my-auto">
                <FontAwesomeIcon icon={faCalendarDays} size="2x" />
                  {/* Menggunakan properti size untuk memperbesar ikon */}
                </div>
              </div>
            </div>
          </div>
          <br />
          {/* <!-- Tabel Absensi --> */}
          <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-between">
              <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                History absensi
              </h6>
            </div>
            <hr />

            {/* <!-- Tabel --> */}
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      No
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Username
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Tanggal
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Jam Masuk
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Jam Pulang
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Kehadiran
                    </th>
                  </tr>
                </thead>

                {/* <!-- Tabel Body --> */}
                <tbody class="text-center">
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      1{" "}
                    </th>
                    <td class="px-6 py-4">Layla Rabi'atus Syarifah </td>
                    <td class="px-6 py-4">29 Februari 2024 </td>
                    <td class="px-6 py-4">22:27:53 </td>
                    <td class="px-6 py-4">22:27:58 </td>
                    <td class="px-6 py-4">Terlambat </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br />
          {/* <!-- Table Cuti --> */}
          <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-between">
              <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Detail History Cuti
              </h6>
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      No
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Username
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Cuti Dari
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Sampai
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Masuk Kerja
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Keperluan
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      1{" "}
                    </th>
                    <td class="px-6 py-4">Layla Rabi'atus Syarifah </td>
                    <td class="px-6 py-4">26 Januari 2024 </td>
                    <td class="px-6 py-4">28 Januari 2024 </td>
                    <td class="px-6 py-4">29 Januari 2024 </td>
                    <td class="px-6 py-4">tes </td>
                    <td class="px-6 py-4">Disetujui </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br />
          {/* <!-- Tabel Jabatan --> */}
          <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-between">
              <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Detail Data Jabatan
              </h6>
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      No
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Username
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Nama Jabatan
                    </th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50
                                  dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      1{" "}
                    </th>
                    <td class="px-6 py-4">Admin_demo </td>
                    <td class="px-6 py-4">Magang </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br />
          {/* <!-- Tabel Lokasi --> */}
          <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-between">
              <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Detail Data Lokasi
              </h6>
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      No
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Username
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Nama Lokasi
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Alamat
                    </th>
                  </tr>
                </thead>
                <tbody class="text-center"></tbody>
              </table>
            </div>
          </div>
          <br />
          {/* <!-- Tabel Organisasi --> */}
          <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-between">
              <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Detail Data Organisasi
              </h6>
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      No
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Username
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Alamat
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Telepon
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      1{" "}
                    </th>
                    <td class="px-6 py-4">Admin_demo </td>
                    <td class="px-6 py-4">bulustalan </td>
                    <td class="px-6 py-4">098756381624 </td>
                    <td class="px-6 py-4">
                      <a
                        href="/cdn-cgi/l/email-protection"
                        class="__cf_email__"
                        data-cfemail="ea8f92898f86868f849eaa8d878b8386c4898587"
                      >
                        [email&#160;protected]
                      </a>{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-between">
              <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Kehadiran Lebih Awal
              </h6>
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      No
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Username
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Jabatan
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Jumlah Lebih Awal
                    </th>
                  </tr>
                </thead>
                <tbody class="text-center"></tbody>
              </table>
            </div>
          </div>
          <br />
          {/* <!-- Tabel User --> */}
          <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-between">
              <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Detail Data User
              </h6>
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      No
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Username
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      1{" "}
                    </th>
                    <td class="px-6 py-4">Layla Rabi'atus Syarifah </td>
                    <td class="px-6 py-4">
                      <a
                        href="/cdn-cgi/l/email-protection"
                        class="__cf_email__"
                        data-cfemail="81ede0f8ede0c1e6ece0e8edafe2eeec"
                      >
                        [email&#160;protected]
                      </a>{" "}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      2{" "}
                    </th>
                    <td class="px-6 py-4">Hidayatul Muna </td>
                    <td class="px-6 py-4">
                      <a
                        href="/cdn-cgi/l/email-protection"
                        class="__cf_email__"
                        data-cfemail="2f425a414e6f48424e4643014c4042"
                      >
                        [email&#160;protected]
                      </a>{" "}
                    </td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      3{" "}
                    </th>
                    <td class="px-6 py-4">Kamilia Qotrunnada </td>
                    <td class="px-6 py-4">
                      <a
                        href="/cdn-cgi/l/email-protection"
                        class="__cf_email__"
                        data-cfemail="ef848e828683868eaf88828e8683c18c8082"
                      >
                        [email&#160;protected]
                      </a>{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <footer class="bg-gray-700 shadow dark:bg-gray-900">
            <div class="w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
              <span class="text-sm text-white sm:text-center dark:text-gray-400">
                © 2024{" "}
                <a href="" class="hover:underline">
                  Absensi
                </a>{" "}
                by Excellent Computer
              </span>
            </div>
          </footer>
        </div>
          {/* <div
            class="w-full mt-5 mb-5 p-4 text-center bg-white border border-gray-200 rounded-lg"
            id="container"
          ></div> */}
        </div>
      </div>
  );
}

export default Dashboard;
