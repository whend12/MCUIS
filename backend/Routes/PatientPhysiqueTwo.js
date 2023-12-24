import express from "express";
import {
  getPatientPhysiqueTwo,
  getPatientPhysiqueTwoById,
  createPatientPhysiqueTwo,
  updatePatientPhysiqueTwo,
  deletePatientPhysiqueTwo,
} from "../Controllers/PatientPhysiqueTwo.js";

const router = express.Router();

router.get("/", getPatientPhysiqueTwo);

router.get("/:id", getPatientPhysiqueTwoById);

router.post("/", createPatientPhysiqueTwo);

router.patch("/:id", updatePatientPhysiqueTwo);

router.delete("/:id", deletePatientPhysiqueTwo);

export default router;
