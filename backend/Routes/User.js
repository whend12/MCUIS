import express from "express";
import {
  Login,
  CreateUsers,
  Logout,
  GetUsers,
} from "../Controllers/UserController.js";
import { verifyToken } from "../Middleware/VerifyToken.js";
import { refreshToken } from "../Middleware/RefreshToken.js";

const router = express.Router();

router.get("/users", verifyToken, GetUsers);
router.post("/users", CreateUsers);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;
