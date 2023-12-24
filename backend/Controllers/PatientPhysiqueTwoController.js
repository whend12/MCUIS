import PatientPhysiqueTwo from "../Models/PatientPhysiqueTwoModel";

export const CreatePatientPhysiqueTwo = async (req, res) => {
  try {
    const patientPhysiqueTwo = await PatientPhysiqueTwo.create(req.body);
    res.json(patientPhysiqueTwo);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const GetAllPatientPhysiqueTwo = async (req, res) => {
  try {
    const patientPhysiqueTwo = await PatientPhysiqueTwo.findAll();
    res.json(patientPhysiqueTwo);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const GetPatientPhysiqueTwoById = async (req, res) => {
  try {
    const patientPhysiqueTwo = await PatientPhysiqueTwo.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(patientPhysiqueTwo[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const UpdatePatientPhysiqueTwo = async (req, res) => {
  try {
    await PatientPhysiqueTwo.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "PatientPhysiqueTwo Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const GetPatientPhysiqueTwoByPatientId = async (req, res) => {
  try {
    const patientPhysiqueTwo = await PatientPhysiqueTwo.findAll({
      where: {
        patientId: req.params.patientId,
      },
    });
    res.json(patientPhysiqueTwo[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const DeletePatientPhysiqueTwo = async (req, res) => {
  try {
    await PatientPhysiqueTwo.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "PatientPhysiqueTwo Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
