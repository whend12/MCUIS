import PatientPhysique from "../Models//PatientPhysiqueModel.js";

export const createPatientPhysique = async (req, res) => {
  try {
    const { id } = req.params;
    const newPhysique = await PatientPhysique.create({
      ...req.body,
      PatientId: id,
    });

    res.status(201).json({
      message: "PatientPhysique created successfully",
      newPhysique,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPatientPhysiqueById = async (req, res) => {
  try {
    const { id } = req.params;
    const patientPhysique = new PatientPhysique.findOne({
      where: {
        PatientId: id,
      },
    });

    if (!patientPhysique) {
      return res.status(404).json({ message: "PatientPhysique not found" });
    }

    res.json(patientPhysique);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPatientPhysique = async (req, res) => {
  try {
    const patientPhysique = await PatientPhysique.findAll();
    res.json(patientPhysique);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePatientPhysique = async (req, res) => {
  try {
    const { id } = req.params;
    const patientPhysique = await PatientPhysique.findByPk(id);

    if (!patientPhysique) {
      return res.status(404).json({ message: "PatientPhysique not found" });
    }

    await patientPhysique.update(req.body);

    res.json({ message: "PatientPhysique updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePatientPhysique = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPhysique = await PatientPhysique.destroy({
      where: {
        id,
      },
    });

    if (!deletedPhysique) {
      return res.status(404).json({ message: "PatientPhysique not found" });
    }

    res.json({ message: "PatientPhysique deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
