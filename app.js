const express = require('express');
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
app.set("port", 8080);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'c0d3r',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}))

const sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard')
    } else {
        next()
    }
}

app.listen(app.get("port"), () => console.log("Server up"));

app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login')
})