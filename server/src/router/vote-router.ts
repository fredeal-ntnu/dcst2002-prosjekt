import express from 'express';
import { voteService } from '../service/vote_services';

const voteRouter = express.Router();

//Get all votes for answer

voteRouter.get('/answers/:id/votes', (request, response) => {
    const id = Number(request.params.id);
    voteService
    .getAllVotesByAnswerId(id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});


//Create vote for answer

voteRouter.post('/:id/votes', (request, response) => {
    const data = request.body;
    if (typeof data.user_id == 'number' && typeof data.answer_id == 'number' && typeof data.vote_type == 'boolean')
    voteService
    .createVoteForAnswer(data.user_id, data.answer_id, data.vote_type)
    .then((id) => response.send({ id: id }))
    .catch((error) => response.status(500).send(error));
    else response.status(400).send('Missing vote properties');
});



export default voteRouter;
