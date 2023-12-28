import express from "express";
import {
  createPatientPhysiqueTwoById,
  GetAllPatientPhysiqueTwoByPatientId,
  GetAllPatientPhysiqueTwo,
  UpdatePatientPhysiqueTwo,
  DeletePatientPhysiqueTwo,
} from "../Controllers/PatientPhysiqueTwoController.js";

const router = express.Router();

router.post("/patient-physique-two/:id", createPatientPhysiqueTwoById);
router.get("/patient-physique-two/:id", GetAllPatientPhysiqueTwoByPatientId);
router.get("/patient-physique-two/", GetAllPatientPhysiqueTwo);
router.put("/patient-physique-two/:id", UpdatePatientPhysiqueTwo);
router.delete("/patient-physique-two/:id", DeletePatientPhysiqueTwo);

export default router;
