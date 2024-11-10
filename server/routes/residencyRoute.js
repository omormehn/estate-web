import express from "express";
import {
  createResidency,
  getAllResidencies,
  getResidency,
} from "../controllers/residencyController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
const router = express.Router()


//route to create
router.post("/create", verifyToken, isAdmin, createResidency)

//route to get all
router.get("/allresd", getAllResidencies)

//route to get one by id
router.get("/:id", getResidency)

export { router as residencyRoute };
