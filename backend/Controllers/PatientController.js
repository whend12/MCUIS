import Patient from "../Models/PatientModel.js";

//Create and Save a new Patient for reqistration

export const CreatePatient = async (req, res) => {
  const { name, age, gender, phone, address, birthdate, bloodtype } = req.body;
  const missingFields = [];

  if (!name) {
    missingFields.push("name");
  }
  if (!age) {
    missingFields.push("age");
  }
  if (!gender) {
    missingFields.push("gender");
  }
  if (!phone) {
    missingFields.push("phone");
  }
  if (!address) {
    missingFields.push("address");
  }
  if (!birthdate) {
    missingFields.push("birthdate");
  }
  if (!bloodtype) {
    missingFields.push("bloodtype");
  }

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ message: "Fields are required.", missingFields });
  }

  try {
    const newPatient = await Patient.create(req.body);
    res.status(201).json({
      message: "Patient Created",
      patient: newPatient,
    });
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Retrieve all Patients from the database.

export const GetAllPatient = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Find a single Patient with an id

export const GetPatientById = async (req, res) => {
  try {
    const patient = await Patient.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(patient[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Update a Patient by the id in the request

export const UpdatePatient = async (req, res) => {
  try {
    await Patient.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Patient Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Delete a Patient with the specified id in the request

export const DeletePatient = async (req, res) => {
  try {
    await Patient.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Patient Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//get patient by name

export const GetPatientByName = async (req, res) => {
  try {
    const patient = await Patient.findAll({
      where: {
        name: req.params.name,
      },
    });
    res.json(patient[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//GET PATIENT BY createdAt

export const GetPatientByDate = async (req, res) => {
  try {
    const patient = await Patient.findAll({
      where: {
        createdAt: req.params.createdAt,
      },
    });
    res.json(patient[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
