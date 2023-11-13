require("dotenv").config();
import express, { response } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
//import userService, { User } from "./../services/user-service";
const router = express.Router();




router.get(
  '/login/federated/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

/**
 * Express router containing task methods.
 */
const loginRouter = express.Router();

export default loginRouter;
