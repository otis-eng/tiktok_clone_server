const ws = require("ws");
const wsServer = new ws.Server({ noServer: true, skipUTF8Validation: true });

global.websocket = wsServer;
wsServer.on("connection", (socket, req) => {
  socket.on("message", async (message) => {
    const data = message.toString("utf8");
    const response = await SocketController(data);
    socket.send(JSON.stringify(response));
  });

  const data = require("./response.example.json");
  // console.log("socket", socket.id);
  // socket.emit("video", "JSON.stringify(data)");
  // socket.send(JSON.stringify(data));
});
