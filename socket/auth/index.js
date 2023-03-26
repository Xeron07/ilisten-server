const jwt = require("jsonwebtoken");
const AUTH_TOKEN_KEY = process.env;

verifySocketToken = (socket, callback) => {
  let token = socket.request.headers.bearertoken;
  if (token === null || typeof token === "undefined") {
    return new Error("Unauthorized (token not valid)");
  }
  try {
    const payload = jwt.verify(token, AUTH_TOKEN_KEY);
    socket.request.tenantId = payload.tenantId;
    socket.request.userId = payload._id;
    callback(socket);
  } catch (ex) {
    return new Error("Unauthorized (token not valid)");
  }
};

module.exports = verifySocketToken;
