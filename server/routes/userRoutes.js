import express from "express";
import {
  createUser,
  bookVisit,
  allBookings,
  deleteBooking,
  addResidencyToFavourite,
  allFavourites,
} from "../controllers/userController.js";


const router = express.Router();

router.post("/register", createUser);
router.post("/book-visit/:id", bookVisit)
router.post("/all-bookings", allBookings)
router.post("/delete-booking/:id", deleteBooking);
router.post("/to-fav/:rid", addResidencyToFavourite)
router.post("/all-favourite", allFavourites);

export { router as userRoute }