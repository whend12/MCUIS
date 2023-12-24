import express from "express";
import {
  getPatientLab,
  getPatientLabById,
  createPatientLab,
  updatePatientLab,
  deletePatientLab,
} from "../Controllers/PatientLab.js";

const router = express.Router();

router.get("/", getPatientLab);

router.get("/:id", getPatientLabById);

router.post("/", createPatientLab);

router.patch("/:id", updatePatientLab);

router.delete("/:id", deletePatientLab);

export default router;
