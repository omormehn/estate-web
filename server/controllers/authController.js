import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import prisma from "../config/prigmaConfig.js";

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    if (!email || !password || !username) {
      throw new Error("Please fill all fields");
    }
    const userExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User Already Exist" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPass,
        username,
      },
    });

    //jwt
    generateTokenAndSetCookie(res, user._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
 
    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!user || !isValidPassword)  return res
      .status(401)
      .json({ message: "Invalid Credentials", success: false });

    generateTokenAndSetCookie(res, user._id);

        res.status(200).json({
          success: true,
          message: "Logged in successfully",
          user: {
            id: user.id, 
            email: user.email,
            username: user.username,
          },
        });


    
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
export const logout = async (req, res) => {
       res.clearCookie("token");
       res
         .status(200)
         .json({ success: true, message: "Logged out successfully" });
};
// export const register = async (req, res) => {};
