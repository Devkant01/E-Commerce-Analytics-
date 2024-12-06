const express = require("express");
const adminRouter = require("./admin");
const userRouter = require("./user");
const Router = express.Router();

Router.use("/admin", adminRouter);
Router.use("/user", userRouter);

Router.get("/", (req, res) => {
    const { name = "Devkant" } = req.query;
    res.send(`welcome user: ${name}`);
})

module.exports = {
    Router
};