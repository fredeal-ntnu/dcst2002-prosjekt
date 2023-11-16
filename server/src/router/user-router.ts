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
  
    const user:User = request.user as User;
    response.send(user);
  });

  //get all questions by user id



export default userRouter;