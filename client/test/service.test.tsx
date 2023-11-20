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
  // Mock data for testing
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
const mockTagQuestionRelation: Tag_Question_Relation = {
    tag_id: 1,
    question_id: 1,
};

// Mock axios.get implementation
jest.fn().mockImplementation((url: string, data: any) => Promise.resolve({ data: mockTagQuestionRelation }));

// Mock axios.post implementation
axios.put = jest.fn().mockImplementation((url: string, data: any) => Promise.resolve({ data }));

// Mock axios.get implementation
axios.get = jest.fn().mockImplementation((url: string) => Promise.resolve({ data: [] }));

// Mock axios.delete implementation
axios.delete = jest.fn().mockImplementation((url) => Promise.resolve({ data: {} }));

// Mock async axios.get implementation
axios.get = jest.fn().mockResolvedValue({ data: {} });
(axios.get as jest.Mock).mockImplementation((url: string) => Promise.resolve({ data: mockVote }));

// Mock axios.get and axios.post implementation for getMe and logOut
(axios.get as jest.Mock).mockImplementation((url: string) => Promise.resolve({ data: {} }));
(axios.post as jest.Mock).mockImplementation((url: string) => Promise.resolve({ status: 200 }));

axios.get = jest.fn<any, any>((url) => {
    if (url.includes('/questions/')) {
        return Promise.resolve({ data: [mockTagQuestionRelation] });
    } else if (url === '/question/:id') {
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

  describe('createVote', () => {
    it('should create a vote', async () => {
      const result = await service.createVote(
        mockVote.user_id,
        mockVote.answer_id,
        mockVote.vote_type,
      );
      expect(result).toEqual(mockVote);
    });
  });

describe('getAllQuestions', () => {
    it('should get all questions', async () => {
        jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [mockQuestion] });
        const result = await service.getAllQuestions();
        expect(result).toEqual([mockQuestion]);
    });
});

describe('getQuestion', () => {
    it('should get a question by id', async () => {
        jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockQuestion });
        const result = await service.getQuestion(mockQuestion.question_id);
        expect(result).toEqual(mockQuestion);
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
        const result = await service.getUnansweredQuestions();
        expect(result).toEqual([mockQuestion]);
    });
});

  describe('getUserUnansweredQuestions', () => {
    it('should get unanswered questions for a user', async () => {
      const result = await service.getUserUnansweredQuestions(mockQuestion.user_id);
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
    it('should get all questions for a user', async () => {
      const result = await service.getQuestionsByUserid(mockQuestion.user_id);
      expect(result).toEqual([mockQuestion]);
    });
  });

  describe('getTags', () => {
    it('should get tags for a question', async () => {
      const result = await service.getTags(mockTagQuestionRelation.question_id);
      expect(result).toEqual([mockTag]);
    });
  });

  describe('getAllTags', () => {
    it('should get all tags', async () => {
      const result = await service.getAllTags();
      expect(result).toEqual([mockTag]);
    });
  });

  describe('createTagQuestionRelation', () => {
    it('should create a tag-question relation', async () => {
      const result = await service.createTagQuestionRelation(
        mockTag.tag_id,
        mockTagQuestionRelation.question_id,
      );
      expect(result).toEqual(mockTagQuestionRelation);
    });
  });

  describe('getAllQuestionsByTagId', () => {
    it('should get all questions by tag id', async () => {
      const result = await service.getAllQuestionsByTagId(mockTag.tag_id);
      expect(result).toEqual([mockTagQuestionRelation]);
    });
  });

  describe('getTagsForQuestion', () => {
    it('should get all tags for a question by question id', async () => {
      const result = await service.getTagsForQuestion(mockTagQuestionRelation.question_id);
      expect(result).toEqual([mockTagQuestionRelation]);
    });
  });

  describe('getAllTagQuestionRelations', () => {
    it('should get all tag-question relations', async () => {
      const result = await service.getAllTagQuestionRelations();
      expect(result).toEqual([mockTagQuestionRelation]);
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

  describe('getAllAnswersByUserId', () => {
    it('should get all answers by user id', async () => {
      const result = await service.getAllAnswersByUserId(mockUser.user_id);
      expect(result).toEqual([mockAnswer]);
    });
  });

  describe('getAnswerScoresByQuestionId', () => {
    it('should get answer scores by question id', async () => {
      const result = await service.getAnswerScoresByQuestionId(1);
      expect(result).toEqual([mockQuestionComment]);
    });
  });

  describe('createAnswer', () => {
    it('should create an answer', async () => {
      const result = await service.createAnswer('Test answer', 1, 1);
      expect(result).toEqual(mockQuestionComment);
    });
  });

  describe('getQuestionCommentById', () => {
    it('should get a question comment by id', async () => {
      const result = await service.getQuestionCommentById(mockQuestionComment.question_comment_id);
      expect(result).toEqual(mockQuestionComment);
    });
  });

  describe('createQuestionComment', () => {
    it('should create a question comment', async () => {
      const result = await service.createQuestionComment('Test comment', 1, 1);
      expect(result).toEqual(mockQuestionComment);
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
    it('should get question comments for a question', async () => {
      const result = await service.getQuestionCommentsForQuestion(mockQuestion.question_id);
      expect(result).toEqual([mockQuestionComment]);
    });
  });

  describe('getQuestionByAnswerId', () => {
    it('should get a question by answer id', async () => {
      const result = await service.getQuestionByAnswerId(mockQuestionComment.question_id);
      expect(result).toEqual(mockQuestion);
    });
  });

  describe('getAnswerCommentsForAnswer', () => {
    it('should get answer comments for an answer', async () => {
      const result = await service.getAnswerCommentsForAnswer(mockAnswerComment.answer_id);
      expect(result).toEqual([mockAnswerComment]);
    });
  });

  describe('createAnswerComment', () => {
    it('should create an answer comment', async () => {
      const result = await service.createAnswerComment('Test comment', 1, 1);
      expect(result).toEqual(mockAnswerComment);
    });
  });

  describe('getAnswerCommentById', () => {
    it('should get an answer comment by id', async () => {
      const result = await service.getAnswerCommentById(mockAnswerComment.answer_comment_id);
      expect(result).toEqual(mockAnswerComment);
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

  describe('getVotesByAnswerId', () => {
    it('should get votes by answer id', async () => {
      const result = await service.getVotesByAnswerId(1);
      expect(result).toEqual(mockVote);
    });
  });

jest.mock('axios', () => ({
    get: jest.fn(),
}));

describe('getMe', () => {
    it('should get user information for the logged-in user', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: {} });
        const result = await service.getMe();
        expect(result).toEqual({});
    });

    it('should throw an error if getMe fails', async () => {
        (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

        await expect(service.getMe()).rejects.toThrowError('getMe failed');
    });
});

jest.mock('axios', () => ({
    post: jest.fn(),
}));

describe('logOut', () => {
    it('should log the user out', async () => {
        (axios.post as jest.Mock).mockResolvedValueOnce({ status: 200 });
        const result = await service.logOut();
        expect(result).toEqual(200);
    });

    it('should throw an error if logOut fails', async () => {
        (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

        await expect(service.logOut()).rejects.toThrowError('logout failed');
    });
});

describe('getAllFavouriteAnswersByUserId', () => {
    it('should get all favorite answers for a user', async () => {
        const result = await service.getAllFavouriteAnswersByUserId(1);
        expect(result).toEqual(mockAnswer);
    });
});

  describe('handleFavouriteRelation', () => {
    it('should create or delete a favorite relation', async () => {
      const result = await service.handleFavouriteRelation(1, 1);
      expect(result).toEqual({});
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
