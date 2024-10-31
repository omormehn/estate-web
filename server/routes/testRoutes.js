import express from "express";
import { isAdmin, isLoggedIn } from "../controllers/testController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/is-logged-in", verifyToken, isLoggedIn)
router.get("/is-admin", isAdmin);

export default router;