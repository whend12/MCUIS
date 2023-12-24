import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Menu } from "@headlessui/react";
import axios from "axios";
import { Trash2, Pencil, Library } from "lucide-react";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const patientsPerPage = 5; // Number of patients to display per page

  useEffect(() => {
    getPatients();
  }, []);

  const openDetailsModal = (patient) => {
    setSelectedPatient(patient);
    setShowDetailsModal(true);
  };

  // const closeUpdateModal = () => {
  //   setShowUpdateModal(false);
  //   setUpdatePatientData({});
  // };

  // Inside the handleUpdate function:

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
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Calculate the index range for the current page
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedPatient(null);
  };
  // Handle page change
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
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
            {/* Adjusted text size */}
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
                <tbody className="text-sm divide-y divide-gray-100">
                  {currentPatients.map((patient, index) => (
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
                          {new Date(patient.createdAt).toLocaleString("en-ID", {
                            timeZone: "Asia/Jakarta",
                          })}
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
                        <button className="text-yellow-500 hover:underline">
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
                          <Menu.Items className="absolute right-0 z-10 w-32 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
                            {currentPatients.map((patient) => (
                              <Menu.Item key={patient.id}>
                                {({ active }) => (
                                  <Link
                                    to={`/dashboard/form-mcu/${patient.id}`}
                                  >
                                    <button
                                      className={`${
                                        active ? "bg-gray-100" : ""
                                      } flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
                                    >
                                      Fill Form MCU for {patient.name}
                                    </button>
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
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
              className="flex flex-row items-center justify-between my-4"
            >
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
                    <p>Name: {selectedPatient.name}</p>
                    <p>Age: {selectedPatient.age}</p>
                    <p>Phone Number: {selectedPatient.phone}</p>
                    <p>Gender: {selectedPatient.gender}</p>
                    <p>
                      Birthdate:{" "}
                      {
                        selectedPatient.birthdate
                          .toLocaleString("en-ID", {
                            timeZone: "Asia/Jakarta",
                          })
                          .split("T")[0]
                      }
                    </p>

                    <p>Address: {selectedPatient.address}</p>
                    <p>Blood Type: {selectedPatient.bloodtype}</p>
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
