import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getChats,
  addChat,
  getChat,
  readChat,
  deleteChat,
} from "../controllers/chatController.js";

const router = express.Router();

router.get("/chats", verifyToken, getChats);
router.get("/:id", verifyToken, getChat);
router.post("/", verifyToken, addChat);
router.put("/read/:id", verifyToken, readChat);
router.delete("/delete/:id", verifyToken, deleteChat);

export { router as chatRoute };
