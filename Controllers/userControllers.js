const User = require("../Schema/userSchema");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports.getAllUser = async (req, res) => {
	try {
		const data = await User.find(
			{},
			{ name: 1, email: 1, createdAt: 1, updatedAt: 1 }
		);
		res.send({ data: data });
	} catch (error) {
		console.log(error);
		res.send(error);
	}
};

// if user is logged in or not in the begning
module.exports.checkIfUserLoggedIn = async (req, res) => {
	try {
		// console.log(req);
		const { email, userId, name } = req;

		res.send({ message: "LoggedIn", email: email, Id: userId, name: name });
	} catch (error) {
		console.log(error);
		res.send("error");
	}
};

module.exports.registerUser = async (req, res) => {
	try {
		const { name, email, password, cPassword } = req.body;

		const hashedPassword = await bcrypt.hash(password, 10);
		const hashedCPassword = await bcrypt.hash(cPassword, 10);

		const data = new User({
			name,
			email,
			password: hashedPassword,
			cPassword: hashedCPassword,
		});

		const checkingEmail = await User.find({ email: email });

		if (checkingEmail.length === 0) {
			await data.save();
			res.send({ message: "user created" });
		} else res.send({ message: "user exist" });
	} catch (error) {
		console.log(error);
		res.send("error");
	}
};

module.exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password || password.length < 2) {
			res.status(400).send({ message: "Check All the entry" });
		} else {
			const data = await User.findOne({ email: email });
			// MOngodb UserId
			const UserIdFromMongoDb = data._id.toString();

			const userLoggedInChecking = await bcrypt.compare(
				password,
				data.password
			);

			if (userLoggedInChecking) {
				const jasonWebToken = jwt.sign(
					{
						name: data.name,
						userId: UserIdFromMongoDb,
						email: data.email,
					},
					"secretPassword",
					{ expiresIn: "5hr" }
				);

				res.cookie("user", jasonWebToken, {
					maxAge: 2 * 60 * 60 * 1000,
					httpOnly: true,
					secure: false,
					// SameSite: "none",
				});
				res.send({ message: "user Logged In" });
			} else res.send({ message: "Error" });
		}
	} catch (error) {
		console.log(error);
		res.send("error");
	}
};
