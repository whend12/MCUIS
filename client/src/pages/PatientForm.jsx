import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PatienthtmlForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [bloodtype, setBloodtype] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({}); // Menambah state untuk menyimpan pesan kesalahan

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!name) {
      errors.name = "Name is required";
    }
    if (!age) {
      errors.age = "Age is required";
    }
    if (!gender) {
      errors.gender = "Gender is required";
    }
    if (!phone) {
      errors.phone = "Phone Number is required";
    }
    if (!address) {
      errors.address = "Address is required";
    }
    if (!birthdate) {
      errors.birthdate = "Birthdate is required";
    }
    if (!bloodtype) {
      errors.bloodtype = "Blood Type is required";
    }

    if (Object.keys(errors).length === 0) {
      // Tidak ada kesalahan, maka submit data
      try {
        await axios.post("http://localhost:5000/api/v1/patient", {
          name: name,
          age: parseInt(age),
          gender: gender,
          address: address,
          birthdate: birthdate,
          bloodtype: bloodtype,
          phone: phone,
        });

        navigate("/dashboard/lists");
        console.log("Form submitted");
      } catch (error) {
        console.log("Error submitting form:", error);
      }
    } else {
      // Ada kesalahan, atur pesan kesalahan ke state errors
      setErrors(errors);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items- w-full items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Patient Details</p>
                <p>Please fill out all the fields.</p>
              </div>
              {/* <form className=" "> */}
              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="full_name">Name</label>
                    <input
                      type="text"
                      name="full_name"
                      id="full_name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="age">Age</label>
                    <input
                      type="number"
                      name="age"
                      id="age"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-5">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="md:col-span-3">
                    {/* Create with Option Male and Female */}
                    <label htmlFor="gender">Gender</label>
                    <select
                      name="gender"
                      id="gender"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder=""
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="birthdate">Birthdate</label>
                    <DatePicker
                      name="birthdate"
                      selected={birthdate}
                      onChange={(date) => setBirthdate(date)}
                      showYearDropdown
                      showMonthDropdown
                      placeholderText="MM/DD/YYYY"
                      dateFormat="MM/dd/yyyy"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="bloodtype">Blood Type</label>
                    <input
                      type="text"
                      name="bloodtype"
                      id="bloodtype"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={bloodtype}
                      onChange={(e) => setBloodtype(e.target.value)}
                      placeholder=""
                    />
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end pb-10">
                      <button
                        className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <ul>
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PatienthtmlForm;
