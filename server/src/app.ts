import express from 'express';
import questionRouter from './router/question-router';
import answerRouter from './router/answer-router';
import tagRouter from './router/tag-router';
import questionRelationRouter from './router/question-relation_router';
// import loginRouter from './router/login-router';
// import loginRouter from './router/login-router';
import questionCommentRouter from './router/question-comment-router';
 import answerCommentRouter from './router/answer-comment-router';
import voteRouter from './router/vote-router';
// import session from 'express-session';
// import passport from 'passport';
// import cookieParser from 'cookie-parser';

// const cookieparser = require('cookie-parser');

/**
 * Express application.
 */
const app = express();

app.use(express.json());

// Since API is not compatible with v1, API version is increased to v2
app.use('/api/v2', questionRouter);
app.use('/api/v2', tagRouter);
app.use('/api/v2', questionRelationRouter);
// app.use('/api/v2', loginRouter);
app.use('/api/v2', answerRouter);
app.use('/api/v2', questionCommentRouter);
app.use('/api/v2', answerCommentRouter);
app.use('/api/v2', voteRouter);

//app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

const oneDay = 1000 * 60 * 60 * 24;

// app.use(
//   session({
//     secret: 'secretKeyNumberTwoFiveFour',
//     saveUninitialized: true,
//     cookie: {
//       maxAge: oneDay,
//       httpOnly: true,
//       sameSite: true,
//     },
//     resave: false,
//   }),
// );

// app.use(passport.authenticate('session'));

export default app;
