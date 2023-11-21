import axios from 'axios';
import pool from '../../src/mysql-pool';
import app from '../../src/app';
import { questionService, Question_Content } from '../../src/service/question_services';
import { questionRelationService } from '../../src/service/question-relation_service';

const testQuestions: Question_Content[] = [
  {
    question_id: 1,
    title: 'Test1',
    text: 'Dette er test 1',
    view_count: 0,
    has_answer: false,
    user_id: 1,
  },
  {
    question_id: 2,
    title: 'Test2',
    text: 'Dette er test 2',
    view_count: 0,
    has_answer: false,
    user_id: 2,
  },
  {
    question_id: 3,
    title: 'Test3',
    text: 'Dette er test 3',
    view_count: 0,
    has_answer: false,
    user_id: 1,
  },
];

const testQuestionRelations = [
  { tag_id: 1, question_id: 1 },
  { tag_id: 2, question_id: 1 },
  { tag_id: 3, question_id: 2 },
  { tag_id: 3, question_id: 3 },
  { tag_id: 1, question_id: 3 },
];

axios.defaults.baseURL = 'http://localhost:3001/api/v2';

let webServer: any;
beforeAll((done) => {
  webServer = app.listen(3001, () => done());
});

beforeEach((done) => {
  // Delete all questions, and reset id auto-increment start value
  pool.query('TRUNCATE TABLE Questions', (error) => {
    if (error) return done.fail(error);
    questionService
      .createQuestion(testQuestions[0].title, testQuestions[0].text, testQuestions[0].user_id)
      .then(() =>
        questionService.createQuestion(
          testQuestions[1].title,
          testQuestions[1].text,
          testQuestions[1].user_id,
        ),
      )
      .then(() =>
        questionService.createQuestion(
          testQuestions[2].title,
          testQuestions[2].text,
          testQuestions[2].user_id,
        ),
      )
      .then(() => createAllQuestionRelations());
  });

  function createAllQuestionRelations() {
    pool.query('TRUNCATE TABLE Tag_question_relation', (error) => {
      if (error) return done.fail(error);
      questionRelationService
        .createTagQuestionRelation(
          testQuestionRelations[0].tag_id,
          testQuestionRelations[0].question_id,
        )
        .then(() =>
          questionRelationService.createTagQuestionRelation(
            testQuestionRelations[1].tag_id,
            testQuestionRelations[1].question_id,
          ),
        )
        .then(() =>
          questionRelationService.createTagQuestionRelation(
            testQuestionRelations[2].tag_id,
            testQuestionRelations[2].question_id,
          ),
        )
        .then(() =>
          questionRelationService.createTagQuestionRelation(
            testQuestionRelations[3].tag_id,
            testQuestionRelations[3].question_id,
          ),
        )
        .then(() =>
          questionRelationService.createTagQuestionRelation(
            testQuestionRelations[4].tag_id,
            testQuestionRelations[4].question_id,
          ),
        )
        .then(() => done());
    });
  }
});

afterAll((done) => {
  if (!webServer) return done.fail(new Error());
  webServer.close(() => pool.end(() => done()));
});

