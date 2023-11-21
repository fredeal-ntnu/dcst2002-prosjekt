import React from 'react';
import { shallow } from 'enzyme';
import { AllQuestions } from 'src/components/all-question'; // Adjust the import path as needed
import { Column } from '../src/widgets';

jest.mock('../src/service',()=>{
  class Service{
    getAllQuestions(){
      return new Promise((resolve,reject)=>{
        resolve([{question_id:1,title:'test',description:'test',user_id:1,username:'test',date:'test',score:1}]);
      });
    }
    getTopFiveQuestions(){
      return new Promise((resolve,reject)=>{
        resolve([{question_id:1,title:'test',description:'test',user_id:1,username:'test',date:'test',score:1}]);
      });
    }
    getUnansweredQuestions(){
      return new Promise((resolve,reject)=>{
        resolve([{question_id:1,title:'test',description:'test',user_id:1,username:'test',date:'test',score:1}]);
      });
    }
    getAllTags(){
      return new Promise((resolve,reject)=>{
        resolve([{tag_id:1,name:'test'}]);
      });
    }
  }
return new Service();
}); // Mock the service module


describe('Site renders', () => {
  test('Site renders correct', (done) => {
    const wrapper = shallow(<AllQuestions/>);
    setTimeout(()=>{
      expect(wrapper).toMatchSnapshot();
      done()
    })
  });
  
})

describe('site functionality', () => {
  test('search onchange works', (done) => {
    const wrapper = shallow(<AllQuestions/>);
      wrapper.find('FormInput').simulate('change',{currentTarget:{value:'test'}});
      expect(wrapper).toMatchSnapshot();
      done()
    })
  });

describe('switchcase', () => {
 
  const wrapper = shallow(<AllQuestions />);

  test('switchcase all', () => {
    wrapper.find('FormSelect').simulate('change', { target: { value: 'all' } });
    expect(wrapper).toMatchSnapshot();
  })
  
  test('switchcase popular', () => {
    wrapper.find('FormSelect').simulate('change', { target: { value: 'popular' } });

    expect(wrapper).toMatchSnapshot();   
  })

    test('switchcase unanswered', () => {
      wrapper.find('FormSelect').simulate('change', { target: { value: 'unanswered' } });
      expect(wrapper).toMatchSnapshot();
    })
    
   
  });

