import express from 'express';
import questionRouter from './router/question-router';
import tagRouter from './router/tag-router';
import questionRelationRouter from './router/question-relation_router';
import loginRouter from './router/login-router';


/**
 * Express application.
 */
const app = express();

app.use(express.json());

// Since API is not compatible with v1, API version is increased to v2
app.use('/api/v2', questionRouter);
app.use('/api/v2', tagRouter);
app.use('/api/v2', questionRelationRouter);
app.use('/api/v2', loginRouter);

export default app;
