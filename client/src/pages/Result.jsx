import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Printer } from "lucide-react";
import html2pdf from "html2pdf.js";

const Result = () => {
  const { id } = useParams();
  const [datas, setDatas] = useState([]);
  const [patientData, setPatientData] = useState({});

  const fetchPatientData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/patient/${id}`
      );
      setPatientData(response.data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/hasilanalisis/${id}`
      );
      setDatas(response.data);
    } catch (error) {
      console.error("Error fetching analysis data:", error);
    }
  };

  const formatBirthdate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    fetchPatientData();
    fetchData();
  }, [id]);

  const printToPdf = () => {
    const content = document.getElementById("print-content");
    const opt = {
      margin: [10, 10, 10, 30], // Atur margin: [atas, kanan, bawah, kiri]
      filename: "analysis_result.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    if (content) {
      html2pdf().from(content).set(opt).save();
    } else {
      console.error("No content found to print");
    }
  };

  return (
    <div className="w-full mx-auto p-6 rounded-md bg-white shadow-md uppercase">
      <button
        className="bg-blue-500 hover:bg-blue-200 text-white font-bold py-1 px-1 mt-2 rounded"
        onClick={printToPdf}
      >
        {<Printer />}
      </button>
      <div className="overflow-x-auto" id="print-content">
        <div className="mb-8 back">
          <h2 className="text-2xl font-semibold mb-2">Patient Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 mb-2">Name:</p>
              <p className="font-semibold">{patientData.name}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Gender:</p>
              <p className="font-semibold">{patientData.gender}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Age:</p>
              <p className="font-semibold">{patientData.age}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Birthdate:</p>
              <p className="font-semibold">
                {formatBirthdate(patientData.birthdate)}
              </p>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Analysis Results</h2>
        <table className="table text-base">
          <thead>
            <tr>
              <th>No</th>
              <th>Abnormal Name</th>
              <th>Suggestion</th>
              <th>Conclusion</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={data.id}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.saran}</td>
                <td>{data.keterangan ? data.keterangan : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Result;
