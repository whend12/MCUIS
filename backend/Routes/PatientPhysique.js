import express from "express";
import {
  getPatientPhysiqueById,
  createPatientPhysique,
  updatePatientPhysique,
  deletePatientPhysique,
} from "../Controllers/PatientPhysiqueController.js";

const router = express.Router();

router.get("/patient-physique/:id", getPatientPhysiqueById);
router.post("/patient-physique/:id", createPatientPhysique);
router.patch("/patient-physique/:id", updatePatientPhysique);
router.delete("/patient-physique/:id", deletePatientPhysique);

export default router;
