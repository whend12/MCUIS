import ConditionTwo from "../Models/ConditionTwoModel.js";
import HasilAnalisis from "../Models/HasilAnalisModel.js";
import PatientPhysiqueTwo from "../Models/PatientPhysiqueTwoModel.js";

export const createPatientPhysiqueTwoById = async (req, res) => {
  try {
    const { id } = req.params;
    const input = req.body;

    const hasilPengecekan = await cekStatus(input);

    const patientPhysiqueTwo = await PatientPhysiqueTwo.create({
      ...req.body,
      PatientId: id,
    });

    for (const key in hasilPengecekan) {
      await HasilAnalisis.create({
        name: key,
        saran: hasilPengecekan[key].saran,
        kesimpulan: "Tidak ada kesimpulan",
        PatientId: id,
      });
    }

    res.json(patientPhysiqueTwo);
  } catch (error) {
    res.json({ message: error.message });
  }
};

async function cekStatus(inputUser) {
  try {
    let inputUserLowercase = {};
    for (let key in inputUser) {
      inputUserLowercase[key.toLowerCase()] = inputUser[key];
    }
    const dataKondisi = await ConditionTwo.findAll();

    let hasil = {};

    dataKondisi.forEach((kondisi) => {
      const key = kondisi.name.toLowerCase();

      if (inputUserLowercase.hasOwnProperty(key)) {
        const userInput = inputUserLowercase[key];

        if (userInput.toLowerCase() === "abnormal") {
          hasil[key] = {
            message: `Nilai ${key} ${kondisi.status}`,
            saran: kondisi.saran,
          };
        }
      }
    });

    return hasil;
  } catch (error) {
    // Error handling
  }
}

export const GetAllPatientPhysiqueTwoByPatientId = async (req, res) => {
  try {
    const patientPhysiqueTwo = await PatientPhysiqueTwo.findOne({
      where: {
        PatientId: req.params.id,
      },
    });
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

export const UpdatePatientPhysiqueTwo = async (req, res) => {
  try {
    await PatientPhysiqueTwo.update(req.body, {
      where: {
        PatientId: req.params.id,
      },
    });
    res.json({
      message: "PatientPhysiqueTwo Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const DeletePatientPhysiqueTwo = async (req, res) => {
  try {
    await PatientPhysiqueTwo.destroy({
      where: {
        PatientId: req.params.id,
      },
    });
    res.json({
      message: "PatientPhysiqueTwo Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
