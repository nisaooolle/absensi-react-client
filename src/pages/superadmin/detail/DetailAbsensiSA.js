import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../../components/NavbarAdmin";
import Sidebar from "../../../components/SidebarUser";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

function DetailAbsensiSA() {
  const [absensi, setAbsensi] = useState(null);
  const { id } = useParams();

  const getAbsensiId = async () => {
    try {
      const res = await axios.get(
        `http://localhost:2024/api/absensi/getData/${id}`
      );
      setAbsensi(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAbsensiId();
  }, [id]);

  if (!absensi) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
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
        <div class=" sm:ml-64 content-page container p-8  ml-14 md:ml-64 mt-12">
          <div class="p-4">
            <div class="p-5 mt-5">
              {/* <!-- Card --> */}
              <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                {/* <!-- Header --> */}
                <div class="flex justify-between">
                  <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Detail Absen
                  </h6>
                </div>
                <div class="mt-7 text-left">
                  <hr />
                </div>
                <div class="mt-7 text-left">
                  <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="admin"
                        id="admin"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        autocomplete="off"
                        value={absensi?.user?.admin?.username || ""}
                        required
                        readonly
                      />
                      <label
                        for="admin"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Admin
                      </label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="organisasi"
                        id="organisasi"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        autocomplete="off"
                        value={absensi?.user?.organisasi?.namaOrganisasi || ""}
                        required
                        readonly
                      />
                      <label
                        for="organisasi"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Organisasi
                      </label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        autocomplete="off"
                        value={absensi.user?.username || ""}
                        required
                        readonly
                      />
                      <label
                        for="username"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        User
                      </label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="tanggal"
                        id="tanggal"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        autocomplete="off"
                        value={formatDate(absensi.tanggalAbsen)}
                        required
                        readonly
                      />
                      <label
                        for="tanggal"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Tanggal
                      </label>
                    </div>

                    <div class="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="jam_masuk"
                        id="jam_masuk"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        autocomplete="off"
                        value={absensi.jamMasuk}
                        required
                        readonly
                      />
                      <label
                        for="jam_masuk"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Jam Masuk
                      </label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="jam_pulang"
                        id="jam_pulang"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        autocomplete="off"
                        value={absensi.jamPulang}
                        required
                        readonly
                      />
                      <label
                        for="jam_pulang"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Jam Pulang
                      </label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="lokasi"
                        id="lokasi"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        autocomplete="off"
                        value={absensi.lokasiMasuk ? absensi.lokasiMasuk : "-"}
                        required
                        readonly
                      />
                      <label
                        for="lokasi"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Lokasi Masuk
                      </label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="lokasi"
                        id="lokasi"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        autocomplete="off"
                        value={
                          absensi.lokasiPulang ? absensi.lokasiPulang : "-"
                        }
                        required
                        readonly
                      />
                      <label
                        for="lokasi"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Lokasi Pulang
                      </label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <img
                        class="max-width-100 max-height-70 mt-10"
                        style={{ marginBottom: "25px", marginLeft: "5px" }}
                        src={absensi.fotoMasuk ? absensi.fotoMasuk : "-"}
                        alt="Foto Masuk"
                      />
                      <label
                        for="foto"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Foto Masuk:
                      </label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      {" "}
                      <img
                        class="max-width-100 max-height-70 mt-10"
                        style={{ marginBottom: "25px", marginLeft: "5px" }}
                        src={absensi.fotoPulang ? absensi.fotoPulang : "-"}
                        alt="Foto Pulang"
                      />
                      <label
                        for="foto"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Foto Pulang:
                      </label>
                    </div>

                    <div class="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="statusabsen"
                        id="statusabsen"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        autocomplete="off"
                        value={absensi.statusAbsen}
                        required
                        readonly
                      />
                      <label
                        for="statusabsen"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Status Absen
                      </label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="keterangan"
                        id="keterangan"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=""
                        autocomplete="off"
                        value={
                          absensi.keteranganTerlambat
                            ? absensi.keteranganTerlambat
                            : "-"
                        }
                        required
                        readonly
                      />
                      <label
                        for="keterangan"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Keterangan Terlambat
                      </label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="keterangan"
                        id="keterangan"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=""
                        autocomplete="off"
                        value={
                          absensi.keteranganPulangAwal
                            ? absensi.keteranganPulangAwal
                            : "-"
                        }
                        required
                        readonly
                      />
                      <label
                        for="keterangan"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Keterangan Pulang Awal
                      </label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="keterangan"
                        id="keterangan"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=""
                        autocomplete="off"
                        value={
                          absensi.keteranganIzin ? absensi.keteranganIzin : "-"
                        }
                        required
                        readonly
                      />
                      <label
                        for="keterangan"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Keterangan Izin
                      </label>
                    </div>
                  </div>

                  <div class=" text-left mt-4">
                    {/* <!-- email & username Input --> */}
                    <div class="grid grid-cols-2 gap-4">
                      <div class="relative z-0 w-full mb-6 group">
                        <div class="flex justify-between">
                          <a
                            class="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            href="/superadmin/absensi"
                          >
                            <FontAwesomeIcon icon={faArrowLeft} />{" "}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailAbsensiSA;