const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

const d = new Date();

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	cPassword: {
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

const User = mongoose.model("user", userSchema);

module.exports = User;
