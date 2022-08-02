const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const path = require("path")

if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: "backend/config/config.env" });

}

app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Importing routes
const post = require("./routes/post");
const user = require("./routes/user");

app.use("/api/v1", post);
app.use("/api/v1", user);

app.use(express.static(path.join(__dirname, "../frontend/build")))

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
})

module.exports = app;