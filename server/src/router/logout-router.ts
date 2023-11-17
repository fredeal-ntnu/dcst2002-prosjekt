// require('dotenv').config();
import { NextFunction, Request, Response, Router } from 'express';
import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {User, userService} from "../service/user_services";


const logoutRouter = express.Router();


passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user: User, cb) {
  cb(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: '847026350985-ski1ogfb6klvrfjfrjqkhiapg02219js.apps.googleusercontent.com',
      clientSecret:  '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',
      callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      userService.findOrCreate({
        google_id: profile.id,
        username: profile.displayName,
        email: profile._json.email || '',
      }, cb);
      }
  )
);


  logoutRouter.post('/logout', function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      req.session.destroy((err) => {
        if (err) {
            return next(err);
        }
        res.clearCookie('connect.sid');
        res.redirect('/#/');
    });
    });
    });

  
  export default logoutRouter;
 