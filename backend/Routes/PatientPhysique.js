import express from "express";
import {
  getPatientPhysiqueById,
  createPatientPhysique,
  updatePatientPhysique,
  deletePatientPhysiqueById,
} from "../Controllers/PatientPhysiqueController.js";

const router = express.Router();

router.get("/patient-physique/:id", getPatientPhysiqueById);
router.post("/patient-physique/:id", createPatientPhysique);
router.put("/patient-physique/:id", updatePatientPhysique);
router.delete("/patient-physique/:id", deletePatientPhysiqueById);

export default router;
