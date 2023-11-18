// require('dotenv').config();
import express from "express";
import {favouriteService} from "../service/favourite_services";


const favouriteRouter = express.Router();


//Creates or deletes if it exists a favourite relation
favouriteRouter.post('/users/:id/favourites/:id', (request, response) => {
    const data = request.body;
    if (typeof data.answer_id == 'number' && typeof data.user_id == 'number')
    favouriteService
    .handleFavouriteRelation(data.answer_id, data.user_id)
    .then(() => response.send())
    .catch((error) => response.status(500).send(error));
    else response.status(400).send('Missing favourite properties');
});
  

//get favourite relation by answer id
favouriteRouter.get('/favourites/:id', (request, response) => {
    const id = Number(request.params.id);
    favouriteService
    .getAllFavouritesByAnswerId(id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

export default favouriteRouter;
 