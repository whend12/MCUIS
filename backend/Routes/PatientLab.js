import express from "express";
import {
  CreatePatientLab,
  CreatePatientLabById,
  GetAllPatientLab,
  GetPatientLabById,
  UpdatePatientLab,
  DeletePatientLab,
} from "../Controllers/PatientLabController.js";

const router = express.Router();

router.post("/form-lab/", CreatePatientLab);
router.post("/form-lab/:id", CreatePatientLabById);
router.get("/form-lab/", GetAllPatientLab);
router.get("/form-lab/:id", GetPatientLabById);
router.put("/form-lab/:id", UpdatePatientLab);
router.delete("/form-lab/:id", DeletePatientLab);

export default router;
