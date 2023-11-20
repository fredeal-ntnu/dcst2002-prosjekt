import axios from 'axios';
import pool from '../../src/mysql-pool'; 
import app from '../../src/app';
import { questionService, Question_Content } from '../../src/service/question_services';
import { questionRelationService } from '../../src/service/question-relation_service';

const testQuestions: Question_Content[] = [
    {question_id: 1, title: 'Test1', text: 'Dette er test 1', view_count: 0, has_answer: false, user_id: 1},
    {question_id: 2, title: 'Test2', text: 'Dette er test 2', view_count: 0, has_answer: false, user_id: 2},
    {question_id: 3, title: 'Test3', text: 'Dette er test 3', view_count: 0, has_answer: false, user_id: 1},
];

const testQuestionRelations = [
  { tag_id: 1, question_id: 1 },
  { tag_id: 2, question_id: 1 },
  { tag_id: 3, question_id: 2 },
  { tag_id: 3, question_id: 3 },
  { tag_id: 1, question_id: 3 }
]

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
      .then(() => questionService.createQuestion(testQuestions[1].title, testQuestions[1].text, testQuestions[1].user_id)) 
      .then(() => questionService.createQuestion(testQuestions[2].title, testQuestions[2].text, testQuestions[2].user_id))
      .then(() => createAllQuestionRelations())
  });

  function createAllQuestionRelations(){
    pool.query('TRUNCATE TABLE Tag_question_relation', (error) => {
      if (error) return done.fail(error);
      questionRelationService
      .createTagQuestionRelation(testQuestionRelations[0].tag_id, testQuestionRelations[0].question_id)
      .then(() => questionRelationService.createTagQuestionRelation(testQuestionRelations[1].tag_id, testQuestionRelations[1].question_id)) 
      .then(() => questionRelationService.createTagQuestionRelation(testQuestionRelations[2].tag_id, testQuestionRelations[2].question_id))
      .then(() => questionRelationService.createTagQuestionRelation(testQuestionRelations[3].tag_id, testQuestionRelations[3].question_id))
      .then(() => questionRelationService.createTagQuestionRelation(testQuestionRelations[4].tag_id, testQuestionRelations[4].question_id))
      .then(() => done());
  });
}


  });

  // Stop web server and close connection to MySQL server
