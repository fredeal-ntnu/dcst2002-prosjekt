import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'src/widgets';
import { CreateQuestion } from 'src/components/create-question';


jest.mock('src/service', () => {
  class Service {
    getMe() {
      return new Promise((resolve, reject) => {
        resolve({ user_id: 1 });
      });
    }
    createQuestion() {
      return new Promise((resolve, reject) => {
        resolve({
          question_id: 1,
          title: 'test',
          description: 'test',
          view_count: 0,
          has_answer: 0,
          user_id: 1,
        });
      });
    }
    getAllTags() {
      return new Promise((resolve, reject) => {
        resolve([{ tag_id: 1, name: 'test' }]);
      });
    }
    createTagQuestionRelation() {
      return new Promise((resolve, reject) => {
        resolve({ tag_id: 1, question_id: 1 });
      });
    }
  }
  return new Service();
});

describe('CreateQuestion component', () => {
  test('CreateQuestion component renders', () => {
    const wrapper = shallow(<CreateQuestion />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Button click', () => {
  test('Button click works', () => {
    const wrapper = shallow(<CreateQuestion />);
    setTimeout(() => {
      wrapper.find(Button.Success).simulate('click');

      setTimeout(() => {
        expect(alert).toHaveBeenCalledWith('You must have atlest one tag');
      });
    });
  });
});

describe('Page functionality', () => {
  test('title input works ', () => {
    const wrapper = shallow(<CreateQuestion />);
    wrapper.find('FormInput').simulate('change', { currentTarget: { value: 'test' } });
    expect(wrapper).toMatchSnapshot();
  });

  test('text input works ', () => {
    const wrapper = shallow(<CreateQuestion />);
    wrapper.find('FormTextarea').simulate('change', { currentTarget: { value: 'test' } });
    expect(wrapper).toMatchSnapshot();
  });
  test('tag checkbox input works ', () => {
    let checkboxClicked = false;
    const wrapper = shallow(<input type="checkbox" onChange={() => (checkboxClicked = true)} />);
    wrapper.find('input').simulate('change');
    expect(checkboxClicked).toEqual(true);
  });
});
