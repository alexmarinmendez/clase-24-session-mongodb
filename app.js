const express = require('express');
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
app.set("port", 8080);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(app.get("port"), () => console.log("Server up"));