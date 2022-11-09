const express = require('express');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const User = require('./models/User')

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

app.route('/login').get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + '/public/login.html')
})

app.route('/signup').get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + '/public/signup.html')
}).post((req, res) => {
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    user.save((err, docs) => {
        if (err) {
            res.redirect('/signup')
        } else {
            req.session.user = docs
            res.redirect('/dashboard')
        }
    })
})