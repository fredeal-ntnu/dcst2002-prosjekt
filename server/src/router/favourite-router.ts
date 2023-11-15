// require('dotenv').config();
import express from "express";
import {favouriteService} from "../service/favourite_services";


const favouriteRouter = express.Router();


//Get all favourites by user id
favouriteRouter.get('/users/:id/favourites', (request, response) => {
    const id = Number(request.params.id);
    favouriteService
    .getAllFavouritesForUser(id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});


//create new favourite relation
favouriteRouter.post('/users/:id/favourites/:id', (request, response) => {
    const data = request.body;


    if (typeof data.answer_id == 'number' && typeof data.user_id == 'number')
    favouriteService
    .createFavouriteRelation(data.answer_id, data.user_id)
    .then(() => response.send())
    .catch((error) => response.status(500).send(error));
    else response.status(400).send('Missing favourite properties');
});
  
//getst a list of all favourite relations
favouriteRouter.get('/favourites', (_request, response) => {
    favouriteService
    .getAllFavouriteRelations()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//get favourite relation by question id
favouriteRouter.get('/favourites/:id', (request, response) => {
    const id = Number(request.params.id);
    favouriteService
    .getAllFavouritesByQuestionId(id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});


//delete favourite relation by question id and user id
favouriteRouter.delete('/favourites/:id', (request, response) => {
    const data = request.body;
    if (typeof data.user_id == 'number' && typeof data.question_id == 'number')
    favouriteService
    .deleteFavouriteRelation(data.user_id, data.question_id)
    .then(() => response.send())
    .catch((error) => response.status(500).send(error));
    else response.status(400).send('Missing favourite properties');
});

export default favouriteRouter;
 