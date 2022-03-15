const express = require("express");

const router = express.Router();

const { userToken } = require("../Middleware/userLoginMiddleware");

const {
	getAllUser,
	registerUser,
	loginUser,
	checkIfUserLoggedIn,
	findOneuser,
} = require("../Controllers/userControllers");

router.get("/", userToken, getAllUser);

router.get("/OneUser/:id", userToken, findOneuser);

router.get("/loggedInOrNot", userToken, checkIfUserLoggedIn);

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
