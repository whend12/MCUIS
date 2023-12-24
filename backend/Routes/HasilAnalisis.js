import express from "express";
import {
  CreateHasilAnalisis,
  GetAllHasilAnalisis,
  GetHasilAnalisisById,
  UpdateHasilAnalisis,
  DeleteHasilAnalisis,
} from "../Controllers/HasilAnalisisController.js";

const router = express.Router();

router.post("/hasilanalisis", CreateHasilAnalisis);
router.get("/hasilanalisis", GetAllHasilAnalisis);
router.get("/hasilanalisis/:id", GetHasilAnalisisById);
router.put("/hasilanalisis/:id", UpdateHasilAnalisis);
router.delete("/hasilanalisis/:id", DeleteHasilAnalisis);

export default router;
