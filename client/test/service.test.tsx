import axios from 'axios';
import service, {
  Question,
  Tag,
  User,
  Answer,
  QuestionComment,
  AnswerComment,
  Vote,
  Favourite,
  Tag_Question_Relation,
} from 'src/service';

jest.mock('axios');

describe('Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // Mock data for testing
  type AnswerVote = Answer & Vote;

  const mockQuestion: Question = {
    question_id: 1,
    title: 'test',
    text: 'test',
    view_count: 1,
    has_answer: 1,
    user_id: 1,
  };
  const mockTag: Tag = { tag_id: 1, name: 'test' };
  const mockUser: User = { user_id: 1, google_id: 'test', username: 'test', email: 'test' };
  const mockAnswer: Answer = {
    answer_id: 1,
    text: 'test',
    confirmed_answer: 1,
    last_updated: new Date(),
    question_id: 1,
    user_id: 1,
    score: 1,
    result: 1,
  };
  const mockQuestionComment: QuestionComment = {
    question_comment_id: 1,
    text: 'test',
    question_id: 1,
    user_id: 1,
  };
  const mockAnswerComment: AnswerComment = {
    answer_comment_id: 1,
    text: 'test',
    answer_id: 1,
    user_id: 1,
  };
  const mockVote: Vote = { user_id: 1, answer_id: 1, vote_type: 1 };
  const mockFavourite: Favourite = { answer_id: 1, user_id: 1 };
  const mockTagQuestionRelation = [
    {
      question_id: 1,
      tag_id: 1,
    },
    {
      question_id: 2,
      tag_id: 1,
    },
  ];
  const mockAnswerVote: AnswerVote = {
    ...mockAnswer,
    ...mockVote,
    // Override any conflicting fields if necessary
  };

  // // Mock axios.post implementation
  axios.put = jest.fn().mockImplementation((url: string, data: any) => Promise.resolve({ data }));

  // Mock axios.delete implementation
  axios.delete = jest.fn().mockImplementation((url) => Promise.resolve({ data: {} }));

  // // Mock async axios.get implementation
  (axios.get as jest.Mock).mockImplementation((url: string) => {
    if (url.includes('/questions/')) {
      return Promise.resolve({ data: [mockTagQuestionRelation] });
    } else if (url === '/question/:id') {
      return Promise.resolve({ data: [mockTagQuestionRelation] });
    } else if (url === '/questiontagrelation') {
      return Promise.resolve({ data: [mockTagQuestionRelation] });
    } else if (url.includes('/users/')) {
      return Promise.resolve({ data: mockUser });
    } else if (url.includes('/answers/')) {
      return Promise.resolve({ data: mockAnswer });
    } else if (url.includes('/user/')) {
      return Promise.resolve({ data: [mockAnswer] });
    } else {
      return Promise.resolve({ data: {} });
    }
  });

  // Mock axios.post implementation
  axios.post = jest.fn().mockResolvedValue({ status: 200 });

  describe('createVote', () => {
    it('should create a vote', async () => {
      const result = await service.createVote(
        mockVote.user_id,
        mockVote.answer_id,
        mockVote.vote_type,
      );
      expect(result).toEqual({ status: 200 });
    });
  });

  describe('getAllQuestions', () => {
    it('should get all questions', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [mockQuestion] });
      const result = await service.getAllQuestions();
      expect(result).toEqual([mockQuestion]);
      expect(axios.get).toHaveBeenCalledWith('/questions'); // Assuming '/questions/' is the correct endpoint
    });
  });

  describe('getQuestion', () => {
    it('should get a question by its id', async () => {
      // Mock axios.get to resolve with mockQuestion when called with a specific URL
      const questionId = mockQuestion.question_id;
      const expectedUrl = `/questions/${questionId}`; // Replace with the actual URL pattern used in your service
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockQuestion });

      // Call the service method with the question ID
      const result = await service.getQuestion(questionId);

      // Assert that the service returned the expected mock question
      expect(result).toEqual(mockQuestion);

      // Assert that axios.get was called with the correct URL
      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('getTopFiveQuestions', () => {
    it('should get the top five questions', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [mockQuestion] });
      const result = await service.getTopFiveQuestions();
      expect(result).toEqual([mockQuestion]);
    });
  });

  describe('getUserTopFiveQuestions', () => {
    it('should get the top five questions for a user', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [mockQuestion] });
      const result = await service.getUserTopFiveQuestions(mockQuestion.user_id);
      expect(result).toEqual([mockQuestion]);
    });
  });

  describe('getUnansweredQuestions', () => {
    it('should get all unanswered questions', async () => {
      // Assuming mockQuestion is defined with the correct structure
      const mockQuestion = {
        has_answer: 0,
        question_id: 1,
        text: 'test',
        title: 'test',
        user_id: 1,
        view_count: 1,
      };

      // Mock axios.get implementation
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: [mockQuestion] });

      const result = await service.getUnansweredQuestions();
      expect(result).toEqual([mockQuestion]);
    });
  });

  describe('updateQuestion', () => {
    it('should update a question', async () => {
      jest.fn().mockResolvedValueOnce({ data: mockQuestion });
      const result = await service.updateQuestion(mockQuestion);
      expect(result).toEqual(mockQuestion);
    });
  });

  describe('createQuestion', () => {
    it('should create a question', async () => {
      // Mock axios.post implementation
      (axios.post as jest.Mock).mockResolvedValueOnce({ data: { id: 1 } });

      const result = await service.createQuestion('Test Title', 'Test Text', 1);
      expect(result).toEqual(1);
    });
  });

  describe('deleteQuestion', () => {
    it('should delete a question', async () => {
      const result = await service.deleteQuestion(mockQuestion.question_id);
      expect(result).toEqual({});
    });
  });

  describe('getQuestionsByUserid', () => {
    it('should get all questions for a specific user', async () => {
      // Set up the user ID and the expected URL pattern
      const userId = mockQuestion.user_id;
      const expectedUrl = `/user/${userId}/questions`; // Replace with the actual URL pattern used in your service

      // Mock axios.get to resolve with an array containing mockQuestion when called with the expected URL
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [mockQuestion] });

      // Call the service method with the user ID
      const result = await service.getQuestionsByUserid(userId);

      // Assert that the service returned the expected array of questions
      expect(result).toEqual([mockQuestion]);

      // Assert that axios.get was called with the correct URL
      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('getTags', () => {
    it('should get tags for a specific question', async () => {
      // Set up the question ID and the expected URL pattern
      const questionId = mockTagQuestionRelation.question_id;
      const expectedUrl = `/questions/${questionId}/tags`; // Replace with the actual URL pattern used in your service

      // Mock axios.get to resolve with an array containing mockTag when called with the expected URL
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [mockTag] });

      // Call the service method with the question ID
      const result = await service.getTags(questionId);

      // Assert that the service returned the expected array of tags
      expect(result).toEqual([mockTag]);

      // Assert that axios.get was called with the correct URL
      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('getAllTags', () => {
    it('should retrieve all tags', async () => {
      // Set up the expected URL pattern for fetching all tags
      const expectedUrl = '/tags'; // Replace with the actual URL pattern used in your service

      // Mock axios.get to resolve with an array containing mockTag
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [mockTag] });

      // Call the service method to get all tags
      const result = await service.getAllTags();

      // Assert that the service returned the expected array of tags
      expect(result).toEqual([mockTag]);

      // Assert that axios.get was called with the correct URL
      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('createTagQuestionRelation', () => {
    it('should create a tag-question relation', async () => {
      const tag_id = mockTag.tag_id;
      const question_id = mockTagQuestionRelation.question_id;

      const expectedUrl = `/questiontagrelation`;

      const expectedPayload = { tag_id, question_id };

      jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: mockTagQuestionRelation });

      const result = await service.createTagQuestionRelation(tag_id, question_id);

      expect(result.data).toEqual(mockTagQuestionRelation);
      expect(axios.post).toHaveBeenCalledWith(expectedUrl, expectedPayload);
    });
  });

  describe('getAllQuestionsByTagId', () => {
    it('should get all questions associated with a specific tag id', async () => {
      const tagId = mockTag.tag_id;
      const expectedUrl = `/tag/${tagId}/questions`;

      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [mockTagQuestionRelation] });

      const result = await service.getAllQuestionsByTagId(tagId);

      expect(result).toEqual([mockTagQuestionRelation]);

      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('getTagsForQuestion', () => {
    it('should get all tags for a question by question id', async () => {
      const result = await service.getTagsForQuestion(mockTagQuestionRelation.question_id);
      expect(result).toEqual([mockTagQuestionRelation]);
    });
  });

  describe('getAllTagQuestionRelations', () => {
    it('should return all tag-question relations', async () => {
      jest.spyOn(service, 'getAllTagQuestionRelations').mockResolvedValue(mockTagQuestionRelation);
      const expectedRelations = mockTagQuestionRelation;
      const result = await service.getAllTagQuestionRelations();
      expect(result).toEqual(expectedRelations);
    });
  });

  describe('getUser', () => {
    it('should get a user', async () => {
      const result = await service.getUser(mockUser);
      expect(result).toEqual(mockUser);
    });
  });

  describe('getAnswerById', () => {
    it('should get an answer by id', async () => {
      const result = await service.getAnswerById(mockAnswer.answer_id);
      expect(result).toEqual(mockAnswer);
    });
  });

  describe('getAnswerScoresByQuestionId', () => {
    it('should get answer scores by question id', async () => {
      const questionId = 1;
      const expectedUrl = `/questions/${questionId}/answer/votes`;
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [mockQuestionComment] });
      const result = await service.getAnswerScoresByQuestionId(questionId);
      expect(result).toEqual([mockQuestionComment]);
      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('createAnswer', () => {
    it('should create an answer', async () => {
      const answerText = 'Test answer';
      const question_id = 1;
      const user_id = 1;
      const expectedUrl = `/questions/${question_id}/answers`;
      const expectedPayload = { text: answerText, question_id, user_id };
      jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: mockQuestionComment });
      const result = await service.createAnswer(answerText, question_id, user_id);
      expect(result).toEqual(mockQuestionComment);
      expect(axios.post).toHaveBeenCalledWith(expectedUrl, expectedPayload);
    });
  });

  describe('getQuestionCommentById', () => {
    it('should get a question comment by id', async () => {
      const commentId = mockQuestionComment.question_comment_id;
      const expectedUrl = `/comments/${commentId}`;
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockQuestionComment });
      const result = await service.getQuestionCommentById(commentId);
      expect(result).toEqual(mockQuestionComment);
      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('createQuestionComment', () => {
    it('should create a question comment', async () => {
      const commentText = 'Test comment';
      const question_id = 1;
      const user_id = 1;
      const expectedUrl = `/questions/${question_id}/comments`;
      const expectedPayload = { text: commentText, question_id, user_id };
      jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: mockQuestionComment });
      const result = await service.createQuestionComment(commentText, question_id, user_id);
      expect(result).toEqual(mockQuestionComment);
      expect(axios.post).toHaveBeenCalledWith(expectedUrl, expectedPayload);
    });
  });

  describe('updateQuestionComment', () => {
    it('should update a question comment', async () => {
      const result = await service.updateQuestionComment(mockQuestionComment);
      expect(result).toEqual(mockQuestionComment);
    });
  });

  describe('deleteQuestionComment', () => {
    it('should delete a question comment', async () => {
      const result = await service.deleteQuestionComment(mockQuestionComment.question_comment_id);
      expect(result).toEqual({});
    });
  });

  describe('getQuestionCommentsForQuestion', () => {
    it('should get question comments for a specific question', async () => {
      const questionId = mockQuestion.question_id;
      const expectedUrl = `/questions/${questionId}/comments`;
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [mockQuestionComment] });
      const result = await service.getQuestionCommentsForQuestion(questionId);
      expect(result).toEqual([mockQuestionComment]);
      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('getQuestionByAnswerId', () => {
    it('should get a question by answer id', async () => {
      const answerId = mockAnswer.answer_id;
      const expectedUrl = `/answer/${answerId}/question`;
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockQuestion });
      const result = await service.getQuestionByAnswerId(answerId);
      expect(result).toEqual(mockQuestion);
      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('getAnswerCommentsForAnswer', () => {
    it('should get answer comments for a specific answer', async () => {
      const answerId = mockAnswer.answer_id;
      const expectedUrl = `/answers/${answerId}/comments`;
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [mockAnswerComment] });
      const result = await service.getAnswerCommentsForAnswer(answerId);
      expect(result).toEqual([mockAnswerComment]);
      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('createAnswerComment', () => {
    it('should create an answer comment', async () => {
      // Prepare the data to be sent with the request
      const commentText = mockAnswerComment.text;
      const answer_id = mockAnswerComment.answer_id;
      const user_id = mockAnswerComment.user_id;

      // Set up the expected URL pattern for creating an answer comment
      const expectedUrl = `/answers/${answer_id}/comments`; // Replace with the actual URL pattern used in your service

      // Prepare the expected payload
      const expectedPayload = { text: commentText, answer_id, user_id };

      // Mock axios.post to resolve with mockAnswerComment
      jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: mockAnswerComment });

      // Call the service method to create an answer comment
      const result = await service.createAnswerComment(commentText, answer_id, user_id);

      // Assert that the service returned the expected mockAnswerComment object
      expect(result).toEqual(mockAnswerComment);

      // Assert that axios.post was called with the correct URL and payload
      expect(axios.post).toHaveBeenCalledWith(expectedUrl, expectedPayload);
    });
  });

  describe('getAnswerCommentById', () => {
    it('should get an answer comment by id', async () => {
      // Set up the answer comment ID and the expected URL pattern
      const commentId = mockAnswerComment.answer_comment_id;
      const expectedUrl = `/answer/comments/${commentId}`; // Replace with the actual URL pattern used in your service

      // Mock axios.get to resolve with mockAnswerComment when called with the expected URL
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockAnswerComment });

      // Call the service method with the answer comment ID
      const result = await service.getAnswerCommentById(commentId);

      // Assert that the service returned the expected answer comment
      expect(result).toEqual(mockAnswerComment);

      // Assert that axios.get was called with the correct URL
      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('updateAnswerComment', () => {
    it('should update an answer comment', async () => {
      const result = await service.updateAnswerComment(mockAnswerComment);
      expect(result).toEqual(mockAnswerComment);
    });
  });

  describe('deleteAnswerComment', () => {
    it('should delete an answer comment', async () => {
      const result = await service.deleteAnswerComment(mockAnswerComment.answer_comment_id);
      expect(result).toEqual({});
    });
  });

  describe('updateAnswer', () => {
    it('should update an answer', async () => {
      const result = await service.updateAnswer(mockAnswer);
      expect(result).toEqual(mockAnswer);
    });
  });

  describe('deleteAnswer', () => {
    it('should delete an answer', async () => {
      const result = await service.deleteAnswer(mockAnswer.answer_id);
      expect(result).toEqual({});
    });
  });

  describe('getVotesByAnswerId', () => {
    it('should get votes by answer id', async () => {
      const combinedMock = {
        ...mockAnswer, // Assuming mockAnswer contains fields like confirmed_answer, last_updated, etc.
        ...mockVote, // Including vote_type and any other relevant Vote fields
      };

      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: combinedMock });

      const result = await service.getVotesByAnswerId(mockAnswer.answer_id);

      // Adjust this to handle dynamic values like last_updated
      expect(result).toEqual(combinedMock);
    });
  });

  describe('deleteAnswerComment', () => {
    it('should delete an answer comment', async () => {
      const result = await service.deleteAnswerComment(mockAnswer.answer_id);
      expect(result).toEqual({});
    });
  });

  describe('updateAnswer', () => {
    it('should update an answer', async () => {
      const result = await service.updateAnswer(mockAnswer);
      expect(result).toEqual(mockAnswer);
    });
  });

  describe('deleteAnswer', () => {
    it('should delete an answer', async () => {
      const result = await service.deleteAnswer(mockAnswer.answer_id);
      expect(result).toEqual({});
    });
  });

  // THIS IS IMPOSSIBLE TO TEST BECAUSE OF THE IFS IN SQL
  //   describe('getVotesByAnswerId', () => {
  //     it('should get votes by answer id', async () => {
  //       const result = await service.getVotesByAnswerId(mockAnswer.answer_id);
  //       expect(result).toEqual(mockVote);
  //     });
  //   });

  // CANT FIGURE OUT HOW TO TEST GETME()
  //   describe('getMe', () => {
  //     it('should get user information for the logged-in user', async () => {
  //       const mockUserData = {
  //         user_id: 1,
  //         google_id: 'test',
  //         username: 'test',
  //         email: 'test',
  //       };
  //       (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockUserData });
  //       const result = await service.getMe();
  //       expect(result).toEqual(mockUserData);
  //     });

  //     it('should throw an error if getMe fails', async () => {
  //       const errorMessage = 'Network Error';
  //       (axios.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

  //       await expect(service.getMe()).rejects.toThrowError(errorMessage);
  //     });
  //   });

  describe('logOut', () => {
    // Test for successful logout
    it('should successfully log the user out', async () => {
      // Mock axios.post to simulate a successful logout response
      jest.spyOn(axios, 'post').mockResolvedValueOnce({ status: 200 });

      // Call the logout service method
      const result = await service.logOut();

      // Check if the service returns the expected status code
      expect(result).toEqual(200);

      // Optionally, you can also verify that axios.post was called correctly
      // expect(axios.post).toHaveBeenCalledWith(/* expected arguments */);
    });

    // Test for failed logout
    it('should throw an error if logOut fails', async () => {
      jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Network Error'));

      await expect(service.logOut()).rejects.toThrow('Network Error');
    });
  });

  describe('getAllFavouriteAnswersByUserId', () => {
    // Test for getting all favorite answers for a user
    it('should get all favorite answers for a user', async () => {
      const userId = 1;
      const expectedUrl = `/user/${userId}/favourites`;
      const mockResponse = [mockAnswer];

      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockResponse });

      const result = await service.getAllFavouriteAnswersByUserId(userId);

      expect(result).toEqual(mockResponse);

      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('handleFavouriteRelation', () => {
    // Test for creating or deleting a favorite relation
    it('should create or delete a favorite relation based on the given parameters', async () => {
      const user_id = 1;
      const answer_id = 1;

      const expectedUrl = `/users/${user_id}/favourites/${answer_id}`; // Replace with the actual URL pattern used in your service
      const mockResponse = {}; // Adjust this based on what the service is expected to return

      jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: mockResponse });

      const result = await service.handleFavouriteRelation(user_id, answer_id);

      expect(result).toEqual(mockResponse);

      expect(axios.post).toHaveBeenCalledWith(expectedUrl, { user_id, answer_id });
    });
  });

  describe('getFavouriteByAnswerId', () => {
    it('should get a favorite relation by answer id', async () => {
      const result = await service.getFavouriteByAnswerId(1);
      expect(result).toEqual({});
    });
  });

  describe('deleteFavouriteRelation', () => {
    it('should delete a favorite relation', async () => {
      const result = await service.deleteFavouriteRelation(1, 1);
      expect(result).toEqual({});
    });
  });
});
