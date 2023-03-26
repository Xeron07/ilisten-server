require("dotenv").config();
require("./config/db").connect();
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const v1Router = require("./routes/v1");
const createSocketServer = require("./socket");

const app = express();
createSocketServer(app);
// app.use(fileUpload());

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/v1", v1Router);

// app.use("/", (req, res) => {
//   res.status(200).send("Congratulations, connection success");
// });
//CONFIGURATION FOR PRODUCTION
// if (process.env.NODE_ENV === "production") {
app.use(express.static("admin/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "admin", "build", "index.html"));
});

module.exports = app;
