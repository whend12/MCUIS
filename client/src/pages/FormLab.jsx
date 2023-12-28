import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

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

const PatientLab = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    hemoglobin: "",
    hematocrit: "",
    leukocyte: "",
    trombocyte: "",
    erythrocyte: "",
    mcv: "",
    mch: "",
    mchc: "",
    basofil: "",
    eosinofil: "",
    neutrofil: "",
    limfosit: "",
    monosit: "",
    led: "",
    urinecolor: "",
    urineph: "",
    urineprotein: "",
    nitrit: "",
    leukocyteUrine: "",
    bloodurine: "",
    glucoseUrine: "",
    eritrositUrine: "",
    eritrositSedimen: "",
    leukositSedimen: "",
    crystalUrine: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };

    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let method,
        successMessage,
        url = `http://localhost:5000/api/v1/form-lab/${id}`;

      if (isEdit) {
        method = "PUT";
        successMessage = "updated successfully";
      } else {
        method = "POST";
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

        setFormData({
          hemoglobin: "",
          hematocrit: "",
          leukocyte: "",
          trombocyte: "",
          erythrocyte: "",
          mcv: "",
          mch: "",
          mchc: "",
          basofil: "",
          eosinofil: "",
          neutrofil: "",
          limfosit: "",
          monosit: "",
          led: "",
          urinecolor: "",
          urineph: "",
          urineprotein: "",
          nitrit: "",
          leukocyteUrine: "",
          bloodurine: "",
          glucoseUrine: "",
          eritrositUrine: "",
          eritrositSedimen: "",
          leukositSedimen: "",
          crystalUrine: "",
        });

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Patient lab form ${successMessage}!`,
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
            `http://localhost:5000/api/v1/form-lab/${id}`
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

            setFormData({
              hemoglobin: "",
              hematocrit: "",
              leukocyte: "",
              trombocyte: "",
              erythrocyte: "",
              mcv: "",
              mch: "",
              mchc: "",
              basofil: "",
              eosinofil: "",
              neutrofil: "",
              limfosit: "",
              monosit: "",
              led: "",
              urinecolor: "",
              urineph: "",
              urineprotein: "",
              nitrit: "",
              leukocyteUrine: "",
              bloodurine: "",
              glucoseUrine: "",
              eritrositUrine: "",
              eritrositSedimen: "",
              leukositSedimen: "",
              crystalUrine: "",
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
          `http://localhost:5000/api/v1/form-lab/${id}`
        );

        if (response.ok) {
          const patientData = await response.json();

          setFormData({
            hemoglobin: patientData.hemoglobin,
            hematocrit: patientData.hematocrit,
            leukocyte: patientData.leukocyte,
            trombocyte: patientData.trombocyte,
            erythrocyte: patientData.erythrocyte,
            mcv: patientData.mcv,
            mch: patientData.mch,
            mchc: patientData.mchc,
            basofil: patientData.basofil,
            eosinofil: patientData.eosinofil,
            neutrofil: patientData.neutrofil,
            limfosit: patientData.limfosit,
            monosit: patientData.monosit,
            led: patientData.led,
            urinecolor: patientData.urinecolor,
            urineph: patientData.urineph,
            urineprotein: patientData.urineprotein,
            nitrit: patientData.nitrit,
            leukocyteUrine: patientData.leukocyteUrine,
            bloodurine: patientData.bloodurine,
            glucoseUrine: patientData.glucoseUrine,
            eritrositUrine: patientData.eritrositUrine,
            eritrositSedimen: patientData.eritrositSedimen,
            leukositSedimen: patientData.leukositSedimen,
            crystalUrine: patientData.crystalUrine,
          });

          setIsEdit(true);
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, [id]);

  return (
    <div className="w-full mx-auto p-6 rounded-md bg-white shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Patient Lab</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-1 border-2 rounded-md p-4">
            <div className="max-w-xs">
              <label htmlFor="hemoglobin" className="block mb-1">
                Hemoglobin (g/dL):
              </label>
              <InputField
                id="hemoglobin"
                name="hemoglobin"
                value={formData.hemoglobin}
                placeholder="12.8"
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="hematocrit" className="block mb-1">
                Hematocrit:
              </label>
              <InputField
                id="hematocrit"
                name="hematocrit"
                value={formData.hematocrit}
                placeholder="0.4" // 40%
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="leukocyte" className="block mb-1">
                Leukocyte (x10^3/µL):
              </label>
              <InputField
                id="leukocyte"
                name="leukocyte"
                placeholder="8.5"
                value={formData.leukocyte}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="trombocyte" className="block mb-1">
                Trombocyte (x10^3/µL):
              </label>
              <InputField
                id="trombocyte"
                name="trombocyte"
                placeholder="200"
                value={formData.trombocyte}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="erythrocyte" className="block mb-1">
                Erythrocyte (x10^6/µL):
              </label>
              <InputField
                id="erythrocyte"
                name="erythrocyte"
                placeholder="4.2"
                value={formData.erythrocyte}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="mcv" className="block mb-1">
                MCV (fL):
              </label>
              <InputField
                id="mcv"
                name="mcv"
                placeholder="80"
                value={formData.mcv}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="mch" className="block mb-1">
                MCH (pg):
              </label>
              <InputField
                id="mch"
                name="mch"
                placeholder="28"
                value={formData.mch}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="mchc" className="block mb-1">
                MCHC (g/dL):
              </label>
              <InputField
                id="mchc"
                name="mchc"
                placeholder="32"
                value={formData.mchc}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="md:col-span-1 border-2 rounded-md p-4">
            <div className="max-w-xs">
              <label htmlFor="basofil" className="block mb-1">
                Basofil:
              </label>
              <InputField
                id="basofil"
                name="basofil"
                placeholder="0.5"
                value={formData.basofil}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="eosinofil" className="block mb-1">
                Eosinofil:
              </label>
              <InputField
                id="eosinofil"
                name="eosinofil"
                placeholder="0.03"
                value={formData.eosinofil}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="neutrofil" className="block mb-1">
                Neutrofil:
              </label>
              <InputField
                id="neutrofil"
                name="neutrofil"
                placeholder="0.5"
                value={formData.neutrofil}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="limfosit" className="block mb-1">
                Limfosit:
              </label>
              <InputField
                id="limfosit"
                name="limfosit"
                placeholder="0.4"
                value={formData.limfosit}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="monosit" className="block mb-1">
                Monosit:
              </label>
              <InputField
                id="monosit"
                name="monosit"
                placeholder="0.17"
                value={formData.monosit}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="led" className="block mb-1">
                LED (mm/jam):
              </label>
              <InputField
                id="led"
                name="led"
                placeholder="8"
                value={formData.led}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="md:col-span-1 border-2 rounded-md p-4">
            <div className="max-w-xs">
              <label htmlFor="urinecolor" className="block mb-1">
                Urine Color:
              </label>
              <InputField
                id="urinecolor"
                name="urinecolor"
                placeholder="Yellow"
                value={formData.urinecolor}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs pb-5">
              <label htmlFor="urineph" className="block mb-1">
                Urine pH:
              </label>
              <InputField
                id="urineph"
                name="urineph"
                placeholder="6.5"
                value={formData.urineph}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="urineprotein" className="block mb-1">
                Urine Protein:
              </label>
              <InputField
                id="urineprotein"
                name="urineprotein"
                placeholder="Positive"
                value={formData.urineprotein}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="nitrit" className="block mb-1">
                Nitrit:
              </label>
              <InputField
                id="nitrit"
                name="nitrit"
                placeholder="Negative"
                value={formData.nitrit}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="leukocyteUrine" className="block mb-1">
                Leukocyte Urine (hpf):
              </label>
              <InputField
                id="leukocyteUrine"
                name="leukocyteUrine"
                placeholder="15"
                value={formData.leukocyteUrine}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="bloodurine" className="block mb-1">
                Blood Urine:
              </label>
              <InputField
                id="bloodurine"
                name="bloodurine"
                placeholder="Negative"
                value={formData.bloodurine}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="glucoseUrine" className="block mb-1">
                Glucose Urine (hpf):
              </label>
              <InputField
                id="glucoseUrine"
                name="glucoseUrine"
                placeholder="2"
                value={formData.glucoseUrine}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="eritrositUrine" className="block mb-1">
                Erythrocyte Urine (hpf):
              </label>
              <InputField
                id="eritrositUrine"
                name="eritrositUrine"
                placeholder="3-5"
                value={formData.eritrositUrine}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-xs">
              <label htmlFor="eritrositSedimen" className="block mb-1">
                Erythrocyte Sedimen (hpf):
              </label>
              <InputField
                id="eritrositSedimen"
                name="eritrositSedimen"
                placeholder="0-1"
                value={formData.eritrositSedimen}
                onChange={handleChange}
              />
            </div>{" "}
            <div className="max-w-xs">
              <label htmlFor="leukositSedimen" className="block mb-1">
                Leukocyte Sedimen (hpf):
              </label>
              <InputField
                id="leukositSedimen"
                name="leukositSedimen"
                placeholder="2-4"
                value={formData.leukositSedimen}
                onChange={handleChange}
              />
            </div>{" "}
            <div className="max-w-xs">
              <label htmlFor="crystalUrine" className="block mb-1">
                Crystal Urine:
              </label>
              <InputField
                id="crystalUrine"
                name="crystalUrine"
                placeholder="Negative"
                value={formData.crystalUrine}
                onChange={handleChange}
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
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PatientLab;
