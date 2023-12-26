import express from "express";
import {
  CreateCondition,
  GetAllCondition,
  GetConditionById,
  getConditionByUserId,
  UpdateCondition,
  DeleteCondition,
} from "../Controllers/ConditionTwoController.js";

const router = express.Router();

router.post("/condition-two", CreateCondition);
router.get("/condition-two", GetAllCondition);
router.get("/condition-two/:id", GetConditionById);
router.get("/condition-two/user/:id", getConditionByUserId);
router.put("/condition-two/:id", UpdateCondition);
router.delete("/condition-two/:id", DeleteCondition);

export default router;
