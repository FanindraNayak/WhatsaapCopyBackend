const express = require("express");

const router = express.Router();

const { userToken } = require("../Middleware/userLoginMiddleware");

const {
	getAllMessage,
	postMessage,
	messageSentTOAUser,
} = require("../Controllers/messageController");

router.get("/", userToken, getAllMessage);

router.post("/userrMessagr", messageSentTOAUser);

router.post("/message", postMessage);

module.exports = router;
