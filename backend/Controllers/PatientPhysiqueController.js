import PatientPhysique from "../Models//PatientPhysiqueModel.js";
import Condition from "../Models/ConditionModel.js";
import HasilAnalisis from "../Models/HasilAnalisModel.js";

export const createPatientPhysique = async (req, res) => {
  try {
    const { id } = req.params;
    const input = req.body;

    const hasilPengecekan = await cekBatasAtas(input);

    const newPhysique = await PatientPhysique.create({
      ...req.body,
      PatientId: id,
    });
    console.log(newPhysique);
    for (const key in hasilPengecekan) {
      await HasilAnalisis.create({
        name: key,
        saran: hasilPengecekan[key].saran,
        kesimpulan: "Tidak ada kesimpulan",
        PatientId: id,
      });
    }

    res.status(201).json({
      message: "PatientPhysique created successfully",
      newPhysique,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    let groupedConditions = groupBy(dataKondisi, "name");

    for (let key in groupedConditions) {
      if (inputUserLowercase.hasOwnProperty(key.toLowerCase())) {
        const userInput = inputUserLowercase[key.toLowerCase()];

        if (userInput.toLowerCase() === "abnormal") {
          groupedConditions[key].find((kondisi) => {
            hasil[key] = {
              message: `Nilai ${key} abnormal`,
              saran: kondisi.saran,
            };
          });
        } else if (userInput.includes("/")) {
          let kondisiTerpenuhi = groupedConditions[key].find((kondisi) => {
            return bandingkanPenglihatan(userInput, kondisi.upperLimit);
          });

          if (kondisiTerpenuhi) {
            hasil[key] = {
              message: `Nilai ${key} dalam kategori: ${kondisiTerpenuhi.status}`,
              saran: kondisiTerpenuhi.saran,
            };
          }
        } else {
          let nilaiInput = parseFloat(userInput);
          let kondisiTerpenuhiUpper = groupedConditions[key].find((kondisi) => {
            let upperLimit = parseFloat(kondisi.upperLimit);
            return nilaiInput > upperLimit;
          });

          let kondisiTerpenuhiLower = groupedConditions[key].find((kondisi) => {
            let lowerLimit = parseFloat(kondisi.lowerLimit);
            return nilaiInput < lowerLimit;
          });

          if (kondisiTerpenuhiUpper) {
            hasil[key] = {
              message: `Nilai ${key} dalam kategori: ${kondisiTerpenuhiUpper.status}`,
              saran: kondisiTerpenuhiUpper.saran,
            };
          } else if (kondisiTerpenuhiLower) {
            hasil[key] = {
              message: `Nilai ${key} dalam kategori: ${kondisiTerpenuhiLower.status}`,
              saran: kondisiTerpenuhiLower.saran,
            };
          }
        }
      }
    }

    return hasil;
  } catch (error) {
    console.log(error);
  }
}

function groupBy(array, key) {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
}

function bandingkanPenglihatan(nilai1, nilai2) {
  let [_, penglihatan1] = nilai1.split("/").map(Number);
  let [__, penglihatan2] = nilai2.split("/").map(Number);

  return penglihatan1 > penglihatan2;
}

export const getPatientPhysiqueById = async (req, res) => {
  try {
    const { id } = req.params;
    const patientPhysique = await PatientPhysique.findOne({
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
    const patientPhysique = await PatientPhysique.findOne({
      where: {
        PatientId: id,
      },
    });

    if (!patientPhysique) {
      return res.status(404).json({ message: "PatientPhysique not found" });
    }

    await patientPhysique.update(req.body);

    res.json({ message: "PatientPhysique updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePatientPhysiqueById = async (req, res) => {
  try {
    const { id } = req.params;

    // Temukan entri PatientPhysique yang sesuai
    const patientPhysique = await PatientPhysique.findOne({
      where: {
        PatientId: id,
      },
    });

    if (!patientPhysique) {
      return res.status(404).json({ message: "PatientPhysique not found" });
    }

    // Hapus entri terkait dari tabel PatientPhysique
    await patientPhysique.destroy();

    // Hapus entri terkait dari tabel HasilAnalisis
    await HasilAnalisis.destroy({
      where: {
        PatientId: id,
      },
    });

    res.json({
      message:
        "PatientPhysique and related analysis results deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
