import {Router} from 'express';
import passport from 'passport';
import { User , userService} from '../service/user_services';
import { questionService } from '../service/question_services';

const userRouter = Router();


// tror denne kan fjernes, fordi akkurat den samme finnes i question-router
userRouter.get('/user/:id/questions', (request, response) => {
    const user_id = Number(request.params.id);
    questionService
      .getQuestionsByUserId(user_id)
      .then((question) => question ? response.send(question) : response.status(404).send('Question not found'))
      .catch((error) => response.status(500).send(error))
});



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