describe('Question Routes - Successful Requests (Code 200/201)', () => {
  test('GET /user/:userId/questions - Retrieve questions by user ID', (done) => {
    const userId = 1;
    axios
      .get(`/user/${userId}/questions`)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(
          testQuestions.filter((question) => question.user_id === userId),
        );
        done();
      })
      .catch((error) => done(error));
  });

  test('GET /answers/:answerId/question - Retrieve question by answer ID', (done) => {
    const answerId = 20;
    axios
      .get(`/answer/${answerId}/question`)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      })
      .catch((error) => done(error));
  });

  test('GET /questions - Retrieve all questions', (done) => {
    axios
      .get('/questions')
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(testQuestions);
        done();
      })
      .catch((error) => done(error));
  });

  test('GET /questions/:questionId - Retrieve question by ID', (done) => {
    axios
      .get('/questions/2')
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(testQuestions[1]);
        done();
      })
      .catch((error) => done(error));
  });

  test('GET /topfivequestions - Retrieve top five questions', (done) => {
    axios
      .get('/topfivequestions')
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(testQuestions);
        done();
      })
      .catch((error) => done(error));
  });

  test('GET /user/:userId/topfivequestions - Retrieve top five questions for user', (done) => {
    const userId = 1;
    axios.get(`/user/${userId}/topfivequestions`).then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(
        testQuestions.filter((question) => question.user_id === userId),
      );
      done();
    });
  });

  test('GET /unansweredquestions - Retrieve unanswered questions', (done) => {
    axios.get('/unansweredquestions').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testQuestions);
      done();
    });
  });

  test('GET /user/:userId/unansweredquestions - Retrieve unanswered questions for user', (done) => {
    const userId = 1;
    axios.get(`/user/${userId}/unansweredquestions`).then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(
        testQuestions.filter((question) => question.user_id === userId),
      );
      done();
    });
  });

  test('DELETE /questions/:questionId - Delete a question', (done) => {
    const questionIdToDelete = 2;
    axios
      .delete(`/questions/${questionIdToDelete}`)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      })
      .catch((error) => done(error));
  });

  test('PUT /questions - Update a question', (done) => {
    const updatedQuestion = {
      question_id: 1,
      title: 'Updated Question Title',
      text: 'Updated question text content',
      view_count: 10,
      has_answer: true,
      user_id: 1,
    };
    axios
      .put('/questions', updatedQuestion)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      })
      .catch((error) => done(error));
  });

  test('GET /questions/:questionId/tag - Retrieve all tags by question ID', (done) => {
    const questionId = 1;
    axios.get(`/questions/${questionId}/tag`).then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(
        testQuestionRelations.filter((relation) => relation.question_id === questionId),
      );
      done();
    });
  });

  test('POST /questiontagrelation - Create a new question tag relation', (done) => {
    const newQuestionTagRelation = {
      tag_id: 1,
      question_id: 2,
    };
    axios.post(`/questiontagrelation`, newQuestionTagRelation).then((response) => {
      expect(response.status).toEqual(201);
      done();
    });
  });

  test('GET /questiontagrelations - Retrieve all question tag relations', (done) => {
    axios.get(`/questiontagrelations`).then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });

  test('GET /tag/:tagId/questions - Retrieve all questions by tag ID', (done) => {
    const tagId = 1;
    axios.get(`/tag/${tagId}/questions`).then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(
        testQuestionRelations.filter((relation) => relation.tag_id === tagId),
      );
      done();
    });
  });

  describe('Question Routes - Error Handling (Code 500/400)', () => {
    test('GET /questions/:questionId - Retrieve question that does not exist', (done) => {
      axios.get('/questions/4').catch((error) => {
        expect(error.response.status).toEqual(500);
        done();
      });
    });

    test('GET /user/:userId/questions - Retrieve questions by user ID that does not exist', (done) => {
      const userId = 4;
      axios.get(`/user/${userId}/questions`).catch((error) => {
        expect(error.response.status).toEqual(500);
        done();
      });
    });
  });

  describe('POST /questions', () => {
    test('POST /questions - Fail to create a new question with invalid data', (done) => {
      const invalidQuestion = {
        title: '',
        text: '',
      };
      axios.post('/questions', invalidQuestion).catch((error) => {
        expect(error.response.status).toEqual(400);
        done();
      });
    });

    test('POST /questions - Fail to create a new question with an invalid user ID', (done) => {
      const invalidQuestion = {
        title: 'New Question Title',
        text: 'New question text content',
        user_id: 9999,
      };
      axios.post('/questions', invalidQuestion).catch((error) => {
        expect(error.response.status).toEqual(500);
        done();
      });
    });
  });

  test('DELETE /questions/:questionId - Fail to delete a non-existing question', (done) => {
    const nonExistingQuestionId = 9999;
    axios.delete(`/questions/${nonExistingQuestionId}`).catch((error) => {
      expect(error.response.status).toEqual(400);
      expect(error.response.data).toEqual('Question does not exist');
      done();
    });
  });

  test('PUT /questions - Fail to update a question with invalid data', (done) => {
    const invalidQuestionUpdate = {
      question_id: 1,
      title: '',
      text: '',
    };
    axios.put('/questions', invalidQuestionUpdate).catch((error) => {
      expect(error.response.status).toEqual(400);
      done();
    });
  });

  test('GET /questions/:questionId/tag - Fail to retrieve all tags by a non-existing question ID', (done) => {
    const questionId = 9999;
    axios.get(`/questions/${questionId}/tag`).catch((error) => {
      expect(error.response.status).toEqual(500);
      expect(error.response.data).toEqual('Question does not exist');
      done();
    });
  });

  test('POST /questiontagrelation - Fail to create a new question tag relation with invalid data', (done) => {
    const invalidQuestionTagRelation = { question_id: 1 };
    axios.post(`/questiontagrelation`, invalidQuestionTagRelation).catch((error) => {
      expect(error.response.status).toEqual(400);
      expect(error.response.data).toEqual('Missing properties');
      done();
    });
  });
});
