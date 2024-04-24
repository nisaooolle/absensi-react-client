import React from "react";
import Navbar from "../../../components/NavbarUser";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

function AddLokasi() {
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
          <div class="p-4 ">
            <div class="p-5">
              {/* <!-- Card --> */}
              <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                {/* <!-- Header --> */}
                <div class="flex justify-between">
                  <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Tambah Lokasi
                  </h6>
                </div>
                <hr />
                <div class="mt-5 text-left">
                  <form
                    method="post"
                    action="https://demo-absen.excellentsistem.com/index.php/admin/tambah_lokasi"
                  >
                    {/* <!-- Form Input --> */}
                    <div class="grid md:grid-cols-2 md:gap-6">
                      {/* <!-- Nama Lokasi Input --> */}
                      <div class="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="nama_lokasi"
                          id="nama_lokasi"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autocomplete="off"
                          value=""
                          required
                        />
                        <label
                          for="nama_lokasi"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Nama Lokasi
                        </label>
                      </div>

                      {/* <!-- Alamat Kantor Input --> */}
                      <div class="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="alamat_kantor"
                          id="alamat_kantor"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autocomplete="off"
                          value=""
                          required
                        />
                        <label
                          for="alamat_kantor"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Alamat Kantor
                        </label>
                      </div>
                    </div>

                    <div class="grid md:grid-cols-2 md:gap-6">
                      {/* <!-- Pilihan Organisasi --> */}
                      <div class="relative z-0 w-full mb-6 group">
                        <select
                          id="organisasi"
                          name="id_organisasi"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          required
                        >
                          <option selected>Pilih Organisasi</option>
                          <option value="1">
                            SMK Bina Nusantara Semarang{" "}
                          </option>
                          <option value="3">SMK Bina Nusantara Demak </option>
                          <option value="7">Excellent Computer </option>
                        </select>
                        <label
                          for="organisasi"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        ></label>
                      </div>
                    </div>

                    {/* <!-- Button --> */}
                    <div class="flex justify-between">
                      <a
                        class="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        href="/admin/lokasi"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </a>
                      <button
                        type="submit"
                        class="text-white bg-indigo-500  focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                      >
                       <FontAwesomeIcon icon={faFloppyDisk} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLokasi;
