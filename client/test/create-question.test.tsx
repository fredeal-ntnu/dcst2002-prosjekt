// Import necessary libraries and components
import React from 'react';
import { shallow, mount } from 'enzyme';
import { CreateQuestion } from 'src/components/create-question'; // Update the path accordingly
import service from 'src/service';

describe('CreateQuestion component', () => {
  test('CreateQuestion component renders', () => {
    const wrapper = shallow(<CreateQuestion />);
    expect(wrapper).toMatchSnapshot();
  })
})