import express from "express";
import {
  CreatePatient,
  GetAllPatient,
  GetPatientByName,
  GetPatientByDate,
  GetPatientById,
  UpdatePatient,
  DeletePatient,
} from "../Controllers/PatientController.js";
import { verifyToken } from "../Middleware/VerifyToken.js";

const router = express.Router();

router.post("/patient", CreatePatient);
router.get("/patient", GetAllPatient);
router.get("/patient/name/:name", GetPatientByName);
router.get("/patient/date/:date", GetPatientByDate);
router.get("/patient/:id", GetPatientById);
router.put("/patient/:id", UpdatePatient);
router.delete("/patient/:id", DeletePatient);

export default router;
