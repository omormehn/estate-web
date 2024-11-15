import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';

import { userRoute } from "./routes/userRoutes.js";
import { residencyRoute } from "./routes/residencyRoute.js";
import authRoute from "./routes/authRoute.js"
import testRoute from "./routes/testRoutes.js";
import { chatRoute } from "./routes/chatRoute.js";
import { messageRoute } from "./routes/messageRoute.js";


dotenv.config();

export const app = express();

const PORT = process.env.PORT || 3000; // it can take 3000 as a fallback


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use("/api/user", userRoute);
app.use("/api/user/residency", residencyRoute);
app.use("/api/user/auth", authRoute);
app.use("/api/user/test", testRoute);
app.use("/api/user/chat", chatRoute);
app.use("/api/user/message", messageRoute);
