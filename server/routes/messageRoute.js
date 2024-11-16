import express from "express";
import { addMessage } from "../controllers/messageController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();


router.post("/:chatId", verifyToken, addMessage)

export { router as messageRoute };
