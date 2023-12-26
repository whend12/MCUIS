import PatientLab from "../Models/PatientLabModel.js";

export const CreatePatientLab = async (req, res) => {
  try {
    const patientLab = await PatientLab.create(req.body);
    res.json(patientLab);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const CreatePatientLabById = async (req, res) => {
  try {
    const { id } = req.params;
    const patientLab = await PatientLab.create({
      ...req.body,
      PatientId: id,
    });
    res.json(patientLab);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const GetAllPatientLab = async (req, res) => {
  try {
    const patientLab = await PatientLab.findAll();
    res.json(patientLab);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const GetPatientLabById = async (req, res) => {
  try {
    const patientLab = await PatientLab.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(patientLab);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const UpdatePatientLab = async (req, res) => {
  try {
    await PatientLab.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "PatientLab Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const DeletePatientLab = async (req, res) => {
  try {
    await PatientLab.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "PatientLab Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
