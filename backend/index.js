import express from "express";
import connectDB from "./lib/connectDB.js"
import userRouter from './routes/user.routes.js';
import webhookRouter from "./routes/webhook.routes.js";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
const app = express();

app.use(cors(process.env.CLIENT_URL));
app.use(clerkMiddleware());
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
app.use("/user-state", (req, res) => {
    const authState = req.auth;
    res.json(authState);
});

app.listen(8000, () => {
    connectDB()
    console.log("Server is running!");
});