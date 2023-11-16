import express from 'express';
import { voteService } from '../service/vote_services';

const voteRouter = express.Router();

//Get all votes for answer

voteRouter.post('/vote/', (request, response) => {
    const data = request.body;
    console.log(data)
    if (typeof data.user_id == 'number' && typeof data.answer_id == 'number' && typeof data.vote_type == 'number')
    voteService
    .createVote(data.user_id, data.answer_id, data.vote_type)
    .then(() => response.send())
    .catch((error) => response.status(500).send(error));
    else response.status(400).send('Missing vote properties');
});




voteRouter.get('/answers/:id/votes', (request, response) => {
    const id = Number(request.params.id);
    voteService
    .getAllVotesByAnswerId(id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});


//Create vote 




export default voteRouter;
