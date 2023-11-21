import axios from 'axios';
import service, {
  Question,
  Tag,
  User,
  Answer,
  QuestionComment,
  AnswerComment,
  Vote,
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
      expect(axios.get).toHaveBeenCalledWith('/questions');
    });
  });

  describe('getQuestion', () => {
    it('should get a question by its id', async () => {
      const questionId = mockQuestion.question_id;
      const expectedUrl = `/questions/${questionId}`;
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockQuestion });

      const result = await service.getQuestion(questionId);

      expect(result).toEqual(mockQuestion);

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
      const mockQuestion = {
        has_answer: 0,
        question_id: 1,
        text: 'test',
        title: 'test',
        user_id: 1,
        view_count: 1,
      };

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
      const userId = mockQuestion.user_id;
      const expectedUrl = `/user/${userId}/questions`;

      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [mockQuestion] });

      const result = await service.getQuestionsByUserid(userId);

      expect(result).toEqual([mockQuestion]);

      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('getTags', () => {
    it('should get tags for a specific question', async () => {
      //@ts-ignore
      const questionId = mockTagQuestionRelation.question_id;
      const expectedUrl = `/questions/${questionId}/tags`;

      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [mockTag] });

      const result = await service.getTags(questionId);

      expect(result).toEqual([mockTag]);

      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('getAllTags', () => {
    it('should retrieve all tags', async () => {
      const expectedUrl = '/tags';

      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [mockTag] });

      const result = await service.getAllTags();

      expect(result).toEqual([mockTag]);

      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('createTagQuestionRelation', () => {
    it('should create a tag-question relation', async () => {
      const tag_id = mockTag.tag_id;
      //@ts-ignore
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
      //@ts-ignore
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
      const commentText = mockAnswerComment.text;
      const answer_id = mockAnswerComment.answer_id;
      const user_id = mockAnswerComment.user_id;

      const expectedUrl = `/answers/${answer_id}/comments`;

      const expectedPayload = { text: commentText, answer_id, user_id };

      jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: mockAnswerComment });

      const result = await service.createAnswerComment(commentText, answer_id, user_id);

      expect(result).toEqual(mockAnswerComment);

      expect(axios.post).toHaveBeenCalledWith(expectedUrl, expectedPayload);
    });
  });

  describe('getAnswerCommentById', () => {
    it('should get an answer comment by id', async () => {
      const commentId = mockAnswerComment.answer_comment_id;
      const expectedUrl = `/answer/comments/${commentId}`;

      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockAnswerComment });

      const result = await service.getAnswerCommentById(commentId);

      expect(result).toEqual(mockAnswerComment);

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
        ...mockAnswer,
        ...mockVote,
      };

      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: combinedMock });

      const result = await service.getVotesByAnswerId(mockAnswer.answer_id);

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

  describe('logOut', () => {
    it('should successfully log the user out', async () => {
      jest.spyOn(axios, 'post').mockResolvedValueOnce({ status: 200 });

      const result = await service.logOut();

      expect(result).toEqual(200);
    });

    it('should throw an error if logOut fails', async () => {
      jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Network Error'));

      await expect(service.logOut()).rejects.toThrow('Network Error');
    });
  });

  describe('getAllFavouriteAnswersByUserId', () => {
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
    it('should create or delete a favorite relation based on the given parameters', async () => {
      const user_id = 1;
      const answer_id = 1;

      const expectedUrl = `/users/${user_id}/favourites/${answer_id}`;
      const mockResponse = {};

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
