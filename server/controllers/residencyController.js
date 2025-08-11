import asyncHandler from "express-async-handler";
import prisma from "../config/prismaConfig.js";

const createResidency = asyncHandler(async (req, res) => {
  const {title, description, price, address, city, image,
    facilities
  } = req.body.data


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
            createdAt: "desc",
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

});

export const updateResidency = async (req, res)=> {
  const { id } = req.params;
  const { facilities, ...inputs } = req.body

  try {
    const exRes = await prisma.residency.findUnique({
      where: { id },
      select: {
        facilities: true
      }
    });
    const updatedFacilities = {
      ...exRes.facilities,
      ...(facilities || {})
    }
    const residency = await prisma.residency.update({
      where: {
        id,
      }, 
      data: {
        ...inputs,
        facilities: updatedFacilities
      }
    });
      res.status(200).json({ message: "Residency updated Successfully", residency });
  } catch (error) {
    res.status(401).json({message: "Failed to update residency"})
    console.error(error);
  }
}
export const deleteResidency = async (req, res) => {
  const { id } = req.params;
  try {
    const residency = await prisma.residency.delete({
      where: {
        id
      }
    });
    if (!residency) return res.status(404).json({message: "Residency not found"})
    res.status(200).json({message: "residency deleted successfully", residency})
  } catch (error) {
    res.status(401).json({message: "Failed to delete residency"});
    console.log(error);
  }
};



export { createResidency };
export { getAllResidencies };
export { getResidency };
