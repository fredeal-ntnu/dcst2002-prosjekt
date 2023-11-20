import React from 'react';
import { shallow } from 'enzyme';
import { Tags } from 'src/components/tags'; // Adjust the import path as needed
import { Column } from '../src/widgets';

jest.mock('../src/service', () => {
  class Service {
    getAllQuestions() {
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
    getAllQuestionsByTagId(tag_id: number) {
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
  }
  return new Service();
}); // Mock the service module

describe('Site renders', () => {
  test('Site renders correct', (done) => {
    const wrapper = shallow(<Tags />);
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
});

describe('site functionality', () => {
  test('search onchange works', (done) => {
    const wrapper = shallow(<Tags />);
    wrapper.find('FormInput').simulate('change', { currentTarget: { value: 'test' } });
    expect(wrapper).toMatchSnapshot();
    done();
  });
});

describe('switchcase', () => {
  const wrapper = shallow(<Tags />);

  test('switchcase popular', () => {
    wrapper.find('FormSelect').simulate('change', { target: { value: 'popularity' } });

    expect(wrapper).toMatchSnapshot();
  });

  test('switchcase a-z', () => {
    wrapper.find('FormSelect').simulate('change', { target: { value: 'a-z' } });
    expect(wrapper).toMatchSnapshot();
  });
  test('switchcase z-a', () => {
    wrapper.find('FormSelect').simulate('change', { target: { value: 'z-a' } });
    expect(wrapper).toMatchSnapshot();
  });
});
