import express from "express";
import {
  getUsers,
  getUser,
  bookVisit,
  allBookings,
  deleteBooking,
  addResidencyToFavourite,
  allFavourites,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();

router.get("/all-users", getUsers);
router.get("/:id", verifyToken, getUser);
router.put("/update-user/:id", verifyToken, updateUser);
router.delete("/delete-user/:id", verifyToken, deleteUser);
router.post("/book-visit/:id", bookVisit)
router.post("/all-bookings", allBookings)
router.post("/delete-booking/:id", deleteBooking);
router.post("/to-fav/:rid", addResidencyToFavourite)
router.post("/all-favourite", allFavourites);

export { router as userRoute }