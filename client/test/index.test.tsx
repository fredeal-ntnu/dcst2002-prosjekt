import React from 'react';
import { shallow } from 'enzyme';
import { Menu, Home } from 'src/index';
import { createHashHistory } from 'history';

const history = createHashHistory();
jest.mock('../src/service', () => {
  class Service {
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
    const wrapper = shallow(<Menu />);
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });

  test('Site renders correct', (done) => {
    const wrapper = shallow(<Home />);
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
});
