import React from 'react';
import { shallow } from 'enzyme';
import { EditAnswerComment } from 'src/components/edit-answer-comment'; // Adjust the import path as needed
import { Column } from '../src/widgets';
import { Answer, AnswerComment } from 'src/service';

jest.mock('../src/service',()=>{
  class Service{
    getAnswerCommentById(id: number){
      return new Promise((resolve,reject)=>{
        resolve([{answer_comment_id:1,text:'test',answer_id:1,user_id:1}]);
      });
    }
    updateAnswerComment(answerComment: AnswerComment){
      return new Promise((resolve,reject)=>{
        resolve([{answer_comment_id:1,text:'updatedtest',answer_id:1,user_id:1}]);
      });
    }
    deleteAnswerComment(id: number){
      return new Promise((resolve,reject)=>{
        resolve([{answer_comment_id:1,text:'test',answer_id:1,user_id:1}]);
      });
    }
    getMe(){
      return new Promise((resolve,reject)=>{
        resolve([{user_id:1,google_id:'test',username:'test',email:'test'}]);
      });
    }
  }
return new Service();
}); // Mock the service module


describe('Site renders', () => {
  test('Site renders correct', (done) => {
    const wrapper = shallow(<EditAnswerComment match={{ params: { id: 1 } }} />);    setTimeout(()=>{
      expect(wrapper).toMatchSnapshot();
      done()
    })
  });
});


describe('Edit existing answer comment', () => {
test('edit existing answer comment', (done) => {
  const wrapper = shallow(<EditAnswerComment match={{ params: { id: 1 } }} />);    setTimeout(()=>{
      wrapper.setState({answerComment:{answer_comment_id:0,text:'test',answer_id:1,user_id:1}});
      wrapper.instance().save();
      done()
  })
});
});

describe('Delete existing answer comment', () => {
    test('delete existing answer comment', (done) => {
      const wrapper = shallow(<EditAnswerComment match={{ params: { id: 1 } }} />);    setTimeout(()=>{
          wrapper.setState({answerComment:{answer_comment_id:0,text:'test',answer_id:1,user_id:1}});
          wrapper.instance().delete();
          done()
      })
    });
});

describe('site functionality', () => {
    test('edit field takes in input', (done) => {
        const wrapper = shallow(<EditAnswerComment match={{ params: { id: 1 } }} />);
        wrapper.find('FormTextarea').simulate('change', {currentTarget: {value: 'test'}});
        expect(wrapper).toMatchSnapshot();
        done()
    });
    
    test('save button registers click', (done) => {
        let buttonClicked = false
        const wrapper = shallow(
            //@ts-ignore
        <Button.Success onClick={() => (buttonClicked = true)}>test</Button.Success>,
        );
        
        wrapper.find('ButtonSuccess').simulate('click'); 
        expect(buttonClicked).toEqual(true);   
    }); 
});