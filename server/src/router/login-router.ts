import express from 'express';
import {loginService} from '../service/login_services';

/**
 * Express router containing task methods.
 */
const loginRouter = express.Router();

//check if user exists
loginRouter.get('/login/', (request, response) => {
    const user = request.body;
    loginService
      .getUser(user.user_name, user.password)
      .then((user) => (user ? response.send(user) : response.status(404).send('User not found')))
      .catch((error) => response.status(500).send(error));
  });

//create new user
loginRouter.post('/signup', (request, response) => {
    const data = request.body;
    if (
        typeof data.user_name == 'string' &&
        data.user_name.length != 0 &&
        typeof data.password == 'string' &&
        data.password.length != 0
    )
        loginService
        .createUser(data.user_name, data.password)
        .then((id) => response.send({ id: id}))
        .catch((error) => response.status(500).send(error));
    else response.status(400).send('Missing properties');
    });

//compare user_name and password
loginRouter.post('/login', (request, response) => {
    const data = request.body;
    if (
        typeof data.user_name == 'string' &&
        data.user_name.length != 0 &&
        typeof data.password == 'string' &&
        data.password.length != 0
    )
        loginService
        .getUser(data.user_name, data.password)
        .then((id) => response.send({ id: id}))
        .catch((error) => response.status(500).send(error));
    else response.status(400).send('Missing properties');
    });





export default loginRouter;
