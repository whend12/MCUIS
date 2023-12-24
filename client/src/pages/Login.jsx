import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/v1/login", {
        email: email,
        password: password,
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <section className="min-h-screen pr-3 bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 font-poppins sm:max-w-xl sm:mx-auto text-center">
        <span className="text-2xl font-light">Login Admin</span>
        <div className="mt-4 bg-white shadow-md sm:rounded-lg ">
          <div className="h-2 bg-indigo-400 rounded-t-md"></div>
          <form onSubmit={Auth} className="">
            {msg && (
              <p className="text-red-500 font-semibold text-center">{msg}</p>
            )}
            <div className="px-8 py-2">
              <label className="block font-semibold text-left "> Email </label>
              <input
                type="email"
                className="border w-full h-5 px-3 py-5 mt-2 rounded-lg hover:outline-none focus:outline-none focus:ring-1 focus:ring-border-indigo-600"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="px-8 py-2">
              <label className="block font-semibold text-left ">
                {" "}
                Password{" "}
              </label>
              <input
                type="password"
                className="border w-full h-5 px-3 py-5 mt-2 rounded-lg hover:outline-none focus:outline-none focus:ring-1 focus:ring-border-indigo-600"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div
              className="px-8 py-5 flex justify-center
               items-baseline"
            >
              <button
                type="submit"
                className="mr-1 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
