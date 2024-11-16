import prisma from "../config/prismaConfig.js";

export const isAdmin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId
      },
    });
   if (!user || user.role !== "ADMIN") {
     return res.status(403).json({ message: "Access Denied" });
   }
   next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    console.log(error);
  }
};


