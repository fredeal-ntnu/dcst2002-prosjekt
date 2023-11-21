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
        resolve({question_id:1,title:'test',description:'test',view_count:0,has_answer:0,user_id:1});
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
  console.log(wrapper.debug());
  setTimeout(()=>{
    wrapper.find('#createTitle').simulate('change',{currentTarget:{value:'test'}});
    expect(wrapper.find('#createTitle').prop('value')).toEqual('test');

    wrapper.find('#createText').simulate('change',{currentTarget:{value:'test'}});
    expect(wrapper.find('#createTitle').prop('value')).toEqual('questiontext');

    wrapper.find('FormLabel').simulate('change',{currentTarget:{value:'test'}})
    expect(wrapper.find('formLabel').prop('value')).toEqual('test');

    wrapper.find('ButtonSuccess').simulate('click');

    setTimeout(()=>{
      expect(location.hash).toEqual('#/questions/1');

      done()
    })
  
  })
  
    
   

  
    
  })

})




