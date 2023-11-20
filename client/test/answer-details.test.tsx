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


test('Renders the answer and comments correctly', () => {
  const mockMatch = { params: { id: '1' } };
  // @ts-ignore
  const wrapper = shallow(<AnswerDetails match={mockMatch} />);
// @ts-ignore
  wrapper.instance().answer = { text: 'Test Answer', answer_id: '1' };
  // @ts-ignore
  wrapper.instance().answerComments = [
    { answer_comment_id: 1, text: 'Test Comment 1', answer_id: '1' },
    { answer_comment_id: 2, text: 'Test Comment 2', answer_id: '1' }
  ];
  wrapper.update();

  // Check if the answer is rendered
  const answerText = wrapper.find('[title="Answer"]').find(Column).dive().text();
  expect(answerText).toContain('Test Answer');

  // Check if the comments are rendered
  expect(wrapper.find('[title="Comments"]').find(Row)).toHaveLength(2);
});



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
