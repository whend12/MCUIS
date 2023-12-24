import express from "express";
import {
  CreateCondition,
  GetAllCondition,
  GetConditionById,
  getConditionByUserId,
  UpdateCondition,
  DeleteCondition,
} from "../Controllers/ConditionController.js";

const router = express.Router();

router.post("/condition", CreateCondition);
router.get("/condition", GetAllCondition);
router.get("/condition/:id", GetConditionById);
router.get("/condition/user/:id", getConditionByUserId);
router.put("/condition/:id", UpdateCondition);
router.delete("/condition/:id", DeleteCondition);

export default router;
