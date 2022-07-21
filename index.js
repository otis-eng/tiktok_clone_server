const express = require("express");
const ws = require("ws");

const app = express();

// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true, skipUTF8Validation: true });
wsServer.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log("message", message.toString("utf8"));
    socket.send("Oh hello connect" + message.toString("utf8"));
  });
  socket.send("Connect success");
});

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
wsServer.on("open", function open() {
  ws.send("something");
});
wsServer.on("message", (data) => {
  console.log("received: %s", data);
});
const server = app.listen(3000);

server.on("upgrade", (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (socket) => {
    wsServer.emit("connection", socket, request);
  });
});

// const ws = new WebSocket("ws://www.host.com/path");
