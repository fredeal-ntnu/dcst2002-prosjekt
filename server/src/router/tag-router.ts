import express from 'express';
import { tagService } from '../service/tag_services';

/**
 * Express router containing task methods.
 */
const tagRouter = express.Router();

//Get tag
tagRouter.get('/tags/:id', (request, response) => {
  const id = Number(request.params.id);
  tagService
    .getTag(id)
    .then((tag) => (tag ? response.send(tag) : response.status(404).send('Tag not found')))
    .catch((error) => response.status(500).send(error));
});

//Get all tags

tagRouter.get('/tags', (_request, response) => {
  tagService
    .getAllTags()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

export default tagRouter;
