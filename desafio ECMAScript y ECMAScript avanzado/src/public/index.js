
const socket = io();

socket.emit("message", "hola websocket, estoy enviando un mensaje");

console.log("este script esta funcionando");

