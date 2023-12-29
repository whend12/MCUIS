import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminQueue = () => {
  const [currentAdminQueue, setCurrentAdminQueue] = useState(0);
  const [currentPatientQueue, setCurrentPatientQueue] = useState(0);

  useEffect(() => {
    getCurrentAdminQueue();
    getCurrentPatientQueue();
  }, []);

  const getCurrentAdminQueue = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/get-current-number/"
      );
      setCurrentAdminQueue(response.data.number_queue);
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentPatientQueue = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/patient-get-current-number/"
      );
      setCurrentPatientQueue(response.data.number_queue);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdminResetQueue = async () => {
    try {
      await axios.delete("http://localhost:5000/api/v1/reset-queue/");
      await getCurrentAdminQueue(); // Ambil nomor antrian admin setelah mereset
    } catch (error) {
      console.error(error);
    }
  };

  const handlePatientResetQueue = async () => {
    try {
      await axios.delete("http://localhost:5000/api/v1/patient-reset-queue/");
      setCurrentPatientQueue(0); // Reset nomor antrian pasien ke 0 setelah mereset
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextQueue = async () => {
    try {
      await axios.get("http://localhost:5000/api/v1/take-number/");
      await getCurrentAdminQueue(); // Ambil nomor antrian admin setelah melanjutkan
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex mx-auto justify-center items-center h-screen">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4">
          Admin: Antrian Online Medical Check Up
        </h1>
        <h2 className="text-xl mb-4">
          Nomor Antrian Sekarang (Admin): {currentAdminQueue}
        </h2>
        <h2 className="text-xl mb-4">
          Nomor Antrian Sekarang (Pasien): {currentPatientQueue}
        </h2>
        <div className="mb-6">
          <button
            onClick={handleAdminResetQueue}
            className="px-8 py-3 bg-red-600 text-white rounded-md mr-4"
          >
            Reset Antrian Admin
          </button>
          <button
            onClick={handlePatientResetQueue}
            className="px-8 py-3 bg-red-600 text-white rounded-md mr-4"
          >
            Reset Antrian Pasien
          </button>
          <button
            onClick={handleNextQueue}
            className="px-8 py-3 bg-indigo-600 text-white rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminQueue;
