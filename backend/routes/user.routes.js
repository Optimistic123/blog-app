import express from "express";;
const router = express.Router();

router.get("/testuser", (req, res) => {
    res.status(200).send("testing user route")
});

export default router;
