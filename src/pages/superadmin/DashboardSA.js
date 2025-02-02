import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavbarSuper";
import Sidebar from "../../components/SidebarUser";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faClipboardUser,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../utils/api";
import SidebarNavbar from "../../components/SidebarNavbar";
import { Pagination } from "flowbite-react";
// import jwt from 'jsonwebtoken';

function DashboardSA() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [userData, setUserData] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [absenData, setAbsenData] = useState([]);
  const [jabatanData, setJabatanData] = useState([]);
  const [lokasiData, setLokasiData] = useState([]);
  const [organisasiData, setOrganisasiData] = useState([]);
  const [username, setUsername] = useState("");
  const token = localStorage.getItem("token");
  const idSuperAdmin = localStorage.getItem("superadminId");
  const id = localStorage.getItem("superadminId");
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm1, setSearchTerm1] = useState("");
  const [limit1, setLimit1] = useState(5);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [totalPages1, setTotalPages1] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const addLeadingZero = (num) => (num < 10 ? "0" + num : num);

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

  const fetchData = async (url, setter) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setter(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getUser = () =>
    fetchData(`${API_DUMMY}/api/user/get-allUser`, setUserData);
  const getAbsensi = () =>
    fetchData(`${API_DUMMY}/api/absensi/getAll`, setAbsenData);
  const getJabatan = () =>
    fetchData(`${API_DUMMY}/api/jabatan/all`, setJabatanData);
  const getLokasi = () =>
    fetchData(`${API_DUMMY}/api/lokasi/getall`, setLokasiData);
  const getOrganisasi = () =>
    fetchData(
      `${API_DUMMY}/api/organisasi/superadmin/${id}`,
      setOrganisasiData
    );

  const getUsername = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/superadmin/getbyid/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsername(response.data.username);
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  const getAdmin = async () => {
    const token = localStorage.getItem("token");
    const idSuperAdmin = localStorage.getItem("superadminId");

    try {
      const response = await axios.get(
        `${API_DUMMY}/api/admin/get-all-by-super/${idSuperAdmin}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setAdmin(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getOrganisasiSA = async () => {
    const idSuperAdmin = localStorage.getItem("superadminId");
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${API_DUMMY}/api/organisasi/superadmin/${idSuperAdmin}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setOrganisasiData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatDate = (tanggal) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    getUser();
    getAbsensi();
    getUsername();
    getJabatan();
    getLokasi();
    getOrganisasi();
    getAdmin();
    getOrganisasiSA();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("loginSuccess") === "true") {
      Swal.fire({
        icon: "success",
        title: "Berhasil masuk!",
      });
      localStorage.removeItem("loginSuccess");
    }
  }, []);

  useEffect(() => {
    const filteredData = admin.filter(
      (admin) =>
        admin.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTotalPages(Math.ceil(filteredData.length / limit));
  }, [searchTerm, limit, admin]);

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

  const filteredAdmin = admin.filter(
    (admin) =>
      admin.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedAdmin = filteredAdmin.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  useEffect(() => {
    const filteredData = organisasiData.filter(
      (organisasi) =>
        organisasi.admin?.username
          ?.toLowerCase()
          .includes(searchTerm1.toLowerCase()) ||
        organisasi.namaOrganisasi
          ?.toLowerCase()
          .includes(searchTerm1.toLowerCase()) ||
        organisasi.alamat?.toLowerCase().includes(searchTerm1.toLowerCase()) ||
        organisasi.nomerTelepon
          ?.toLowerCase()
          .includes(searchTerm1.toLowerCase()) ||
        organisasi.emailOrganisasi
          ?.toLowerCase()
          .includes(searchTerm1.toLowerCase())
    );
    setTotalPages1(Math.ceil(filteredData.length / limit1));
  }, [searchTerm1, limit1, organisasiData]);

  const handleSearch1 = (event) => {
    setSearchTerm1(event.target.value);
  };

  const handleLimitChange1 = (event) => {
    setLimit1(parseInt(event.target.value));
    setCurrentPage1(1); // Reset to the first page when limit changes
  };

  function onPageChange1(page) {
    setCurrentPage1(page);
  }

  const filteredOrganisasi = organisasiData.filter(
    (organisasi) =>
      organisasi.admin?.username
        ?.toLowerCase()
        .includes(searchTerm1.toLowerCase()) ||
      organisasi.namaOrganisasi
        ?.toLowerCase()
        .includes(searchTerm1.toLowerCase()) ||
      organisasi.alamat?.toLowerCase().includes(searchTerm1.toLowerCase()) ||
      organisasi.nomerTelepon
        ?.toLowerCase()
        .includes(searchTerm1.toLowerCase()) ||
      organisasi.emailOrganisasi
        ?.toLowerCase()
        .includes(searchTerm1.toLowerCase())
  );

  const paginatedOrganisasi = filteredOrganisasi.slice(
    (currentPage1 - 1) * limit1,
    currentPage1 * limit1
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <SidebarNavbar />
      </div>
      <div className="flex h-full">
        <div className="sticky top-16 z-40">
          <Navbar />
        </div>
        <div className="content-page container p-8 ml-0 md:ml-64 mt-12 overflow-x-hidden">
          <div className="mt-5 w-full">
            <div className="p-4 text-center bg-indigo-300 border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4">
                Selamat Datang di Absensi
                <span> @{username}</span>
              </h2>
              <a className="profile-menu-link">{day}, </a>
              <a className="profile-menu-link active">{date} - </a>
              <a className="profile-menu-link">{time}</a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-12">
            <div className="pl-2 h-32 bg-indigo-500 rounded-lg shadow-md md:w-auto">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">Organisasi</p>
                  <p className="text-lg">Jumlah Organisasi</p>
                  <p className="text-lg">{organisasiData.length}</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faUsers} size="2x" />
                </div>
              </div>
            </div>
            <div className="pl-2 h-32 bg-indigo-500 rounded-lg shadow-md md:w-auto">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">Admin</p>
                  <p className="text-lg">Jumlah Admin</p>
                  <p className="text-lg">{admin.length}</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faClipboardUser} size="2x" />
                </div>
              </div>
            </div>
            <div className="pl-2 h-32 bg-indigo-500 rounded-lg shadow-md md:w-auto">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">User</p>
                  <p className="text-lg">Jumlah User</p>
                  <p className="text-lg">{userData.length}</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faUser} size="2x" />
                </div>
              </div>
            </div>
          </div>

          <br />

          {/* Tabel Absensi */}
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between">
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Data Admin
              </h6>
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
            <hr className="mt-5" />

            {/* <!-- Tabel --> */}
            <div className="relative overflow-x-auto mt-5">
              <table
                id="dataKaryawan"
                className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
              >
                {/* <!-- Tabel Head --> */}
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Username
                    </th>
                  </tr>
                </thead>
                {/* <!-- Tabel Body --> */}
                <tbody className="text-left">
                  {paginatedAdmin.length > 0 ? (
                    paginatedAdmin
                      .slice()
                      .reverse()
                      .map((admin, index) => (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          key={index}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {(currentPage - 1) * limit + index + 1}
                          </th>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <a
                              href="/cdn-cgi/l/email-protection"
                              className="__cf_email__"
                              data-cfemail="5a363b23363b1a3d373b333674393537"
                            >
                              {admin.email}
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {admin.username}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
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
            />
          </div>
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-10">
            <div className="flex justify-between">
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Data Organisasi
              </h6>
              <div className="flex items-center gap-2 mt-2">
                <div className="relative w-64">
                  <input
                    type="search"
                    id="search-dropdown"
                    value={searchTerm1}
                    onChange={handleSearch1}
                    className="block p-2.5 w-full z-20 text-sm rounded-l-md text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search name..."
                    required
                  />
                </div>
                <select
                  value={limit1}
                  onChange={handleLimitChange1}
                  className="flex-shrink-0 z-10 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="5">05</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
            <hr className="mt-5" />

            {/* <!-- Tabel --> */}
            <div className="relative overflow-x-auto mt-5">
              <table
                id="dataKaryawan"
                className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
              >
                {/* <!-- Tabel Head --> */}
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Admin
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Alamat
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Telepon
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Email
                    </th>
                  </tr>
                </thead>
                {/* <!-- Tabel Body --> */}
                <tbody className="text-left">
                  {paginatedOrganisasi.length > 0 ? (
                    paginatedOrganisasi
                      .slice()
                      .reverse()
                      .map((organisasi, index) => (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          key={index}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {(currentPage - 1) * limit + index + 1}
                          </th>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {organisasi.admin.username}
                          </td>
                          <td className="px-6 py-4 capitalize whitespace-nowrap">
                            {organisasi.namaOrganisasi}
                          </td>
                          <td className="px-6 py-4 capitalize whitespace-nowrap">
                            {organisasi.alamat}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {organisasi.nomerTelepon}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {organisasi.emailOrganisasi}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
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
              currentPage={currentPage1}
              totalPages={totalPages1}
              onPageChange={onPageChange1}
              showIcons
            />
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export default DashboardSA;
