import React, { useState, useEffect } from "react";
import { Textarea } from "@material-tailwind/react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import * as Yup from "yup";

const InputField = ({ id, name, placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent border-b border-gray-400 py-2 px-3 focus:outline-none focus:border-blue-500"
    />
  );
};

const RadioButton = ({ id, name, value, checked, onChange, label }) => {
  return (
    <div className="flex mb-2">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      <label htmlFor={id} className="mr-4">
        {label}
      </label>
    </div>
  );
};

const PatientPhysiqueForm = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    bmi: "",
    weight: "",
    height: "",
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    respiration: "",
    complaint: "",
    distanceVisionExamination: "",
    distanceVisionExaminationWithGlasses: "",
    nearVisionExamination: "",
    visualFieldExamination: "",
    nightVisionExamination: "",
    colorVisionExamination: "",
    hearingExamination: "",
    bloodExamination: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };

    if (name === "weight" || name === "height") {
      const weight = parseFloat(newFormData.weight);
      const height = parseFloat(newFormData.height);

      if (!isNaN(weight) && !isNaN(height) && height !== 0) {
        const bmi = (weight / Math.pow(height / 100, 2)).toFixed(2); // Calculate BMI
        newFormData = { ...newFormData, bmi };
      }
    }

    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi data sebelum mengirim
    const validationSchema = Yup.object().shape({
      bmi: Yup.number().required("BMI is required"),
      weight: Yup.number().required("Weight is required"),
      height: Yup.number().required("Height is required"),
      bloodPressure: Yup.string().required("Blood Pressure is required"),
      heartRate: Yup.number().required("Heart Rate is required"),
      complaint: Yup.string().required("Complaint is required"),
      distanceVisionExamination: Yup.string().required(
        "Distance Vision Examination is required"
      ),
      distanceVisionExaminationWithGlasses: Yup.string().required(
        "Distance Vision Examination With Glasses is required"
      ),
      nearVisionExamination: Yup.string().required(
        "Near Vision Examination is required"
      ),
      bloodExamination: Yup.string().required("Blood Examination is required"),
      // Tambahkan validasi lain sesuai kebutuhan
    });

    const isValid = await validationSchema.isValid(formData);
    if (!isValid) {
      console.error("Please fill in all required fields.");
      return;
    }

    try {
      let method,
        successMessage,
        url = `http://localhost:5000/api/v1/patient-physique/${id}`; // Menggunakan nilai id dari useParams

      if (isEdit) {
        method = "put";
        successMessage = "updated successfully";
      } else {
        method = "post";
        successMessage = "submitted successfully";
      }
      const response = await axios({
        method,
        url,
        headers: {
          "Content-Type": "application/json",
        },
        data: formData,
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Data submitted successfully!");

        // Lakukan redirect atau tampilkan pesan sukses
        setFormData({
          bmi: "",
          weight: "",
          height: "",
          bloodPressure: "",
          heartRate: "",
          temperature: "",
          respiration: "",
          complaint: "",
          distanceVisionExamination: "",
          distanceVisionExaminationWithGlasses: "",
          nearVisionExamination: "",
          visualFieldExamination: "",
          nightVisionExamination: "",
          colorVisionExamination: "",
          hearingExamination: "",
          bloodExamination: "",
        });

        Swal.fire({
          icon: "success",
          title: `Patient physique form ${successMessage}!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Failed to submit data:", response.data);
        // Tampilkan pesan kesalahan yang diberikan oleh server (jika ada)
      }
    } catch (error) {
      if (error.response) {
        // Respons dari server, tetapi bukan status sukses
        console.error(
          "Failed to submit data:",
          error.response.status,
          error.response.data
        );
        // Tampilkan pesan kesalahan yang diberikan oleh server (jika ada)
      } else if (error.request) {
        // Permintaan terkirim tetapi tidak ada respons (misalnya, tidak ada koneksi internet)
        console.error("No response received:", error.request);
        // Tampilkan pesan kesalahan terkait dengan permintaan yang dikirim
      } else {
        // Kesalahan lain yang terjadi dalam proses pengiriman permintaan
        console.error("Error submitting data:", error.message);
        // Tampilkan pesan kesalahan umum yang terkait dengan pengiriman permintaan
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#d33",
      reverseButtons: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:5000/api/v1/patient-physique/${id}`
          );

          if (response.status === 200) {
            console.log("Data deleted successfully!");

            Swal.fire({
              title: "Success!",
              text: "Patient physique form deleted successfully!",
              icon: "success",
              confirmButtonText: "Ok",
              timer: 1500,
            });
          } else {
            console.error("Failed to delete data.");
          }
        } catch (error) {
          console.error("Error deleting data: ", error);
        }
      }
    });
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/patient-physique/${id}`
        );
        if (response.ok) {
          const patientData = await response.json();

          setFormData({
            bmi: patientData.bmi,
            weight: patientData.weight,
            height: patientData.height,
            bloodPressure: patientData.bloodPressure,
            heartRate: patientData.heartRate,
            temperature: patientData.temperature,
            respiration: patientData.respiration,
            complaint: patientData.complaint,
            distanceVisionExamination: patientData.distanceVisionExamination,
            distanceVisionExaminationWithGlasses:
              patientData.distanceVisionExaminationWithGlasses,
            nearVisionExamination: patientData.nearVisionExamination,
            visualFieldExamination: patientData.visualFieldExamination,
            nightVisionExamination: patientData.nightVisionExamination,
            colorVisionExamination: patientData.colorVisionExamination,
            hearingExamination: patientData.hearingExamination,
            bloodExamination: patientData.bloodExamination,
          });

          setIsEdit(true);
        }
      } catch (error) {
        console.error("Error fetching patient data: ", error);
      }
    };

    fetchPatientData();
  }, [id]);

  return (
    <div className="w-full mx-auto p-6 rounded-md bg-white shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Patient Physique Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-1 border-2 rounded-md p-4">
            <div className="max-w-xs">
              <label htmlFor="bmi" className="block mb-1">
                BMI:
              </label>
              <InputField
                id="bmi"
                name="bmi"
                value={formData.bmi}
                onChange={handleChange}
                disabled={formData.bmi !== ""}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="height" className="block mb-1">
                Height (cm):
              </label>
              <InputField
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="weight" className="block mb-1">
                Weight (kg):
              </label>
              <InputField
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="blood_pressure" className="block mb-1">
                Blood Pressure (mmHg):
              </label>
              <InputField
                id="blood_pressure"
                name="bloodPressure"
                placeholder="100/80"
                value={formData.bloodPressure}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="heartRate" className="block mb-1">
                Heart Rate (bpm):
              </label>
              <InputField
                id="heartRate"
                name="heartRate"
                placeholder="80"
                value={formData.heartRate}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="temperature" className="block mb-1">
                Temperature (Celcius):
              </label>
              <InputField
                id="temperature"
                name="temperature"
                placeholder="36.5"
                value={formData.temperature}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="respiration" className="block mb-1">
                Respiration:
              </label>
              <InputField
                id="respiration"
                name="respiration"
                placeholder="20"
                value={formData.respiration}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="md:col-span-1 border-2 rounded-md p-4">
            <div className="max-w-md mb-6">
              <label
                htmlFor="complaint"
                className="block mb-1 font-bold text-xl placeholder-gray-400"
              >
                Complaint:
              </label>
              <Textarea
                id="complaint"
                name="complaint"
                placeholder="Isi keluhan pasien disini/ Write patient's complaint here"
                value={formData.complaint}
                onChange={handleChange}
                rows={8} // Atur jumlah baris yang diinginkan di sini
                style={{ width: "100%", minHeight: "200px" }} // Atur lebar dan tinggi minimum di sini
                className="w-full border-gray-400 focus:border-blue-500 focus:ring-blue-500 rounded-md p-2"
              />
            </div>
          </div>

          <div className="md:col-span-1 border-2 rounded-md p-4">
            <div className="max-w-xs">
              <label htmlFor="distanceVisionExamination" className="block mb-1">
                Distance Vision Examination:
              </label>
              <InputField
                id="distanceVisionExamination"
                name="distanceVisionExamination"
                placeholder="20/20"
                value={formData.distanceVisionExamination}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs pb-5">
              <label
                htmlFor="distanceVisionExaminationWithGlasses"
                className="block mb-1"
              >
                Vision Examination With Glasses:
              </label>
              <InputField
                id="distanceVisionExaminationWithGlasses"
                name="distanceVisionExaminationWithGlasses"
                placeholder="20/20"
                value={formData.distanceVisionExaminationWithGlasses}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="nearVisionExamination" className="block mb-1">
                Near Vision Examination:
              </label>
              <InputField
                id="nearVisionExamination"
                name="nearVisionExamination"
                placeholder="J1"
                value={formData.nearVisionExamination}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="visualFieldExamination" className="block mb-1">
                Visual Field Examination:
              </label>
              <InputField
                id="visualFieldExamination"
                name="visualFieldExamination"
                placeholder="85"
                value={formData.visualFieldExamination}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="nightVisionExamination" className="block mb-1">
                Night Vision Examination:
              </label>
              <RadioButton
                id="nightVisionNormal"
                name="nightVisionExamination"
                value="Normal"
                checked={formData.nightVisionExamination === "Normal"}
                onChange={handleChange}
                label="Normal"
              />
              <RadioButton
                id="nightVisionAbnormal"
                name="nightVisionExamination"
                value="Abnormal"
                checked={formData.nightVisionExamination === "Abnormal"}
                onChange={handleChange}
                label="Abnormal"
              />
            </div>
          </div>

          <div className="md:col-span-1 border-2 rounded-md p-4">
            <div className="max-w-xs pb-5">
              <label htmlFor="colorVisionExamination" className="block mb-1">
                Color Vision Examination:
              </label>
              <RadioButton
                id="colorVisionNormal"
                name="colorVisionExamination"
                value="Normal"
                checked={formData.colorVisionExamination === "Normal"}
                onChange={handleChange}
                label="Normal"
              />
              <RadioButton
                id="colorVisionAbnormal"
                name="colorVisionExamination"
                value="Abnormal"
                checked={formData.colorVisionExamination === "Abnormal"}
                onChange={handleChange}
                label="Abnormal"
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="hearingExamination" className="block mb-1">
                Hearing Examination:
              </label>
              <RadioButton
                id="hearingNormal"
                name="hearingExamination"
                value="Normal"
                checked={formData.hearingExamination === "Normal"}
                onChange={handleChange}
                label="Normal"
              />
              <RadioButton
                id="hearingAbnormal"
                name="hearingExamination"
                value="Abnormal"
                checked={formData.hearingExamination === "Abnormal"}
                onChange={handleChange}
                label="Abnormal"
              />
              <InputField
                id="hearingExaminationInput"
                name="hearingExamination"
                placeholder="Keterangan/ Description"
                value={formData.hearingExamination}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs pb-5">
              <label htmlFor="bloodExamination" className="block mb-1">
                Blood Examination:
              </label>
              <RadioButton
                id="bloodExaminationNormal"
                name="bloodExamination"
                value="Normal"
                checked={formData.bloodExamination === "Normal"}
                onChange={handleChange}
                label="Normal"
              />
              <RadioButton
                id="bloodExaminationAbnormal"
                name="bloodExamination"
                value="Abnormal"
                checked={formData.bloodExamination === "Abnormal"}
                onChange={handleChange}
                label="Abnormal"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div>
            <button
              type="submit"
              className={
                isEdit
                  ? "bg-amber-500 text-white py-2 px-4 mt-4 mx-1 rounded-md hover:bg-amber-600 transition-all"
                  : "bg-blue-500 text-white py-2 px-4 mt-4 mx-1 rounded-md hover:bg-blue-600 transition-all"
              }
            >
              {isEdit ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 mt-4 mx-1 rounded-md hover:bg-red-600 transition-all "
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
          <Link
            to={`/dashboard/form-mcu2/${id}`}
            className="bg-indigo-600 text-white py-2 px-4 mt-4 mx-1 rounded-md hover:bg-indigo-700 transition-all "
          >
            Next
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PatientPhysiqueForm;
