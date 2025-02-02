import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import SidebarNavbar from "../../../components/SidebarNavbar";

function EditKaryawan() {
  const [username, setUsername] = useState("");
  const [idJabatan, setIdJabatan] = useState("");
  const [idShift, setIdShift] = useState("");
  const [jabatanOptions, setJabatanOptions] = useState([]);
  const [shiftOptions, setShiftOptions] = useState([]);
  const { id } = useParams();
  const adminId = localStorage.getItem("adminId");
  const history = useHistory();

  const getUser = useCallback(async () => {
    try {
      const res = await axios.get(`${API_DUMMY}/api/user/getUserBy/${id}`);
      setUsername(res.data.username);
      setIdJabatan(res.data.jabatan ? res.data.jabatan.idJabatan : "");
      setIdShift(res.data.shift ? res.data.shift.id : "");
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const getJabatanOptions = useCallback(async () => {
    try {
      const res = await axios.get(
        `${API_DUMMY}/api/jabatan/getByAdmin/${adminId}`
      );
      setJabatanOptions(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [adminId]);

  const getShiftOptions = useCallback(async () => {
    try {
      const res = await axios.get(
        `${API_DUMMY}/api/shift/getall-byadmin/${adminId}`
      );
      setShiftOptions(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [adminId]);

  useEffect(() => {
    getUser();
    getJabatanOptions();
    getShiftOptions();
  }, [getUser, getJabatanOptions, getShiftOptions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_DUMMY}/api/user/edit-kar/${id}?idJabatan=${idJabatan}&idShift=${idShift}`,
        {
          username: username,
        }
      );
      Swal.fire({
        title: "Berhasil",
        text: "Berhasil mengubah data karyawan",
        icon: "success",
        showConfirmButton: false,
      });

      setTimeout(() => {
        history.push("/admin/karyawan");
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <SidebarNavbar />
      </div>
      <div className="flex h-full">
        <div className="sticky top-16 z-40">
          <Navbar />
        </div>
        <div className="flex-grow container p-4 sm:ml-64 ml-4 md:ml-64 mt-10">
          <div className="p-4">
            <div className="p-5">
              <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between">
                  <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Edit Karyawan
                  </h6>
                </div>
                <hr />
                <div className="mt-5 text-left">
                  <form onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer capitalize"
                        placeholder=" "
                        autoComplete="off"
                        required
                      />
                      <label
                        htmlFor="username"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Username
                      </label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6 mb-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <label
                          htmlFor="id_jabatan"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Jabatan
                        </label>
                        <select
                          name="idJabatan"
                          value={idJabatan}
                          onChange={(e) => setIdJabatan(e.target.value)}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        >
                          <option value="">Belum memiliki</option>
                          {jabatanOptions.map((option) => (
                            <option
                              key={option.idJabatan}
                              value={option.idJabatan}
                            >
                              {option.namaJabatan}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <label
                          htmlFor="id_shift"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Shift
                        </label>
                        <select
                          name="idShift"
                          value={idShift}
                          onChange={(e) => setIdShift(e.target.value)}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        >
                          <option value="">Belum memiliki</option>
                          {shiftOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.namaShift}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <a
                        className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        href="/admin/karyawan"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </a>
                      <button
                        type="submit"
                        className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
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

export default EditKaryawan;
