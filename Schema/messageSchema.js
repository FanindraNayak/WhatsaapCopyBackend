const mongoose = require("mongoose");

const d = new Date();

const messageSchema = new mongoose.Schema({
	fromUserId: {
		type: String,
		required: true,
	},
	toUserId: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	createdAt: {
		type: String,
		default: d.toLocaleString(),
	},
	updatedAt: {
		type: String,
		default: d.toLocaleString(),
	},
});

const Message = mongoose.model("message", messageSchema);

module.exports = Message;
