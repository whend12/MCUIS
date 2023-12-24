import PatientPhysique from "../Models/PatientPhysiqueModel.js";
import Patient from "../Models/PatientModel.js";

export const CreatePatientPhysique = async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari request

    // Cari data PatientPhysique berdasarkan ID
    const patientPhysique = await PatientPhysique.findByPk(id);

    if (!patientPhysique) {
      return res.status(404).json({ message: "PatientPhysique not found" });
    }

    // Lakukan update pada data yang diperlukan
    await patientPhysique.update(req.body);

    res.json({
      message: "PatientPhysique updated successfully",
      updatedPatientPhysique: patientPhysique,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const GetAllPatientPhysique = async (req, res) => {
  try {
    const patientPhysique = await PatientPhysique.findAll();
    res.json(patientPhysique);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const GetPatientPhysiqueById = async (req, res) => {
  try {
    const patientPhysique = await PatientPhysique.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(patientPhysique[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const UpdatePatientPhysique = async (req, res) => {
  try {
    await PatientPhysique.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "PatientPhysique Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const DeletePatientPhysique = async (req, res) => {
  try {
    await PatientPhysique.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "PatientPhysique Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
