import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {User, userService} from "../service/user_services";


const loginRouter = express.Router();

loginRouter.get('/login/federated/google', 
passport.authenticate('google', { scope: ['profile', 'email'] }));

loginRouter.get('/auth/google/callback', 
 passport.authenticate('google'),
function (req, res) { 
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
      clientID: process.env.GOOGLE_Client_ID || '',
      clientSecret: process.env.GOOGLE_Client_Secret || '',
      callbackURL: process.env.callbackURL || '',
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

  
  export default loginRouter;
 