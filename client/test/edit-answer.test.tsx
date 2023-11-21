import React from 'react';
import { shallow } from 'enzyme';
import { EditAnswer } from 'src/components/edit-answer'; // Adjust the import path as needed
import { Column, Button } from '../src/widgets';
import { Answer, AnswerComment } from 'src/service';
import { createHashHistory } from 'history';

const history = createHashHistory();
jest.mock('../src/service',()=>{
  class Service{
    getAnswerById(id: number){ 
      return new Promise((resolve,reject)=>{
        resolve([{answer_comment_id:1,text:'test',answer_id:1,user_id:1}]);
      });
    }
    updateAnswer(answerComment: AnswerComment){
      return new Promise((resolve,reject)=>{
        resolve([{answer_comment_id:1,text:'updatedtest',answer_id:1,user_id:1}]);
      });
    }
    deleteAnswer(id: number){
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
});


describe('Site renders', () => {
  test('Site renders correct', (done) => {
    const wrapper = shallow(<EditAnswer match={{ params: { id: 1 } }} />);    setTimeout(()=>{
      expect(wrapper).toMatchSnapshot();
      done()
    })
  });
});




describe('site functionality', () => {
    test('edit field takes in input', (done) => {
        const wrapper = shallow(<EditAnswer match={{ params: { id: 1 } }} />);
        wrapper.find('FormTextarea').simulate('change', {currentTarget: {value: 'test'}});
        expect(wrapper).toMatchSnapshot();
        done()
    });
    
    test('save button registers click', () => {
        let buttonClicked = false
        const wrapper = shallow(
        <Button.Success onClick={() => (buttonClicked = true)}>test</Button.Success>,
        );
        console.log(wrapper.debug());
        wrapper.find('button').simulate('click'); 
        expect(buttonClicked).toEqual(true);   
    }); 

    test('delete button registers click', () => {
      let buttonClicked = false
      const wrapper = shallow(
      <Button.Danger onClick={() => (buttonClicked = true)}>test</Button.Danger>,
      );
      console.log(wrapper.debug());
      wrapper.find('button').simulate('click'); 
      expect(buttonClicked).toEqual(true);   
  }); 

  });


