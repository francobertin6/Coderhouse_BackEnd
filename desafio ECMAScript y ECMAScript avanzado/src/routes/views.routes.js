import express from "express";

const router = express.Router();

router.get( "/", (req,res) => {

    res.render("index", {
        name: "hilda"
    });
})

export default router;