import React from 'react';
import { shallow, mount } from 'enzyme';
import { EditQuestion } from 'src/components/edit-question'; // Adjust the import path as needed
import { Column, Button } from '../src/widgets';
import { Question } from 'src/service';
import { createHashHistory } from 'history';
import service from 'src/service';

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

    updateQuestion(question: Question) {
      return new Promise((resolve, reject) => {
        resolve([
          {
            question_id: 1,
            title: 'updatedtest',
            text: 'updatedtest',
            view_count: 1,
            has_answer: 1,
            user_id: 1,
          },
        ]);
      });
    }
    deleteQuestion(id: number) {
      return new Promise((resolve, reject) => {
        resolve([
          { question_id: 1, title: 'test', text: 'test', view_count: 1, has_answer: 1, user_id: 1 },
        ]);
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
    const wrapper = shallow(<EditQuestion match={{ params: { id: 1 } }} />);
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
});

describe('site functionality', () => {
  test('title edit field takes input', (done) => {
    const wrapper = shallow(<EditQuestion match={{ params: { id: 1 } }} />);
    wrapper.find('FormInput').simulate('change', { currentTarget: { value: 'test' } });
    expect(wrapper).toMatchSnapshot();
    done();
  });

  test('text edit field takes input', (done) => {
    const wrapper = shallow(<EditQuestion match={{ params: { id: 1 } }} />);
    wrapper.find('FormTextarea').simulate('change', { currentTarget: { value: 'test' } });
    expect(wrapper).toMatchSnapshot();
    done();
  });
  test('save button registers clcik', () => {
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

//@ts-ignore
const flushPromises = () => new Promise(setTimeout);

describe('EditQuestion - mounted method', () => {
  it('updates connectedUser on successful getMe', async () => {
    jest
      .spyOn(service, 'getMe')
      .mockResolvedValue({ user_id: 1, google_id: 'test', username: 'test', email: 'test' });
    const wrapper = mount(<EditQuestion match={{ params: { id: 1 } }} />);

    await flushPromises();
    wrapper.update();

    //@ts-ignore
    expect(wrapper.instance().connectedUser).toEqual(1);
  });

  it('handles error on failed getMe', async () => {
    jest.spyOn(service, 'getMe').mockRejectedValue(new Error('Failed to fetch user'));
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    const wrapper = mount(<EditQuestion match={{ params: { id: 1 } }} />);

    await flushPromises();
    wrapper.update();

    expect(console.error).toHaveBeenCalledWith('Failed to fetch user');
    expect(window.alert).toHaveBeenCalledWith('You must be logged in to edit question');

    // Clean up mocks
    jest.restoreAllMocks();
  });

  it('fetches question details on successful mounted', async () => {
    jest.spyOn(service, 'getMe').mockResolvedValue({ user_id: 1 });
    jest.spyOn(service, 'getQuestion').mockResolvedValue({ question_id: 1,
        title: 'updatedtest',
        text: 'updatedtest',
        view_count: 1,
        has_answer: 1,
        user_id: 1, });

    const wrapper = mount(<EditQuestion match={{ params: { id: 1 } }} />);

    await flushPromises();
    wrapper.update();

    //@ts-ignore
    expect(wrapper.instance().question).toEqual({ question_id: 1,
        title: 'updatedtest',
        text: 'updatedtest',
        view_count: 1,
        has_answer: 1,
        user_id: 1, });
  });
});
