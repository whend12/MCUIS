import Condition from "../Models/ConditionModel.js";
import HasilAnalisis from "../Models/HasilAnalisModel.js";
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
    const input = req.body;

    const hasilPengecekan = await cekBatasAtas(input);

    const patientLab = await PatientLab.create({
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

    res.json(patientLab);
  } catch (error) {
    res.json({ message: error.message });
  }
};

async function cekBatasAtas(inputUser) {
  try {
    let inputUserLowercase = {};
    for (let key in inputUser) {
      inputUserLowercase[key.toLowerCase()] = inputUser[key];
    }
    const dataKondisi = await Condition.findAll();

    let hasil = {};
    dataKondisi.forEach((kondisi) => {
      const key = kondisi.name.toLowerCase();
      if (inputUserLowercase.hasOwnProperty(key)) {
        let nilaiInput = parseFloat(inputUserLowercase[key]);
        let upperLimit = parseFloat(kondisi.upperLimit);

        if (nilaiInput > upperLimit) {
          hasil[key] = {
            message: `Nilai ${key} dalam kategori: ${kondisi.status}`,
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
        PatientId: req.params.id,
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
        PatientId: req.params.id,
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
        PatientId: req.params.id,
      },
    });
    res.json({
      message: "PatientLab Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
