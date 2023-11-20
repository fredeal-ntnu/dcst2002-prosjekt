// Import necessary libraries and components
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Row, Column, Button} from 'src/widgets';
import { CreateQuestion } from 'src/components/create-question'; // Update the path accordingly
import service from 'src/service';

describe('CreateQuestion component', () => {
  test('CreateQuestion component renders', () => {
    const wrapper = shallow(<CreateQuestion />);
    expect(wrapper).toMatchSnapshot();
  })
})

 describe('Page functionality', () => {
//   test('Add question button registers click', () => {
//     let buttonClicked = false
//     const wrapper = shallow(
//         <Button.Success onClick={()=> (buttonClicked = true)}>test</Button.Success>,
//   )
//   wrapper.find('button').simulate('click');
//   expect(buttonClicked).toEqual(true);
//   }
// )

test('title input works ', () => {
  const wrapper = shallow(<CreateQuestion />);
  wrapper.find('FormInput').simulate('change',{currentTarget:{value:'test'}});
  expect(wrapper).toMatchSnapshot();
  })

  test('text input works ', () => {
    const wrapper = shallow(<CreateQuestion />);
    wrapper.find('FormTextarea').simulate('change',{currentTarget:{value:'test'}});
    expect(wrapper).toMatchSnapshot();
    }
 )})

