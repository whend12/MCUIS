import HasilAnalisis from "../Models/HasilAnalisModel";
import HasilAnalisis from "../Models/HasilAnalisModel";
import PatientPhysique from "../Models/PatientPhysiqueModel";
import PatientPhysiqueTwo from "../Models/PatientPhysiqueTwoModel";
import Condition from "../Models/ConditionModel";
import { Op } from "sequelize";

export const CreateHasilAnalisis = async (req, res) => {
  try {
    const fisikPasien = req.body.PatientPhysique;
    const fisikPasienDua = req.body.PatientPhysiqueTwo;

    // Mengambil data fisik pasien dari tabel PatientPhysique
    const dataFisik1 = await PatientPhysique.findOne({
      where: {
        PatientId: fisikPasien.PatientId, // Pastikan ada id pasien di request body Anda
      },
    });

    // Mengambil data fisik pasien dari tabel PatientPhysiqueTwo
    const dataFisik2 = await PatientPhysiqueTwo.findOne({
      where: {
        PatientId: fisikPasienDua.PatientId, // Pastikan ada id pasien di request body Anda
      },
    });

    // Lakukan pengecekan kondisi fisik dari kedua tabel fisik
    // Misalnya, jika tinggi badan melebihi batas tertentu
    const conditionFisik1 = await Condition.findOne({
      where: {
        name: "blood_pressure",
        lowerLimit: { [Op.gt]: dataFisik1.blood_pressure },
        upperLimit: { [Op.lt]: dataFisik1.blood_pressure },
      },
    });
    const conditionFisik2 = await Condition.findOne({
      where: {
        name: "Kepala", // Misalnya, kondisi untuk tinggi badan
        lowerLimit: { [Op.gt]: dataFisik2.head }, // Lower limit dari database lebih besar dari nilai tinggi badan
        upperLimit: { [Op.lt]: dataFisik2.head }, // Upper limit dari database kurang dari nilai tinggi badan
      },
    });

    // Jika kondisi fisik melebihi batas, dapatkan saran dari ConditionModel
    const conditionSaran = conditionFisik1
      ? conditionFisik1.saran
      : "No suggestions found.";
    const conditionSaran2 = conditionFisik2
      ? conditionFisik2.saran
      : "No suggestions found.";

    // Buat objek hasil analisis dengan saran dan kesimpulan
    const hasilAnalisis = await HasilAnalisis.create({
      saran: conditionSaran,
      conditionSaran2,
      kesimpulan: "Conclusion based on patient's condition.",
    });

    res.json(hasilAnalisis);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const GetAllHasilAnalisis = async (req, res) => {
  try {
    const hasilAnalisis = await HasilAnalisis.findAll();
    res.json(hasilAnalisis);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const GetHasilAnalisisById = async (req, res) => {
  try {
    const hasilAnalisis = await HasilAnalisis.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(hasilAnalisis[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const UpdateHasilAnalisis = async (req, res) => {
  try {
    await HasilAnalisis.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "HasilAnalisis Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const DeleteHasilAnalisis = async (req, res) => {
  try {
    await HasilAnalisis.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "HasilAnalisis Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const GetHasilAnalisisByPatientId = async (req, res) => {
  try {
    const hasilAnalisis = await HasilAnalisis.findAll({
      where: {
        PatientId: req.params.patientId,
      },
    });
    res.json(hasilAnalisis);
  } catch (error) {
    res.json({ message: error.message });
  }
};
