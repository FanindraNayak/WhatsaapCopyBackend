const express = require("express");
const Message = require("../Schema/messageSchema");

module.exports.getAllMessage = async (req, res) => {
	try {
		const data = await Message.find({});
		console.log(data);
		res.send({ message: "yes" });
	} catch (error) {
		console.log(error);
		res.send(error);
	}
};

//Get A single Chat message

module.exports.messageSentTOAUser = async (req, res) => {
	try {
		const { fromUserId, toUserId } = req.body;
		const data = await Message.find({ fromUserId, toUserId });
		// console.log(data);
		res.send({ message: data });
	} catch (error) {
		console.log(error);
		res.send("nope");
	}
};

// Post message

module.exports.postMessage = async (req, res) => {
	try {
		const { fromUserId, toUserId, message } = req.body;
		const data = new Message({
			fromUserId,
			toUserId,
			message,
		});

		await data.save();

		res.send({ message: "Message was saved into the dtabase" });
	} catch (error) {
		console.log(error);
		res.send({ message: "error" });
	}
};
