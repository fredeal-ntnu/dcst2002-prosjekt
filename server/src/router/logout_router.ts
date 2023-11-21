import express from 'express';


const logoutRouter = express.Router();

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
