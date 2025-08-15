import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';

import { userRoute } from "./routes/userRoutes.js";
import { residencyRoute } from "./routes/residencyRoute.js";
import authRoute from "./routes/authRoute.js"
import testRoute from "./routes/testRoutes.js";



dotenv.config();

export const app = express();

const PORT = process.env.PORT || 3000; 
const CLIENT_URL = process.env.CLIENT_URL

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}))

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use("/user", userRoute);
app.use("/user/residency", residencyRoute);
app.use("/user/auth", authRoute);
app.use("/user/test", testRoute);

