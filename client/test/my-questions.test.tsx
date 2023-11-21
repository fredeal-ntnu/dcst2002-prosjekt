import React from 'react';
import { shallow } from 'enzyme';
import { MyQuestions } from 'src/components/my-questions'; // Adjust the import path as needed
import { Column } from '../src/widgets';

jest.mock('../src/service', () => {
  class Service {
    getQuestionsByUserid(user_id: number) {
      return new Promise((resolve, reject) => {
        resolve([
          {
            question_id: 1,
            title: 'test',
            description: 'test',
            user_id: 1,
            username: 'test',
            date: 'test',
            score: 1,
          },
        ]);
      });
    }
    getUserTopFiveQuestions(user_id: number) {
      return new Promise((resolve, reject) => {
        resolve([
          {
            question_id: 1,
            title: 'test',
            description: 'test',
            user_id: 1,
            username: 'test',
            date: 'test',
            score: 1,
          },
        ]);
      });
    }
    getUserUnansweredQuestions(user_id: number) {
      return new Promise((resolve, reject) => {
        resolve([
          {
            question_id: 1,
            title: 'test',
            description: 'test',
            user_id: 1,
            username: 'test',
            date: 'test',
            score: 1,
          },
        ]);
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
    const wrapper = shallow(<MyQuestions />);
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
});

describe('site functionality', () => {
  test('search onchange works', (done) => {
    const wrapper = shallow(<MyQuestions />);
    wrapper.find('FormInput').simulate('change', { currentTarget: { value: 'test' } });
    expect(wrapper).toMatchSnapshot();
    done();
  });
});

describe('switchcase works', () => {
  const wrapper = shallow(<MyQuestions />);

  test('switchcase popular shows', () => {
    wrapper.find('FormSelect').simulate('change', { target: { value: 'popular' } });
    expect(wrapper).toMatchSnapshot();
  });

  test('switchcase unanswered shows', () => {
    wrapper.find('FormSelect').simulate('change', { target: { value: 'unanswered' } });
    expect(wrapper).toMatchSnapshot();
  });
});
