import express from "express";
import {
  login,
  logout,
  register,
  socialLogin,
  validateUser,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/social-login", socialLogin);
router.post("/verify", verifyToken);
router.get("/validate-session", verifyToken, validateUser);

export default router;
