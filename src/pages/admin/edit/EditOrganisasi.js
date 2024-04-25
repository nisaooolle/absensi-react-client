import React from "react";
import Navbar from "../../../components/NavbarUser";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

function EditOrganisasi() {
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
            <div class="p-5 ">
              {/* <!-- Card --> */}
              <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-between">
                  <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Edit Organisasi
                  </h6>
                </div>

                <hr />

                <div class="mt-5 text-left">
                  {/* <!-- Form Update Jabatan --> */}
                  <form
                    method="post"
                    action="https://demo-absen.excellentsistem.com/admin/aksi_edit_jabatan"
                    id="updateForm"
                  >
                    <div class="mt-5 text-center">
                      {/* <!-- Mengubah kelas "text-left" menjadi "text-center" --> */}
                      <img
                        class="mb-5 rounded-full w-48 h-48 mx-auto"
                        src="https://demo-absen.excellentsistem.com/./images/logo/"
                        alt="image description"
                      />
                    </div>
                    <input type="hidden" name="id_organisasi" value="7" />
                    <div class="grid md:grid-cols-2 md:gap-6">
                      <div class="relative z-0 w-full mb-6 group">
                        {/* <!-- Organisasi Input --> */}
                        <input
                          type="text"
                          name="nama_organisasi"
                          id="nama_organisasi"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autocomplete="off"
                          required
                          value="Excellent Computer"
                        />
                        <label
                          for="nama_organisasi"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Nama Organisasi
                        </label>
                      </div>

                      {/* <!-- Alamat Input --> */}
                      <div class="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="alamat"
                          id="alamat"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autocomplete="off"
                          required
                          value="bulustalan"
                        />
                        <label
                          for="alamat"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Alamat
                        </label>
                      </div>

                      {/* <!-- No Telepon Input --> */}
                      <div class="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="nomor_telepon"
                          id="nomor_telepon"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autocomplete="off"
                          required
                          value="098756381624"
                        />
                        <label
                          for="nomor_telepon"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          No Telepon
                        </label>
                      </div>

                      {/* <!-- Email Input --> */}
                      <div class="relative z-0 w-full mb-6 group">
                        <input
                          type="email"
                          name="email_organisasi"
                          id="email_organisasi"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autocomplete="off"
                          required
                          value="excellent@gmail.com"
                        />
                        <label
                          for="email_organisasi"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Email
                        </label>
                      </div>

                      {/* <!-- Kecamatan Input --> */}
                      <div class="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="kecamatan"
                          id="kecamatan"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autocomplete="off"
                          required
                          value="Kec.Semarang Selatan"
                        />
                        <label
                          for="kecamatan"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Kecamatan
                        </label>
                      </div>

                      {/* <!-- Kabupaten Input --> */}
                      <div class="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="kabupaten"
                          id="kabupaten"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autocomplete="off"
                          required
                          value="Semarang"
                        />
                        <label
                          for="kabupaten"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Kabupaten
                        </label>
                      </div>

                      {/* <!-- Provinsi Input --> */}
                      <div class="relative z-0 w-full mb-6 group">
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          for="provinsi"
                        >
                          Provinsi
                        </label>
                        <input
                          type="text"
                          name="provinsi"
                          id="provinsi"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autocomplete="off"
                          required
                          value="Jawa Tengah"
                        />
                      </div>

                      {/* <!-- Logo Input --> */}
                      <div class="relative z-0 w-full mb-6 group">
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          for="file_input"
                        >
                          Upload Logo
                        </label>
                        <input
                          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          id="file_input"
                          name="image"
                          type="file"
                        />
                      </div>
                    </div>

                    <br />
                    {/* <!-- Button --> */}
                    <div class="flex justify-between">
                      <a
                        class="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        href="/admin/shift"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </a>
                      <button
                        type="submit"
                        class="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
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

export default EditOrganisasi;