import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Row, Column, Button } from 'src/widgets';
import { AnswerDetails } from 'src/components/answer-details';
import service from 'src/service';


describe('AnswerDetails component', () => {
  test('AnswerDetails component renders', () => {
    const wrapper = shallow(<AnswerDetails match={{ params: { id: 1 } }} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Renders the answer and comments correctly', () => {
    const mockMatch = { params: { id: '1' } };
    // @ts-ignore
    const wrapper = shallow(<AnswerDetails match={mockMatch} />);
    // @ts-ignore
    wrapper.instance().answer = { text: 'Test Answer', answer_id: '1' };
    // @ts-ignore
    wrapper.instance().answerComments = [
      { answer_comment_id: 1, text: 'Test Comment 1', answer_id: '1' },
      { answer_comment_id: 2, text: 'Test Comment 2', answer_id: '1' },
    ];
    wrapper.update();

    // Check if the answer is rendered
    const answerText = wrapper.find('[title="Answer"]').find(Column).dive().text();
    expect(answerText).toContain('Test Answer');

    // Check if the comments are rendered
    expect(wrapper.find('[title="Comments"]').find(Row)).toHaveLength(2);
  });

  test('Calls addAnswerComment method on button click', () => {
    // Mock the addAnswerComment method on the component's prototype
    AnswerDetails.prototype.addAnswerComment = jest.fn();

    // Render the component
    // @ts-ignore
    const wrapper = shallow(<AnswerDetails match={{ params: { id: '1' } }} />);

    // Simulate the button click for adding a comment
    wrapper.find(Button.Success).simulate('click'); // Adjust selector if needed

    // Check if the addAnswerComment method was called
    expect(AnswerDetails.prototype.addAnswerComment).toHaveBeenCalled();
  });
});

describe('Page functionality', () => {
  test('Add comment button registers click', () => {
    let buttonClicked = false;
    const wrapper = shallow(
      <Button.Success onClick={() => (buttonClicked = true)}>test</Button.Success>,
    );
    wrapper.find('button').simulate('click');
    expect(buttonClicked).toEqual(true);
  });
});


describe('QuestionDetails - mounted method', () => {
  it('updates connectedUser on successful getMe', async () => {
    // Mock the service.getMe() to resolve with a mock user
    jest.spyOn(service, 'getMe').mockResolvedValue({ user_id: 1 });

    const wrapper = mount(<AnswerDetails match={{ params: { id: 1 } }} />);
    
    // Since service.getMe is a Promise, we need to wait for the next tick
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update(); // Update the wrapper to reflect the state change

    expect(wrapper.instance().connectedUser).toEqual(1);

    // Clean up mocks
    jest.restoreAllMocks();
  });

  it('handles errors in getMe', async () => {
    // Mock the service.getMe() to reject
    const errorMessage = 'You must be logged in to create a question';
    jest.spyOn(service, 'getMe').mockRejectedValue(new Error(errorMessage));
    jest.spyOn(window, 'alert').mockImplementation(() => {}); // Mock window.alert

    const wrapper = mount(<QuestionDetails match={{ params: { id: 1 } }} />);

    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    // Check if the error handling behavior is correct
    expect(window.alert).toHaveBeenCalledWith(errorMessage);
    
    // Clean up mocks
    jest.restoreAllMocks();
  });
});
