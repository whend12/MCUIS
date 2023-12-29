import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Stack from "@mui/material/Stack";

import { Menu } from "@headlessui/react";
import axios from "axios";
import { Trash2, Pencil, Library, Search } from "lucide-react";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPatientData, setEditPatientData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [patientsPerPage, setPatientsPerPage] = useState(5);
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/patient"
        );
        setPatients(response.data);
        setFilteredPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  const openDetailsModal = (patient) => {
    setSelectedPatient(patient);
    setShowDetailsModal(true);
  };

  const handleRowsPerPage = (event) => {
    const rowsPerPage = parseInt(event.target.value, 10);
    setPatientsPerPage(rowsPerPage);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/patient/${id}`);
      getPatients();
    } catch (error) {
      console.log(error);
    }
  };

  const getPatients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/patient");
      setPatients(response.data);
      setFilteredPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleSearch = () => {
    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredPatients(patients);
  };
  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedPatient(null);
  };
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const openEditModal = (patient) => {
    setEditPatientData(patient);
    setShowEditModal(true);
  };

  const editPatient = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/patient/${editPatientData.id}`,
        editPatientData
      );
      console.log("Updated patient:", response.data);
      setShowEditModal(false);
      getPatients();
    } catch (error) {
      console.error("Error editing patient:", error);
    }
  };

  return (
    <section className="antialiased bg-gray-100 text-gray-600 min-h-screen w-full px-0">
      <div className="flex flex-col justify-center h-full p-5">
        <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 text-xl">Patient</h2>
            <p className="text-gray-400 text-xs pt-0.5">
              List of patients registered
            </p>
            <div className="mb-3 flex justify-end">
              <input
                type="text"
                placeholder="Search by Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded-md p-2 mr-2 outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-blue-600"
              >
                <Search />
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Reset
              </button>
            </div>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">No</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Gender</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Age</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Register</div>
                    </th>
                    <th className="p-3 whitespace-nowrap">
                      <div className="font-semibold text-center">Action</div>
                    </th>
                  </tr>
                </thead>
                {showEditModal && (
                  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                    <div className="modal-container bg-white w-96 rounded shadow-lg z-50 overflow-y-auto p-6">
                      <h2 className="text-2xl font-bold mb-4">Edit Patient</h2>
                      <div className="mb-3">
                        Name
                        <input
                          type="text"
                          placeholder="Name"
                          className="border rounded-md p-2 mb-2 w-full"
                          value={editPatientData.name || ""}
                          onChange={(e) =>
                            setEditPatientData({
                              ...editPatientData,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="mb-3">
                        Age
                        <input
                          type="text"
                          placeholder="Age"
                          className="border rounded-md p-2 mb-2 w-full"
                          value={editPatientData.age || ""}
                          onChange={(e) =>
                            setEditPatientData({
                              ...editPatientData,
                              age: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        Phone Number
                        <input
                          type="text"
                          placeholder="08 ..."
                          className="border rounded-md p-2 mb-2 w-full"
                          value={editPatientData.phone || ""}
                          onChange={(e) =>
                            setEditPatientData({
                              ...editPatientData,
                              phone: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        Gender
                        <input
                          type="text"
                          placeholder="Gender"
                          className="border rounded-md p-2 mb-2 w-full"
                          value={editPatientData.gender || ""}
                          onChange={(e) =>
                            setEditPatientData({
                              ...editPatientData,
                              gender: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        Birthdate
                        <DatePicker
                          selected={new Date(editPatientData.birthdate)}
                          dateFormat="MM/dd/yyyy"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholderText="MM/DD/YYYY"
                          showYearDropdown
                          scrollableYearDropdown
                          showMonthDropdown
                          scrollableMonthYearDropdown
                          onChange={(date) =>
                            setEditPatientData({
                              ...editPatientData,
                              birthdate: date,
                            })
                          }
                        />
                      </div>

                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        onClick={editPatient}
                      >
                        Save
                      </button>
                      <button
                        className="ml-2 text-gray-600 hover:underline"
                        onClick={() => setShowEditModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                <tbody className="text-sm divide-y divide-gray-100">
                  {filteredPatients
                    .slice(
                      (currentPage - 1) * patientsPerPage,
                      currentPage * patientsPerPage
                    )
                    .map((patient, index) => (
                      <tr key={index}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="font-medium text-gray-800">
                              {patient.id}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="font-medium text-gray-800">
                              {patient.name}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{patient.gender}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium text-green-500">
                            {patient.age}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-center">
                            {new Date(patient.createdAt).toLocaleString(
                              "en-ID",
                              {
                                timeZone: "Asia/Jakarta",
                              }
                            )}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <button
                            onClick={() => openDetailsModal(patient)}
                            className="text-blue-500 hover:underline"
                          >
                            Details
                          </button>
                        </td>
                        <td className="p-2 whitespace-nowrap rounded-md border-inherit">
                          <button
                            onClick={() => openEditModal(patient)} // Memanggil fungsi openEditModal saat ikon diklik
                            className="text-yellow-500 hover:underline"
                          >
                            <Pencil />
                          </button>
                        </td>
                        <td className="p-2 whitespace-nowrap rounded-md border-inherit">
                          <button
                            onClick={() => handleDelete(patient.id)}
                            className="text-red-500 hover:underline"
                          >
                            <Trash2 />
                          </button>
                        </td>
                        <td className="p-2 whitespace-nowrap rounded-md border-inherit">
                          <Menu
                            as="div"
                            className="relative inline-block text-left"
                          >
                            <div>
                              <Menu.Button className="">
                                <Library />
                              </Menu.Button>
                            </div>
                            <Menu.Items className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
                              <Menu.Item>
                                <Link to={`/dashboard/form-mcu/${patient.id}`}>
                                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Fill Form MCU
                                  </button>
                                </Link>
                              </Menu.Item>
                              <Menu.Item>
                                <Link
                                  to={`/dashboard/hasil-analisis/${patient.id}`}
                                >
                                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Show Analysis Result
                                  </button>
                                </Link>
                              </Menu.Item>
                            </Menu.Items>
                          </Menu>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              className="flex flex-row items-center justify-between my-4"
            >
              <div className="flex items-center">
                <label htmlFor="rowsPerPage" className="mr-2">
                  Rows per page:
                </label>
                <select
                  id="rowsPerPage"
                  name="rowsPerPage"
                  onChange={handleRowsPerPage}
                  value={patientsPerPage}
                  className="border rounded-md p-2"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </div>

              <Pagination
                count={Math.ceil(patients.length / patientsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
              />
            </Stack>
            {showDetailsModal && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                  <div className="modal-content py-4 text-left px-6">
                    <div className="flex justify-between items-center pb-3">
                      <p className="text-2xl font-bold">Patient Details</p>
                      <div
                        onClick={closeDetailsModal}
                        className="modal-close cursor-pointer z-50"
                      >
                        <svg
                          className="fill-current text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                        >
                          <path
                            d="M1 1l16 16M17 1L1 17"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <table className="border-collapse border border-gray-300 w-full">
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-2">Name:</td>
                          <td className="border border-gray-300 p-2">
                            {selectedPatient.name}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2">Age:</td>
                          <td className="border border-gray-300 p-2">
                            {selectedPatient.age}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2">
                            Phone Number:
                          </td>
                          <td className="border border-gray-300 p-2">
                            {selectedPatient.phone}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2">
                            Gender:
                          </td>
                          <td className="border border-gray-300 p-2">
                            {selectedPatient.gender}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2">
                            Birthdate:
                          </td>
                          <td className="border border-gray-300 p-2">
                            {
                              selectedPatient.birthdate
                                .toLocaleString("en-ID", {
                                  timeZone: "Asia/Jakarta",
                                })
                                .split("T")[0]
                            }
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2">
                            Address:
                          </td>
                          <td className="border border-gray-300 p-2">
                            {selectedPatient.address}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2">
                            Blood Type:
                          </td>
                          <td className="border border-gray-300 p-2">
                            {selectedPatient.bloodtype}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientList;
