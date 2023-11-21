import React from 'react';
import { shallow, mount } from 'enzyme';
import { EditAnswerComment } from 'src/components/edit-answer-comment'; 
import { Button, Form } from '../src/widgets';
import { AnswerComment } from 'src/service';
import { createHashHistory } from 'history';
import service from 'src/service';

const history = createHashHistory();
jest.mock('src/service', () => {
  class Service {
    getAnswerCommentById(id: number) {
      return new Promise((resolve, reject) => {
        resolve([{ answer_comment_id: 1, text: 'test', answer_id: 1, user_id: 1 }]);
      });
    }
    updateAnswerComment(answerComment: AnswerComment) {
      return new Promise((resolve, reject) => {
        resolve([{ answer_comment_id: 1, text: 'updatedtest', answer_id: 1, user_id: 1 }]);
      });
    }
    deleteAnswerComment(id: number) {
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
}); // Mock the service module

describe('Site renders', () => {
  test('Site renders correct', (done) => {
    const wrapper = shallow(<EditAnswerComment match={{ params: { id: 1 } }} />);
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
});

describe('Create answercomment', () => {
  test('create answer comment works', () => {
    const match = { params: { id: 1 } };

    service.getAnswerCommentById = jest.fn().mockResolvedValue({ text: 'some text' });

    const wrapper = shallow(<EditAnswerComment match={{ params: { id: 1 } }} />);
    wrapper
      .find(Form.Textarea)
      .at(0)
      .simulate('change', { currentTarget: { value: 'test' } });

    setTimeout(() => {
      wrapper.find(Button.Success).at(0).simulate('click');
      setTimeout(() => {
        expect(window.location.href).toEqual('http://localhost/#/');
      });
    });
  });
});

describe('site functionality', () => {
  test('edit field takes in input', (done) => {
    const wrapper = shallow(<EditAnswerComment match={{ params: { id: 1 } }} />);
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

//@ts-ignore
const flushPromises = () => new Promise(setTimeout);

describe('AnswerDetails - mounted method', () => {
  it('updates connectedUser on successful getMe', async () => {
    jest
      .spyOn(service, 'getMe')
      .mockResolvedValue({ user_id: 1, google_id: 'test', username: 'test', email: 'test' });
    const wrapper = mount(<EditAnswerComment match={{ params: { id: 1 } }} />);

    await flushPromises();
    wrapper.update();

    //@ts-ignore
    expect(wrapper.instance().connectedUser).toEqual(1);
  });

  it('fetches answer details on successful mounted', async () => {
    jest.spyOn(service, 'getMe').mockResolvedValue({ user_id: 1 });
    jest
      .spyOn(service, 'getAnswerCommentById')
      .mockResolvedValue({ answer_comment_id: 1, text: 'Sample answer' });

    const wrapper = mount(<EditAnswerComment match={{ params: { id: 1 } }} />);

    await flushPromises();
    wrapper.update();

    //@ts-ignore
    expect(wrapper.instance().answerComment).toEqual({
      answer_comment_id: 1,
      text: 'Sample answer',
    });
  });
});
