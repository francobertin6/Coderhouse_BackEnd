// dependencies
import  Express  from "express";
const server = Express();

const PORT = 8080;
server.listen(PORT, () => {
    console.log("se ha inicializado el servidor");
});


server.use(Express.json());
server.use(Express.urlencoded({extended: true}));


// importacion ficheros
import products from "./src/Products/Products.js";
import cart from "./src/Cart/cart.js";


// endpoints
server.use("/products", products);
server.use("/cart", cart);
