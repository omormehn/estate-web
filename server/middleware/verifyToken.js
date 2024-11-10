import jwt from 'jsonwebtoken';
import prisma from '../config/prismaConfig.js';

export const verifyToken = async (req, res, next) => {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ message: "Not Authenticated" });

      jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if (error) return res.status(401).json({ message: "Token is invalid" });
        req.user = payload;
        next();
      });
        console.log("User  ID from token:", req.userId);
       
}