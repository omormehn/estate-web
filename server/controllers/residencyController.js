import asyncHandler from "express-async-handler";
import { prisma } from "../config/prigmaConfig.js";

const createResidency = asyncHandler(async (req, res) => {
  const {title, description, price, address, city, image,
    facilities, userEmail
  } = req.body.data

  console.log(req.body.data)

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        city,
        image,
        facilities,
        owner: {connect: {email: userEmail}},
      },
    });

    res.send({
        message: "Residency created Successfully", residency
    })

  } catch (err) {
    if (err.code === "P2002") {
        throw new Error("A residency with address already exists")
    }
    throw new Error(err.message)
  }
});

//get all residencies
const getAllResidencies = asyncHandler(async(req, res) => {
    const residencies = await prisma.residency.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
    res.send(residencies);
})


//get a specific property
const getResidency = asyncHandler(async(req, res) => {
  //fetch id
  const {id} = req.params; //using url to send some params

  try {
    const residency = await prisma.residency.findUnique({
      where: {id: id},
    });
    res.send(residency)
  } catch (err) {
    throw new Error(err.message)
  }

})



export { createResidency };
export { getAllResidencies };
export { getResidency };
