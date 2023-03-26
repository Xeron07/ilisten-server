const userAuth = require("./user/users");
const express = require("express");
const router = express.Router();

const uploadRouter = require("./media");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Inventory" });
// });
router.use("/auth", userAuth);
router.use("/media", uploadRouter);

module.exports = router;
