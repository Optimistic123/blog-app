import express from "express";
import ImageKit from "imagekit";
const router = express.Router();

const imagekit = new ImageKit({
    urlEndpoint: process.env.IK_END_POINT,
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY
});

router.get("/testuser", (req, res) => {
    res.status(200).send("testing user route")
});

router.get("/upload", (req, res) => {
    var result = imagekit.getAuthenticationParameters();
    console.log("uload result", result);
    res.send(result);
});

export default router;
