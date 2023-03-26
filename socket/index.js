const verifyAuthToken = require("./auth");
const SocketNotification = require("./util/SocketNotification");
const Server = require("socket.io");
const http = require("http");
let io = null;

const createSocketServer = (app) => {
  const appServer = http.createServer(app);
  io = Server(appServer);

  io.on("connection", (socket) => {
    console.log("**** New listener trying to connect ***");
  });
};

module.exports = createSocketServer;
