import express from "express";
import {
  createResidency,
  deleteResidency,
  getAllResidencies,
  getResidency,
  updateResidency,
} from "../controllers/residencyController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
const router = express.Router();

//route to create
router.post("/create", verifyToken, isAdmin, createResidency);

//route to get all
router.get("/allresd", getAllResidencies);

//route to get one by id
router.get("/:id", verifyToken, getResidency);

router.put("/:id", verifyToken, isAdmin, updateResidency);

router.delete("/:id", verifyToken, isAdmin, deleteResidency);

export { router as residencyRoute };
