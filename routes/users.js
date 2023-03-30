const express = require("express");
const userControllers = require("../controllers/userControllers");
const { validateToken } = require("../middleware/validateTokenHandler");
require("dotenv").config();

const userRouter = express.Router();

userRouter.get("/currentUser", validateToken, userControllers.currentUser);

userRouter.post("/register", userControllers.registerUser);

userRouter.post("/login", userControllers.loginUser);

module.exports = userRouter;
