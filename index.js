const express = require("express");
const ws = require("ws");
const { SocketController } = require("./src/router");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const wsServer = new ws.Server({ noServer: true, skipUTF8Validation: true });

wsServer.on("connection", (socket, req) => {
  var id = req.headers["sec-websocket-key"];
  if (id) socket["id"] = Date.now();
  console.log("---->", socket.id);
  // console.log("connection", socket);
  // socket.send()
  socket.on("message", async (message) => {
    console.log("Message");
    const data = message.toString("utf8");
    const res = require("./response.example.json");
    const response = await SocketController(data);
    socket.emit("video", JSON.stringify(res));
  });

  // console.log("socket", socket.id);
  // socket.emit("video", JSON.stringify(data));
  const data = require("./response.example.json");
  socket.send(JSON.stringify(data));
});

// wsServer.on("open", function open() {
//   console.log("open");
//   ws.send("something");
// });

const dbURL = process.env.MONGODB_URL;
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((_) => console.log("connect to database success!"))
  .catch((err) => console.log(err));
const server = app.listen(3000);

server.on("upgrade", (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (socket) => {
    wsServer.emit("connection", socket, request);
  });
});
