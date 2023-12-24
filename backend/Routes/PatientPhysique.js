import express from "express";
import {
  getPatientPhysique,
  getPatientPhysiqueById,
  createPatientPhysique,
  createPatientPhysiqueById,
  updatePatientPhysique,
  deletePatientPhysique,
} from "../Controllers/PatientPhysique.js";

const router = express.Router();

router.get("/patient-physique", getPatientPhysique);
router.get("/patient-physique/:id", getPatientPhysiqueById);
router.post("/patient-physique", createPatientPhysique);
router.post("/patient-physique/:id", createPatientPhysiqueById);
router.patch("/patient-physique/:id", updatePatientPhysique);
router.delete("/patient-physique/:id", deletePatientPhysique);

export default router;
