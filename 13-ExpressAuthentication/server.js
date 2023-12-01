//ID de proyecto: expressauthentication-405817
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
require('./auth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const mongoUrl = `mongodb+srv://${user}:${password}@cluster0.6iz2suz.mongodb.net/authentication?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Definition of a schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});
userSchema.set("strictQuery", true);

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.get("/secret", isLoggedIn, (req, res) => {
  res.sendFile(__dirname + "/public/html/secret.html");
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get( '/auth/google/secrets',
  passport.authenticate( 'google', {
    successRedirect: '/secret',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      // Handle error appropriately, such as sending an error message to the client
    } else {
      req.session.destroy();
      res.redirect("/");
    }
  });
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