afterAll((done) => {
    if (!webServer) return done.fail(new Error());
    webServer.close(() => pool.end(() => done()));
  });


  describe('Fetch questions (GET)', () => {
    // Test fetching questions by user ID
    test('Fetch questions by user ID (200 OK)', (done) => {
      const userId = 1; 
      axios.get(`/user/${userId}/questions`)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.data).toEqual(testQuestions.filter((question) => question.user_id === userId));
          done();
        })
        .catch((error) => done(error));
    });

    // Test fetching question by an answer id
    test('Fetch question by answer id (200 OK)', (done) => {
      const answerId = 20; 
      axios.get(`/answer/${answerId}/question`)
        .then((response) => {
          expect(response.status).toEqual(200);
          done();
        })
        .catch((error) => done(error));
    });
  
    // Test fetching all questions
    test('Fetch all questions (200 OK)', (done) => {
      axios.get('/questions')
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.data).toEqual(testQuestions);
          done();
        })
        .catch((error) => done(error));
    });
  
    // Test fetching a single question by ID
    test('Fetch question by ID (200 OK)', (done) => {
      axios.get('/questions/2')
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.data).toEqual(testQuestions[1]);
          done();
        })
        .catch((error) => done(error));
    });
  
    // Test fetching the top five questions
    test('Fetch top five questions (200 OK)', (done) => {
      axios.get('/topfivequestions')
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.data).toEqual(testQuestions);
          done();
        })
        .catch((error) => done(error));
    });

    //Test fetching top five questions for user
    test('Fetch top five questions for user (200 OK)', (done) => {
      const userId = 1; 
      axios.get(`/user/${userId}/topfivequestions`)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.data).toEqual(testQuestions.filter((question) => question.user_id === userId));
          done();
        })
    });
  
    // Test fetching unanswered questions
    test('Fetch unanswered questions (200 OK)', (done) => {
      axios.get('/unansweredquestions')
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.data).toEqual(testQuestions);
          done();
        })
    });

    //Test fetching unanswered questions for user
    test('Fetch unanswered questions for user (200 OK)', (done) => {
      const userId = 1; 
      axios.get(`/user/${userId}/unansweredquestions`)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.data).toEqual(testQuestions.filter((question) => question.user_id === userId));
          done();
        })
    });


    test('Fetch question that does not exist', (done) => {
        axios.get('/questions/4').catch((error) => {
          expect(error.response.status).toEqual(500);
          done();
        });
      });

    test('Fetch questions by user ID that does not exist', (done) => {
        const userId = 4; 
        axios.get(`/user/${userId}/questions`)
          .catch((error) => {
            expect(error.response.status).toEqual(500);
            done();
          });
      });

  });
  
  describe('POST /questions', () => {
    test.skip('Create new question (201 Created)', (done) => {
      const newQuestion = {
        title: 'New Question Title',
        text: 'New question text content',
        user_id: 1 
      };
      
      axios.post('/questions', newQuestion)
        .then((response) => {
          expect(response.status).toEqual(201);
          expect(response.data).toHaveProperty('id');
          done();
        })
    });
  
    test('Fail to create a new question with invalid data (400 Bad Request)', (done) => {
      const invalidQuestion = {
        title: '', // Invalid title
        text: '', // Invalid text
      };
      axios.post('/questions', invalidQuestion)
        .catch((error) => {
          expect(error.response.status).toEqual(400);
          done();
        });
    });

    test('Fail to create a new question with invalid user id (400 Bad Request)', (done) => {
      const invalidQuestion = {
        title: 'New Question Title',
        text: 'New question text content',
        user_id: 9999 // Invalid user id
      };
      axios.post('/questions', invalidQuestion)
        .catch((error) => {
          expect(error.response.status).toEqual(500);
          done();
        });
    });
  });
  
  describe('DELETE /questions/:id', () => {
    test('Delete a question (200 OK)', (done) => {
      const questionIdToDelete = 2; // Assuming this question exists and can be deleted
      axios.delete(`/questions/${questionIdToDelete}`)
        .then((response) => {
          expect(response.status).toEqual(200);
          done();
        })
        .catch((error) => done(error));
    });
  
    test('Fail to delete a non-existing question (400 Not Found)', (done) => {
      const nonExistingQuestionId = 9999; // Assuming this question does not exist
      axios.delete(`/questions/${nonExistingQuestionId}`)
        .catch((error) => {
          expect(error.response.status).toEqual(400);
          expect(error.response.data).toEqual('Question does not exist');
          done();
        });
    });
  });
  
  describe('PUT /questions', () => {
    test('Update a question (200 OK)', (done) => {
      const updatedQuestion = {
        question_id: 1, // Assuming this question exists
        title: 'Updated Question Title',
        text: 'Updated question text content',
        view_count: 10,
        has_answer: true,
        user_id: 1 // Assuming the user is authorized to update this question
      };
      axios.put('/questions', updatedQuestion)
        .then((response) => {
          expect(response.status).toEqual(200);
          done();
        })
        .catch((error) => done(error));
    });
  
    test('Fail to update a question with invalid data (400 Bad Request)', (done) => {
      const invalidQuestionUpdate = {
        question_id: 1, // Assuming this question exists
        title: '', // Invalid title
        text: '', // Invalid text
      };
      axios.put('/questions', invalidQuestionUpdate)
        .catch((error) => {
          expect(error.response.status).toEqual(400);
          done();
        });
    });
  });
  
  describe('Question tag relations', () => {
    // Test fetching all tags by question id
    test('GET (200) /questions/:id/tag', (done) => {
      const questionId = 1; // Assuming this question exists
      axios.get(`/questions/${questionId}/tag`)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.data).toEqual(testQuestionRelations.filter((relation) => relation.question_id === questionId));
          done();
        })
    });

    // Fail to fetch all tags by question id that does not exist (500 Bad Request)
    test('GET (500) /questions/:id/tag', (done) => {
      const questionId = 9999; // Assuming this question does not exist
      axios.get(`/questions/${questionId}/tag`)
        .catch((error) => {
          expect(error.response.status).toEqual(500);
          expect(error.response.data).toEqual('Question does not exist');
          done();
        });
    });

    // Test creating a new question tag relation
    test('POST /questiontagrelation', (done) => {
      // Assuming axios is already configured with the base URL of the API
      const newQuestionTagRelation = {
        tag_id: 1,
        question_id: 2
      };
    
      axios.post(`/questiontagrelation`, newQuestionTagRelation) // Make sure the endpoint starts with `/`
        .then((response) => {
          expect(response.status).toEqual(201); 
          done();
        })
    });
    

    // Fail to create a new question tag relation with invalid data (400 Bad Request)
    test('POST (400) /questiontagrelation', (done) => {
      const invalidQuestionTagRelation = {question_id: 1}; // Missing required properties
      axios.post(`/questiontagrelation`, invalidQuestionTagRelation) // Corrected endpoint
        .catch((error) => {
          expect(error.response.status).toEqual(400);
          expect(error.response.data).toEqual('Missing properties');
          done();
        });
    });
    

    // Test fetching all question tag relations
    test('GET (200) /questions/:id', (done) => {
      axios.get(`/questiontagrelations`)
        .then((response) => {
          expect(response.status).toEqual(200);
          done();
        })
    });

    // Test fetching all questions by tag id
    test('GET (200) /tag/:id/questions', (done) => {
      const tagId = 1;
      axios.get(`/tag/${tagId}/questions`)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.data).toEqual(testQuestionRelations.filter((relation) => relation.tag_id === tagId));
          done();
        })
    });
  });

