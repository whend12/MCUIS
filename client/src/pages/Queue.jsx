import React, { useState, useEffect } from "react";
import axios from "axios";

const Queue = () => {
  const [queue, setQueue] = useState(0);
  const [getQueue, setGetQueue] = useState(null);
  const [queueNow, setQueueNow] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQueueNow((queueNow) => queueNow + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGetQueue = async (e) => {
    e.preventDefault();

    try {
      // Ambil nomor antrian dari admin
      const response = await axios.get(
        "http://localhost:5000/api/v1/get-current-number/"
      );
      setQueue(response.data.number_queue);

      await takeQueueNumber();
    } catch (error) {
      console.log(error);
    }
  };

  const takeQueueNumber = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/patient-take-number/" //API UNTUK PATIENT GET
      );
      setGetQueue(response.data.number_queue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4">
          Selamat Datang di Antrian Online Medical Check Up
        </h1>
        <h2 className="text-xl mb-4">Nomor Antrian Sekarang Adalah: {queue}</h2>
        <h1 className="text-4xl font-bold mb-6">
          Tekan Tombol Untuk Ambil Nomor Antrian
        </h1>
        <div className="mb-6" onClick={handleGetQueue}>
          <a
            href="#_"
            className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50"
          >
            <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
            </span>
            <span className="relative">Klik Disini</span>
          </a>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">
            Nomor Antrian Anda: {getQueue ? getQueue : "Belum ada antrian"}
          </h2>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-yellow-500">
            Jangan lupa Screenshot untuk ditunjukan ke kasir
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Queue;
