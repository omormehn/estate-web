import asyncHandler from "express-async-handler";
import prisma from "../config/prismaConfig.js";
import bcrypt from "bcrypt";

//create user
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    console.log("ss: ", users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to get users" });
  }
};

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User found Successfully", user });
    console.log(user);
  } catch (error) {
    res.status(401).json({ message: "Failed to get user" });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tokenUserId = id;
  if (id !== tokenUserId)
    return res.status(403).json({ message: "Not Authorized" });
  const { password, image, ...inputs } = req.body;
  try {
    let updatedPassword = null;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(image && { image }),
      },
    });
    res.status(200).json({ message: "User updated Successfully", user });
  } catch (error) {
    res.status(401).json({ message: "Failed to update user" });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tokenUserId = id;
  if (id !== tokenUserId)
    return res.status(403).json({ message: "Not Authorized" });
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "User deleted Successfully" });
  } catch (error) {
    res.status(401).json({ message: "Failed to delete user" });
  }
});

//book visit to residency
const bookVisit = asyncHandler(async (req, res) => {
  //fetch email and date
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    //check if user has already booked
    const alreadyBooked = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });
    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res.status(400).json({
        message: "You have already booked a visit to this residency",
      });
    } else {
      //create a new visit in user collection with data as email and date
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: {
            push: {
              id: id,
              date: date,
            },
          },
        },
      });
      res.send("your visit is booked successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

//get all bookings of user
const allBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const bookings = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true }, // only select the bookedVisits field and not the whole doc
    });
    res.status(200).send(bookings);
  } catch (err) {
    throw new Error(err.message);
  }
});

//cancel booking
const deleteBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });
    const index = user.bookedVisits.findIndex((visit) => visit.id === id);
    if (index === -1) {
      res.status(404).json({ message: "Booking not Found" });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: {
            delete: id,
          },
        },
      });

      res.status(200).json({ message: "Booking cancelled" });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

//adding residency to favourite list of a user
const addResidencyToFavourite = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    const resId = await prisma.residency.findUnique({
      where: { id: rid },
    });
    if (!resId) {
      res.send({ message: "Invalid Id" });
    }
    if (user.favResidenceID.includes(rid)) {
      const updateUser = await prisma.user.update({
        where: { email: email },
        data: {
          favResidenceID: {
            set: user.favResidenceID.filter((id) => id !== rid),
          },
        },
      });
      res.send({
        message: "Messaged removed from Favorite",
        user: updateUser,
      });
    } else {
      const updateUser = await prisma.user.update({
        where: { email: email },
        data: {
          favResidenceID: {
            push: rid,
          },
        },
      });
      res.send({
        message: "Updated Favorite",
        user: updateUser,
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
});

//all favourites
const allFavourites = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const favourites = await prisma.user.findUnique({
      where: { email: email },
      select: { favResidenceID: true },
    });
    res.status(200).send(favourites);
  } catch (err) {
    console.log("ww", err);
    throw new Error(err.message);
  }
});

export const toggleBookmark = asyncHandler(async (req, res) => {
  const { email, residencyId } = req.body;
  try {
    if (!email || !residencyId) {
      return res.status(400).json({ message: "Email and Residency ID are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.bookMarkedResidences.includes(residencyId)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          bookMarkedResidences: {
            set: user.bookMarkedResidences.filter((id) => id !== residencyId),
          },
        },
      });
      return res.status(200).json({
        message: "Residency removed from bookmarks",
        user: updateUser,
      });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          bookMarkedResidences: {
            push: residencyId,
          },
        },
      });
      res.status(200).json({
        message: "Residency added to bookmarks",
        user: updateUser,
      });
    }
  } catch (error) {
    console.error("Error saving residency:", error);
    res.status(500).json({ message: "Failed to save residency" });
  }
});

export const getBookMarks = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookMarkedResidences: true },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.bookMarkedResidences);
  } catch (error) {
    console.error("Error fetching saved residencies:", error);
    res.status(500).json({ message: "Failed to fetch saved residencies" });
  }
}); 

export { getUsers };
export { getUser };
export { updateUser };
export { deleteUser };
export { bookVisit };
export { allBookings };
export { deleteBooking };
export { addResidencyToFavourite };
export { allFavourites };
