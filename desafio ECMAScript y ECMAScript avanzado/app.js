// dependencies
import  Express  from "express";
import Handlebars from "express-handlebars";
import _dirname from "./utils.js";
import router from "./src/routes/views.routes.js";
import { Server } from "socket.io";

const server = Express();
server.use(Express.json());
server.use(Express.urlencoded({extended: true}));

// serverSocket
const htppServer = server.listen(8080, () => {
    console.log("se inicializa server")
})
const serverSocket = new Server(htppServer);

serverSocket.on('connection', socket => {
    console.log('nuevo cliente conectado');

    socket.on('message', (data) => {
        console.log(data);
    })
})


// server.engine señala que motor pondremos en funcionamiento: handlebars 
server.engine("handlebars", Handlebars.engine())
// con (views, ruta) le vamos a indicar al servidor en que parte del proyecto estaran las vistas
server.set("views", _dirname+ "/src/views");
// con (view engine, handlebars) indicamos que el motor que inicializamos arriba es el que queremos usar
server.set("view engine", "handlebars")
// seteamos de manera estatica nuestra carpeta public
server.use(Express.static(_dirname + "/src/public"))


// importacion ficheros
import products from "./src/Products/Products.js";
import cart from "./src/Cart/cart.js";


// endpoints
server.use("/products", products);
server.use("/cart", cart);

// endpoints handlebars
server.use("/", router);