import express from "express";
import ProductManager from "../api/productManager";

const router = express.Router();

router.get( "/", (req,res) => {

    let products = ProductManager.getAllProducts();

    res.render("index", {
        name: "hilda",
        socket : "/socket.io/socket.io.js",
        index : "../public/index.js",
        productos : products
    });
})

export default router;