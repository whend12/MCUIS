import express from "express";
import {
  GetQueue,
  CreateQueue,
  ResetQueue,
  NextQueue,
} from "../Controllers/QueueController.js";

const router = express.Router();

router.get("/queue", GetQueue);
router.post("/queue", CreateQueue);
router.delete("/queue", ResetQueue);
router.get("/queue/next", NextQueue);

export default router;
