
const Socket = io("http//http://127.0.0.1:8080");

Socket.emit("message", "hola me estoy comunicando por websocket");

Socket.on("conectado", data => {
    console.log(data);
})


console.log("este script esta funcionando");

