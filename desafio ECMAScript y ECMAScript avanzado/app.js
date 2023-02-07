// dependencies
import  Express  from "express";
const server = Express();


server.listen(4500, () => {
    console.log("se ha inicializado el servidor");
});

server.use(Express.json());
server.use(Express.urlencoded({extended: true}));


// importacion ficheros
import products from "./src/main.js";


// endpoints
server.use("/products", products);
