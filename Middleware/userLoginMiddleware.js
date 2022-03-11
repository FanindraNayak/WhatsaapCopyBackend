const jwt = require("jsonwebtoken");

const userToken = (req, res, next) => {
	let token = req.cookies.user;
	if (token) {
		jwt.verify(token, "secretPassword", (error, decode) => {
			if (error) {
				console.log(error);
				res.send({ message: "Invalid Token" });
			} else {
				req.name = decode.name;
				req.email = decode.email;
				req.userId = decode.userId;
				next();
			}
		});
	} else {
		res.send({ message: "Access Denied" });
	}
};

module.exports = { userToken };
