import {Router} from 'express';
import passport from 'passport';
import { User , userService} from '../service/user_services';
import { questionService } from '../service/question_services';

const userRouter = Router();

//Get logged in user:

userRouter.get('/user/me', passport.authenticate("session", {session: true}), (request, response) => {
  try {
    const user: User = request.user as User;
    if (!user) {
      response.status(404).send('User not found');
    } else {
      response.send(user);
    }
  } catch (error) {
    response.status(500).send(error);
  }
});



export default userRouter;