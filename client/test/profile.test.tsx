import React from 'react';
import { shallow } from 'enzyme';
import { Profile } from 'src/components/profile'; // Adjust the import path as needed
import { Column, Button } from '../src/widgets';

jest.mock('../src/service', () => {
  class Service {
    getMe() {
      return new Promise((resolve) => {
        resolve([{ user_id: 1, google_id: 'test', username: 'test', email: 'test' }]);
      });
    }
  }
  return new Service();
}); // Mock the service module

describe('Site renders', () => {
  test('Site renders correct', (done) => {
    const wrapper = shallow(<Profile />);
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
});

describe('Log out button', () => {
  test('logout button registers clcik', () => {
    let buttonClicked = false;
    const wrapper = shallow(
      <Button.Danger onClick={() => (buttonClicked = true)}>test</Button.Danger>,
    );
    wrapper.find('button').simulate('click');
    expect(buttonClicked).toEqual(true);
  });
});
