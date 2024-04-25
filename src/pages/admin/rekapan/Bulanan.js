import React from "react";
import Navbar from "../../../components/NavbarUser";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Bulanan() {
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex h-full">
        <div className="fixed">
          <Sidebar />
        </div>
        <div class="sm:ml-64 content-page container p-8 ml-0 md:ml-64 mt-12">
          <div class="p-4">
            <div class="p-5 ">
              <main id="content" class="flex-1 p-4 sm:p-6">
                <div class="bg-white rounded-lg shadow-md p-4">
                  <div class="flex justify-between">
                    <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                      Rekap Bulanan Semua Karyawan
                    </h6>
                  </div>
                  <hr />
                  <form
                    action="https://demo-absen.excellentsistem.com/admin/rekap_bulanan"
                    method="get"
                    class="flex flex-col sm:flex-row justify-center items-center gap-4 mt-5"
                  >
                    <select
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      id="bulan"
                      name="bulan"
                    >
                      <option>Pilih Bulan</option>
                      <option value="01">Januari</option>
                      <option value="02">Februari</option>
                      <option value="03">Maret</option>
                      <option value="04">April</option>
                      <option value="05">Mei</option>
                      <option value="06">Juni</option>
                      <option value="07">Juli</option>
                      <option value="08">Agustus</option>
                      <option value="09">September</option>
                      <option value="10">Oktober</option>
                      <option value="11">November</option>
                      <option value="12">Desember</option>
                    </select>
                    <input
                      type="number"
                      id="form_tahun"
                      name="tahun"
                      value=""
                      class="w-40 sm:w-64 sm:w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-3 "
                      placeholder="Pilih Tahun"
                      pattern="[0-9]{4}"
                    />
                    <label
                      for="tahun"
                      class="mx-2 mb-2 absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-900 dark:text-white ml-auto"
                    ></label>
                    <div class="flex sm:flex-row gap-4 mx-auto items-center">
                      <button
                        type="submit"
                        class="bg-indigo-500 hover:bg-indigo text-white font-bold py-2 px-4 rounded inline-block"
                      >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </button>
                      <a
                        href="https://demo-absen.excellentsistem.com/admin/export_all_karyawan?bulan=&tahun="
                        class="exp bg-green-500 hover:bg-green text-white font-bold py-2 px-4 rounded inline-block ml-auto"
                      >
                        <FontAwesomeIcon icon={faFileExport} />
                      </a>
                    </div>
                  </form>

                  <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 px-4 py-3">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" class="px-5 py-3">
                            No
                          </th>
                          <th scope="col" class="px-5 py-3">
                            Nama
                          </th>
                          <th scope="col" class="px-5 py-3">
                            Tanggal
                          </th>
                          <th scope="col" class="px-5 py-3">
                            Jam Masuk
                          </th>
                          <th scope="col" class="px-5 py-3">
                            Foto Masuk
                          </th>
                          <th scope="col" class="px-5 py-3">
                            Lokasi Masuk
                          </th>
                          <th scope="col" class="px-5 py-3">
                            Jam Pulang
                          </th>
                          <th scope="col" class="px-5 py-3">
                            Foto Pulang
                          </th>
                          <th scope="col" class="px-5 py-3">
                            Jam Kerja
                          </th>
                          <th scope="col" class="px-5 py-3">
                            Keterangan
                          </th>
                        </tr>
                      </thead>
                      <tbody class="text-left"></tbody>
                    </table>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bulanan;