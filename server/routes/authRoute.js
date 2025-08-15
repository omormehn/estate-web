import express from "express";
import {
  googleLogin,
  login,
  logout,
  register,
  validateUser,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/google", googleLogin);
router.post("/verify", verifyToken);
router.get("/validate-session", verifyToken, validateUser);

export default router;
