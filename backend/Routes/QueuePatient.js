import express from "express";
import {
  takeQueueNumber,
  resetQueue,
  getQueueNumber,
} from "../Controllers/QueuePatientController.js";

const router = express.Router();

router.get("/patient-take-number", takeQueueNumber);
router.delete("/patient-reset-queue", resetQueue);
router.get("/patient-get-current-number", getQueueNumber);

export default router;
