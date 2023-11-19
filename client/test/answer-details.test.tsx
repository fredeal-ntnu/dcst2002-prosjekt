import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Row, Column} from 'src/widgets';
import { AnswerDetails } from 'src/components/answer-details';
import service from 'src/service';

// Mock the service module to simulate API calls
jest.mock('src/service', () => ({
  getAnswerById: jest.fn(() => Promise.resolve({ answer_id: 1 })),
  getAnswerCommentsForAnswer: jest.fn(() => Promise.resolve([])),
  createAnswerComment: jest.fn(() => Promise.resolve()),
  addAnswerComment: jest.fn(() => Promise.resolve()),
}));

describe('AnswerDetails Component', () => {
  let wrapper: any;

  beforeEach(() => {
    // Shallow render the component before each test
    wrapper = shallow(<AnswerDetails match={{ params: { id: 1 } }} />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('initializes state correctly', () => {
    expect(wrapper.state('answer')).toEqual({ answer_id: 1 });
    expect(wrapper.state('answerComments')).toEqual([]);
    expect(wrapper.state('answerComment')).toEqual({
      answer_comment_id: 0,
      text: '',
      answer_id: 0,
      user_id: 0,
    });
  });

  it('loads answer on mount', async () => {
    const answer = { answer_id: 1, text: 'Answer 1' };

    // Mock the service method to return answer
    service.getAnswerById.mockResolvedValueOnce(answer);

    // Update the component to reflect the new state
    await wrapper.instance().mounted();

    // Expect the answer to be set in the component's state
    expect(wrapper.state('answer')).toEqual(answer);
  });

  it('loads answer comments on mount', async () => {
    const answerComments = [{ answer_comment_id: 1, text: 'Answer comment 1' }];

    // Mock the service method to return answer comments
    service.getAnswerCommentsForAnswer.mockResolvedValueOnce(answerComments);

    // Update the component to reflect the new state
    await wrapper.instance().mounted();

    // Expect the answer comments to be set in the component's state
    expect(wrapper.state('answerComments')).toEqual(answerComments);
  });

  it('handles add answer comment correctly', async () => {
    const event = { preventDefault: jest.fn() };

    // Simulate a checkbox change event
    wrapper.instance().addAnswerComment(event);

    // Expect the selectedTags state to be updated
    expect(wrapper.state('answerComment')).toEqual({
      answer_comment_id: 0,
      text: '',
      answer_id: 0,
      user_id: 0,
    });
  });

  it('handles add answer comment correctly', async () => {
    const event = { preventDefault: jest.fn() };

    // Simulate a checkbox change event
    wrapper.instance().addAnswerComment(event);

    // Expect the selectedTags state to be updated
    expect(wrapper.state('answerComment')).toEqual({
      answer_comment_id: 0,
      text: '',
      answer_id: 0,
      user_id: 0,
    });
  });

  it('renders correctly', () => {
    // Create a mock answer and answer comments

    const answer = { answer_id: 1, text: 'Answer 1' };
    const answerComments = [
        { answer_comment_id: 1, text: 'Answer comment 1', answer_id: 1 },
        { answer_comment_id: 2, text: 'Answer comment 2', answer_id: 1 },
    ];

    // Set the answer and answer comments in the component's state
    wrapper.setState({ answer, answerComments });

    // Render the component
    const renderedComponent = shallow(<AnswerDetails match={{ params: { id: 1 } }} />);

    // Expect the component to render the answer text
    expect(renderedComponent.find(Column).at(0).text()).toEqual(answer.text);

    // Expect the component to render the answer comments
    expect(renderedComponent.find(Row)).toHaveLength(answerComments.length);
    answerComments.forEach((answerComment, index) => {
        expect(renderedComponent.find(Row).at(index).find(Column).at(0).text()).toEqual(
            answerComment.text,
        );
    });
    expect(renderedComponent.find(Column).at(0).text()).toEqual(answer.text);

    // Expect the component to render the answer comments
    expect(renderedComponent.find(Row)).toHaveLength(answerComments.length);
    answerComments.forEach((answerComment, index) => {
      expect(renderedComponent.find(Row).at(index).find(Column).at(0).text()).toEqual(
        answerComment.text,
      );
    });
  });
});
