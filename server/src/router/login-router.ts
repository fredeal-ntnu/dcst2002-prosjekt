require("dotenv").config();
import express, { response } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
//import userService, { User } from "./../services/user-service";
const router = express.Router();




const GoogleStrategy = require('passport-google-oauth20').OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.ClientID
const GOOGLE_CLIENT_SECRET = process.env.ClientSecret;
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });
/**
 * Express router containing task methods.
 */
const loginRouter = express.Router();

export default loginRouter;
