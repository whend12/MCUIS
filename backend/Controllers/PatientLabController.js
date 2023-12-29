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
        let lowerLimit = parseFloat(kondisi.lowerLimit);

        if (nilaiInput > upperLimit) {
          hasil[key] = {
            message: `Nilai ${key} dalam kategori: ${kondisi.status}`,
            saran: kondisi.saran,
          };
        } else if (nilaiInput < lowerLimit) {
          hasil[key] = {
            message: `Nilai ${key} dalam kategori: Below Lower Limit`,
            saran: kondisi.saran,
          };
        }
      }
    });
    return hasil;
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const { id } = req.params;
    const input = req.body;

    // Ambil data HasilAnalisis sebelumnya terkait dengan PatientId
    const previousAnalysis = await HasilAnalisis.findAll({
      where: {
        PatientId: id,
      },
    });

    // Hapus terlebih dahulu entri HasilAnalisis yang terkait dengan PatientId
    await HasilAnalisis.destroy({
      where: {
        PatientId: id,
      },
    });

    const hasilPengecekan = await cekBatasAtas(input);

    for (const key in hasilPengecekan) {
      const analysisResult = hasilPengecekan[key];

      if (analysisResult !== undefined && analysisResult !== null) {
        await HasilAnalisis.create({
          name: key,
          saran: analysisResult.saran,
          kesimpulan: "Tidak ada kesimpulan",
          PatientId: id,
        });
      }
    }

    // Proses pemantauan dan penghapusan saran yang berubah dari abnormal ke normal
    previousAnalysis.forEach(async (prevAnalysis) => {
      const currentKey = prevAnalysis.name;
      const currentResult = hasilPengecekan[currentKey];

      // Jika hasil sebelumnya adalah abnormal dan sekarang berubah menjadi normal, hapus entri HasilAnalisis terkait
      if (
        prevAnalysis.saran !== null &&
        currentResult !== undefined &&
        currentResult.saran === null
      ) {
        await HasilAnalisis.destroy({
          where: {
            name: currentKey,
            PatientId: id,
          },
        });
      }
    });

    res.json({ message: "PatientLab updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const DeletePatientLab = async (req, res) => {
  try {
    const patientId = req.params.id;

    // Hapus data dari tabel PatientLab
    await PatientLab.destroy({
      where: {
        PatientId: patientId,
      },
    });

    // Hapus entri terkait dari tabel HasilAnalisis
    await HasilAnalisis.destroy({
      where: {
        PatientId: patientId,
      },
    });

    res.json({
      message: "PatientLab and related analysis results deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
