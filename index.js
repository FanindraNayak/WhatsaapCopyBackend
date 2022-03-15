const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// MongoDB Database

require("./DB/connection");

// Base one

app.get("/", (req, res) => {
	res.send("Yee");
});

// UserRoutes

app.use("/user", require("./Routes/userRoutes"));
app.use("/message", require("./Routes/messageRoutes"));

app.listen(8080, () => console.log("Listining"));
