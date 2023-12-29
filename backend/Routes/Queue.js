import express from "express";
import {
  takeNumber,
  getCurrentNumber,
  updateNextNumber,
  resetQueue,
} from "../Controllers/QueueController.js";

const router = express.Router();

router.get("/take-number", takeNumber);
router.get("/get-current-number", getCurrentNumber);
router.post("/update-next-number", updateNextNumber);
router.delete("/reset-queue", resetQueue);

export default router;
