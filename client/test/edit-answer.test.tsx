import React from 'react';
import { shallow, mount } from 'enzyme';
import { EditAnswer } from 'src/components/edit-answer'; 
import { Button } from '../src/widgets';
import { AnswerComment } from 'src/service';
import { createHashHistory } from 'history';
import service from 'src/service';

const history = createHashHistory();
jest.mock('src/service', () => {
  class Service {
    getAnswerById(id: number) {
      return new Promise((resolve, reject) => {
        resolve([{ answer_comment_id: 1, text: 'test', answer_id: 1, user_id: 1 }]);
      });
    }
    updateAnswer(answerComment: AnswerComment) {
      return new Promise((resolve, reject) => {
        resolve([{ answer_comment_id: 1, text: 'updatedtest', answer_id: 1, user_id: 1 }]);
      });
    }
    deleteAnswer(id: number) {
      return new Promise((resolve, reject) => {
        resolve([{ answer_comment_id: 1, text: 'test', answer_id: 1, user_id: 1 }]);
      });
    }
    getMe() {
      return new Promise((resolve, reject) => {
        resolve([{ user_id: 1, google_id: 'test', username: 'test', email: 'test' }]);
      });
    }
  }
  return new Service();
});

describe('Site renders', () => {
  test('Site renders correct', (done) => {
    const wrapper = shallow(<EditAnswer match={{ params: { id: 1 } }} />);
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
});

describe('site functionality', () => {
  test('edit field takes in input', (done) => {
    const wrapper = shallow(<EditAnswer match={{ params: { id: 1 } }} />);
    wrapper.find('FormTextarea').simulate('change', { currentTarget: { value: 'test' } });
    expect(wrapper).toMatchSnapshot();
    done();
  });

  test('save button registers click', () => {
    let buttonClicked = false;
    const wrapper = shallow(
      <Button.Success onClick={() => (buttonClicked = true)}>test</Button.Success>,
    );
    wrapper.find('button').simulate('click');
    expect(buttonClicked).toEqual(true);
  });

  test('delete button registers click', () => {
    let buttonClicked = false;
    const wrapper = shallow(
      <Button.Danger onClick={() => (buttonClicked = true)}>test</Button.Danger>,
    );
    wrapper.find('button').simulate('click');
    expect(buttonClicked).toEqual(true);
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
    const wrapper = mount(<EditAnswer match={{ params: { id: 1 } }} />);

    await flushPromises();
    wrapper.update();

    //@ts-ignore
    expect(wrapper.instance().connectedUser).toEqual(1);
  });

  it('handles error on failed getMe', async () => {
    jest.spyOn(service, 'getMe').mockRejectedValue(new Error('Failed to fetch user'));
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    const wrapper = mount(<EditAnswer match={{ params: { id: 1 } }} />);

    await flushPromises();
    wrapper.update();

    expect(console.error).toHaveBeenCalledWith('Failed to fetch user');
    expect(window.alert).toHaveBeenCalledWith('You must be logged in to edit answer');

    jest.restoreAllMocks();
  });

  it('fetches answer details on successful mounted', async () => {
    jest.spyOn(service, 'getMe').mockResolvedValue({ user_id: 1 });
    jest.spyOn(service, 'getAnswerById').mockResolvedValue({ answer_id: 1, text: 'Sample answer' });

    const wrapper = mount(<EditAnswer match={{ params: { id: 1 } }} />);

    await flushPromises();
    wrapper.update();

    //@ts-ignore
    expect(wrapper.instance().answer).toEqual({ answer_id: 1, text: 'Sample answer' });
  });
});
