const express = require("express");

const router = express.Router();

const { userToken } = require("../Middleware/userLoginMiddleware");

const {
	getAllUser,
	registerUser,
	loginUser,
	checkIfUserLoggedIn,
} = require("../Controllers/userControllers");

router.get("/", getAllUser);

router.get("/loggedInOrNot", userToken, checkIfUserLoggedIn);

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
