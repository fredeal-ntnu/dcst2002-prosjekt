import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Row, Column, Button} from 'src/widgets';
import { AnswerDetails } from 'src/components/answer-details';
import service from 'src/service';

describe('AnswerDetails component', () => {
  test('AnswerDetails component renders', () => {
    const wrapper = shallow(<AnswerDetails match={{ params: { id: 1 } }} />);
    expect(wrapper).toMatchSnapshot();

  })

})

//øker ikke prosenten :(
describe('Page functionality', () => {
  test('Add comment button registers click', () => {
    let buttonClicked = false
    const wrapper = shallow(
        <Button.Success onClick={()=> (buttonClicked = true)}>test</Button.Success>,
  )
  wrapper.find('button').simulate('click');
  expect(buttonClicked).toEqual(true);
  }
)})
