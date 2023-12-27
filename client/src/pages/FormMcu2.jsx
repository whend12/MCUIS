import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const PatientPhysiqueFormtwo = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    head: "",
    neck: "",
    eyes: "",
    chest: "",
    nose: "",
    abdomen: "",
    extremities: "",
    skin: "",
    lymph_nodes: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let method,
        successMessage,
        url = `http://localhost:5000/api/v1/patient-physique-two/${id}`;

      if (isEdit) {
        method = "put";
        successMessage = "updated successfully";
      } else {
        method = "post";
        successMessage = "submiteed successfully";
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
          head: "",
          neck: "",
          eyes: "",
          chest: "",
          nose: "",
          abdomen: "",
          extremities: "",
          skin: "",
          lymph_nodes: "",
        });

        Swal.fire({
          title: "Success!",
          text: `Patient physique two form ${successMessage}!`,
          icon: "success",
          confirmButtonText: "Ok",
          timer: 1500,
        });

        setTimeout(() => {
          Navigate(`/dashboard/form-lab/${id}`);
        }, 1500);
      } else {
        console.error("Failed to submit data.");
      }
    } catch (error) {
      console.error("Error submitting data: ", error);
    }
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/patient-physique-two/${id}`
        );

        if (response.ok) {
          const patientData = await response.json();

          setFormData({
            head: patientData.head,
            neck: patientData.neck,
            eyes: patientData.eyes,
            chest: patientData.chest,
            nose: patientData.nose,
            abdomen: patientData.abdomen,
            extremities: patientData.extremities,
            skin: patientData.skin,
            lymph_nodes: patientData.lymph_nodes,
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
        <div className="md:col-span-1 border-2 rounded-md p-4">
          {/* Radio Buttons */}
          {[
            "head",
            "neck",
            "eyes",
            "chest",
            "nose",
            "abdomen",
            "extremities",
            "skin",
            "lymph_nodes",
          ].map((area, index) => (
            <div className="max-w-xs pb-5" key={index}>
              <label htmlFor={area} className="block mb-1 capitalize">
                {area}:
              </label>
              <input
                type="radio"
                id={`${area}Normal`}
                name={area}
                value="Normal"
                checked={formData[area] === "Normal"}
                onChange={handleChange}
              />
              <label htmlFor={`${area}Normal`} className="mr-2">
                Normal
              </label>
              <input
                type="radio"
                id={`${area}Abnormal`}
                name={area}
                value="Abnormal"
                checked={formData[area] === "Abnormal"}
                onChange={handleChange}
              />
              <label htmlFor={`${area}Abnormal`} className="mr-2">
                Abnormal
              </label>
            </div>
          ))}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600 transition-all"
          >
            {isEdit ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientPhysiqueFormtwo;
