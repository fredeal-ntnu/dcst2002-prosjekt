import React from 'react';
import { shallow } from 'enzyme';
import { Favourites } from 'src/components/favourites'; // Adjust the import path as needed
import { createHashHistory } from 'history';

const history = createHashHistory();
jest.mock('../src/service', () => {
  class Service {
    getAllFavouriteAnswersByUserId(user_id: number) {
      return new Promise((resolve, reject) => {
        resolve({ user_id: 1 });
      });
    }

    getMe() {
      return new Promise((resolve, reject) => {
        resolve({ user_id: 1, google_id: 'test', username: 'test', email: 'test' });
      });
    }
  }
  return new Service();
});

describe('Site renders', () => {
  test('Site renders correct', (done) => {
    const wrapper = shallow(<Favourites />);
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
});
