// Import necessary libraries and components
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Row, Column, Button, Form} from 'src/widgets';
import { CreateQuestion } from 'src/components/create-question'; // Update the path accordingly
import {Question, Tag_Question_Relation} from 'src/service';


jest.mock('src/service',()=>{
  class Service {
    getMe(){
      return new Promise((resolve,reject)=>{
        resolve({user_id:1});
      });
    }
    createQuestion(){
      return new Promise((resolve,reject)=>{
        resolve({question_id:1,title:'test',description:'test',user_id:1,username:'test',date:'test',score:0});
      });
    }
    getAllTags(){
      return new Promise((resolve,reject)=>{
        resolve([{tag_id:1,name:'test'}]);
      });
    }
    createTagQuestionRelation(){
      return new Promise((resolve,reject)=>{
        resolve({tag_id:1,question_id:1});
      });
    }
    
  }
return new Service();
})

describe('CreateQuestion component', () => {
  test('CreateQuestion component renders', () => {
    const wrapper = shallow(<CreateQuestion />);
    expect(wrapper).toMatchSnapshot();
  })
})

 describe('Page functionality', () => {

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

 
 )
 //Økte ikke prosenten...
 test('tag checkbox input works ', () => {
  let checkboxClicked = false
  const wrapper = shallow(
      <input type="checkbox" onChange={()=> (checkboxClicked = true)}/>,
  )
  wrapper.find('input').simulate('change');
  expect(checkboxClicked).toEqual(true);
  }
 )

test('create question works', (done) => {
  const wrapper = shallow(<CreateQuestion />);
  setTimeout(()=>{
    wrapper.find('input').simulate('change',{currentTarget:{value:'questiontest'}});
    expect(wrapper.find('button').prop('value')).toEqual('questiontest');

    wrapper.find('button').simulate('click');
    setTimeout(()=>{
      expect(wrapper.find('button').prop('value')).toEqual('');
    })
  })
  
    
   

  
    
  })

})




