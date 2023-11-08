import express from 'express';
import {loginService} from '../service/login_services';

/**
 * Express router containing task methods.
 */
const loginRouter = express.Router();

//get user by user_name
loginRouter.get('/login/:user_name', (request, response) => {
  const user_name = request.params.user_name;
  loginService
    .getUser(user_name)
    .then((user) => (user ? response.send(user) : response.status(404).send('User not found')))
    .catch((error) => response.status(500).send(error));
});

//create new user




export default loginRouter;
