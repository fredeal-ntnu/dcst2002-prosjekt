import React from 'react';
import { shallow, mount } from 'enzyme';
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

    const answerText = wrapper.find('[title="Answer"]').find(Column).dive().text();
    expect(answerText).toContain('Test Answer');

    expect(wrapper.find('[title="Comments"]').find(Row)).toHaveLength(2);
  });

  test('Calls addAnswerComment method on button click', () => {
    AnswerDetails.prototype.addAnswerComment = jest.fn();

    // @ts-ignore
    const wrapper = shallow(<AnswerDetails match={{ params: { id: '1' } }} />);
    wrapper.find(Button.Success).simulate('click'); 
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

//@ts-ignore
const flushPromises = () => new Promise(setTimeout);

describe('AnswerDetails - mounted method', () => {
  it('updates connectedUser on successful getMe', async () => {
    jest
      .spyOn(service, 'getMe')
      .mockResolvedValue({ user_id: 1, google_id: 'test', username: 'test', email: 'test' });
    const wrapper = mount(<AnswerDetails match={{ params: { id: 1 } }} />);

    await flushPromises();
    wrapper.update();

    //@ts-ignore
    expect(wrapper.instance().connectedUser).toEqual(1);
  });

  it('handles error on failed getMe', async () => {
    jest.spyOn(service, 'getMe').mockRejectedValue(new Error('Failed to fetch user'));
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    const wrapper = mount(<AnswerDetails match={{ params: { id: 1 } }} />);

    await flushPromises();
    wrapper.update();

    expect(console.error).toHaveBeenCalledWith('Failed to fetch user');

    jest.restoreAllMocks();
  });

  it('fetches answer details on successful mounted', async () => {
    jest.spyOn(service, 'getMe').mockResolvedValue({ user_id: 1 });
    jest.spyOn(service, 'getAnswerById').mockResolvedValue({ answer_id: 1, text: 'Sample answer' });

    const wrapper = mount(<AnswerDetails match={{ params: { id: 1 } }} />);

    await flushPromises();
    wrapper.update();

    //@ts-ignore
    expect(wrapper.instance().answer).toEqual({ answer_id: 1, text: 'Sample answer' });
  });
});
