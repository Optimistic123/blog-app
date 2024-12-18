import express from "express";
import connectDB from "./lib/connectDB.js"
import userRouter from './routes/user.routes.js';
import webhookRouter from "./routes/webhook.routes.js";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
const app = express();

app.use(cors(process.env.CLIENT_URL));
app.use(clerkMiddleware({
    apiKey: process.env.CLERK_SECRET_KEY // The API Key (Secret Key) for server-side authentication
}));
app.use("/webhooks", webhookRouter);

app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use("/user", userRouter);

app.listen(8000, () => {
    connectDB()
    console.log("Server is running!");
});