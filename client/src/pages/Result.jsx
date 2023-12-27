import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Result = () => {
  const { id } = useParams();
  const [datas, setDatas] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/hasilanalisis/${id}`
    );
    setDatas(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full mx-auto p-6 rounded-md bg-white shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Analysis Results</h2>
      <div className="overflow-x-auto">
        <table className="table text-base">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Saran</th>
              <th>Kesimpulan</th>
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
