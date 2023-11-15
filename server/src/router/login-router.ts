// require('dotenv').config();
import { NextFunction, Request, Response, Router } from 'express';
import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {User, userService} from "../service/user_services";


const router = express.Router();

router.get('/login/federated/google', 
passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
 passport.authenticate('google'),
function (req, res) { console.log(req.user);
  // Successful authentication, redirect home or to another page.
  res.redirect('/#/');
}
);

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
      console.log(profile);
      userService.findOrCreate({
        google_id: profile.id,
        username: profile.displayName,
        email: profile._json.email || '',
      }, cb);
      }
  )
);


  router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      return res.send({ redirect: '/' });
    });
  });
  
  export default router;
 