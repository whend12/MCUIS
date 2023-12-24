import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) navigate("/");
    }
  };

  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use(
    async (config) => {
      const currrentTime = new Date();
      if (expire * 1000 < currrentTime.getTime()) {
        const response = await axios.get("http://localhost:5000/api/v1/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:5000/api/v1/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
    } catch (error) {
      navigate("/"); // Redirect to login on error
    }
  };
  return (
    <div className="container w-full mt-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 m-3">
        <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-red-500 rounded-lg shadow divide-y divide-gray-300 ">
          <div className="p-6 ">
            <h2 className="text-lg font-semibold text-gray-700 capitalize">
              Total Patient
            </h2>
            <p className="mt-2 text-2xl font-bold text-gray-700">SOON</p>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-purple-300 rounded-lg shadow divide-y divide-gray-300">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-700 capitalize">
              Total Queue Today
            </h2>
            <p className="mt-1 text-2xl font-bold text-gray-700">SOON</p>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-indigo-200 rounded-lg shadow divide-y divide-gray-300">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-700 capitalize">
              Total MCU Today
            </h2>
            <p className="mt-1 text-2xl font-bold text-gray-700">SOON</p>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-green-200 rounded-lg shadow divide-y divide-gray-300">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-700 capitalize">
              Total Report
            </h2>
            <p className="mt-1 text-2xl font-bold text-gray-700">SOON</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
