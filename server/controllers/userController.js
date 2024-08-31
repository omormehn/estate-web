import asyncHandler from "express-async-handler";
import { prisma } from "../config/prigmaConfig.js";

//create user
const createUser = asyncHandler(async (req, res) => {
  console.log("creating a user");

  let { email } = req.body;

  //check if user is registered
  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!existingUser) {
    //create a new user in user collection with data as email
    const user = await prisma.user.create({ data: req.body });
    res.sendStatus({
      message: "User created successfully",
      user: user,
    });
  } else {
    res.status(400).json({ message: "User already Register" });
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
        res.status(404).json({ message: "Booking not Found" })
    } else {
        await prisma.user.update({
            where: { email: email },
            data: {
                bookedVisits: {
                    delete: id
                },
            }
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
        })
        if (user.favResidenceID.includes(rid)) {
            const updateUser = await prisma.user.update({
                where: { email: email },
                data: {
                    favResidenceID: {
                        set: user.favResidenceID.filter((id) => id !== rid)
                    }
                }
            });
            res.send({message: "Messaged removed from Favourite", user: updateUser})
        } else {
            const updateUser = await prisma.user.update({
                where: { email: email },
                data: {
                    favResidenceID: {
                        push: rid
                    }
                }
            });
            res.send({message: "Updated Favourite", user: updateUser})
        }
    } catch (err) {
        throw new Error(err.message);
    }

});


//all favourites
const allFavourites = asyncHandler(async(req, res) => {
    const { email } = req.body;

    try {
        const favourites = await prisma.user.findUnique({
          where: { email: email },
          select: { favResidenceID: true },
        });
        res.status(200).send(favourites);
    } catch (err) {
        throw new Error(err.message)
    }
})

export { createUser };
export { bookVisit };
export { allBookings };
export { deleteBooking };
export { addResidencyToFavourite };
export { allFavourites };
