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
router.get("/get-user/:id", verifyToken, getUser);
router.put("/update-user/:id", verifyToken, updateUser);
router.delete("/delete-user/:id", verifyToken, deleteUser);
router.post("/book-visit/:id", verifyToken, bookVisit)
router.post("/all-bookings", allBookings)
router.post("/delete-booking/:id",verifyToken, deleteBooking);
router.post("/to-fav/:rid", verifyToken, addResidencyToFavourite)
router.post("/all-favorite", allFavourites);

export { router as userRoute }