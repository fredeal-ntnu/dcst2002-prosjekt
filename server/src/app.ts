import express from 'express';
import questionRouter from './router/question_router';
import answerRouter from './router/answer_router';
import tagRouter from './router/tag_router';
import questionRelationRouter from './router/question-relation_router';
import loginRouter from './router/login_router';
import questionCommentRouter from './router/question-comment_router';
import answerCommentRouter from './router/answer-comment_router';
import favouriteRouter from './router/favourite_router';
import userRouter from './router/user_router';
import voteRouter from './router/vote_router';
import logoutRouter from './router/logout_router';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';

const cookieparser = require('cookie-parser');

//  Express application.

const app = express();

app.use(express.json());

const oneDay = 1000 * 60 * 60 * 24;

app.use(
  session({
    secret: 'secretKeyNumberTwoFiveFour',
    saveUninitialized: true,
    cookie: {
      maxAge: oneDay,
      httpOnly: true,
      sameSite: true,
    },
    resave: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.authenticate('session'));

// Since API is not compatible with v1, API version is increased to v2
app.use('/api/v2', questionRouter);
app.use('/api/v2', tagRouter);
app.use('/api/v2', questionRelationRouter);
app.use('/api/v1', loginRouter);
app.use('/api/v2', logoutRouter);
app.use('/api/v2', answerRouter);
app.use('/api/v2', questionCommentRouter);
app.use('/api/v2', answerCommentRouter);
app.use('/api/v2', favouriteRouter);
app.use('/api/v2', userRouter);
app.use('/api/v2', voteRouter);

export default app;
