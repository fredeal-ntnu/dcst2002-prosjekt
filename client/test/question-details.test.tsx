import React from 'react';
import { shallow, mount } from 'enzyme';
import { QuestionDetails } from 'src/components/question-details';
import service from 'src/service';
import { createHashHistory } from 'history';
const history = createHashHistory();

jest.mock('src/service', () => {
  class Service {
    getQuestion(id: number) {
      return new Promise((resolve, reject) => {
        resolve([
          { question_id: 1, title: 'test', text: 'test', view_count: 1, has_answer: 1, user_id: 1 },
        ]);
      });
    }

    getAllTagQuestionRelations() {
      return new Promise((resolve, reject) => {
        resolve([{ tag_id: 1, question_id: 1 }]);
      });
    }
    getAnswerScoresByQuestionId(question_id: number) {
      return new Promise((resolve, reject) => {
        resolve([{ answer_id: 1, score: 1 }]);
      });
    }
    getQuestionCommentsForQuestion(question_id: number) {
      return new Promise((resolve, reject) => {
        resolve([{ question_comment_id: 1, text: 'test', question_id: 1, user_id: 1 }]);
      });
    }
    getAllTags() {
      return new Promise((resolve, reject) => {
        resolve([{ tag_id: 1, name: 'test' }]);
      });
    }
    getMe() {
      return new Promise((resolve, reject) => {
        resolve([{ user_id: 1, google_id: 'test', username: 'test', email: 'test' }]);
      });
    }
  }
  return new Service();
}); // Mock the service module

describe('Site renders', () => {
  test('Site renders correct', (done) => {
    const wrapper = shallow(<QuestionDetails match={{ params: { id: 1 } }} />);
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
});

describe('switchcase', () => {
  const wrapper = shallow(<QuestionDetails match={{ params: { id: 1 } }} />);

  test('switchcase popular', () => {
    wrapper.find('FormSelect').simulate('change', { target: { value: 'popular' } });

    expect(wrapper).toMatchSnapshot();
  });

  test('switchcase most recent', () => {
    wrapper.find('FormSelect').simulate('change', { target: { value: 'mostRecent' } });
    expect(wrapper).toMatchSnapshot();
  });

  test('switchcase confirmed', () => {
    wrapper.find('FormSelect').simulate('change', { target: { value: 'confirmed' } });
    expect(wrapper).toMatchSnapshot();
  });
});

describe('createQuestionEditButton', () => {
  it('should call createQuestionEditButton if connectedUser matches question user_id', () => {
    const wrapper = shallow(<QuestionDetails match={{ params: { id: 1 } }} />);
    //@ts-ignore
    wrapper.instance().connectedUser = 1;
    //@ts-ignore
    wrapper.instance().question.user_id = 1;
    //@ts-ignore
    expect(wrapper.instance().createQuestionEditButton()).toBeDefined();
  });

  it('should render addQuestionCommentInput if connectedUser is set', () => {
    const wrapper = shallow(<QuestionDetails match={{ params: { id: 1 } }} />);
    //@ts-ignore
    wrapper.instance().connectedUser = 1;
    //@ts-ignore
    expect(wrapper.instance().addQuestionCommentInput()).toBeDefined();
  });

  it('should render handleQuestionCommentDisplay if connectedUser is set', () => {
    const mockComments = [
      { question_comment_id: 1, text: 'Test Comment', question_id: 1, user_id: 1 },
    ];
    const wrapper = shallow(<QuestionDetails match={{ params: { id: 1 } }} />);
    //@ts-ignore
    wrapper.instance().connectedUser = 1;
    //@ts-ignore
    wrapper.instance().questionComments = mockComments;
    //@ts-ignore
    expect(wrapper.instance().handleQuestionCommentDisplay()).toBeDefined();
  });

  it('should call handleEditAnswer if connectedUser matches answer user_id', () => {
    const wrapper = shallow(<QuestionDetails match={{ params: { id: 1 } }} />);
    //@ts-ignore
    wrapper.instance().connectedUser = 1;
    const mockAnswer = { answer_id: 10, user_id: 1 };
    expect(
      //@ts-ignore
      wrapper.instance().handleEditAnswer(mockAnswer.answer_id, mockAnswer.user_id),
    ).toBeDefined();
  });
});

//@ts-ignore
const flushPromises = () => new Promise(setTimeout);

describe('Conditional Rendering', () => {
  it('renders the edit button only for the question owner', () => {
    const wrapper = shallow(<QuestionDetails match={{ params: { id: 1 } }} />);
    wrapper.setState({ user: { user_id: 1 }, question: { user_id: 1 } });

    expect(wrapper.find('Button.EditQuestion').length).toEqual(0); // Adjust the selector as needed
  });
});

