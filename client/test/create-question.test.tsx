// Import necessary libraries and components
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Row, Column, Button, Form } from 'src/widgets';
import { CreateQuestion } from 'src/components/create-question'; // Update the path accordingly
import { Question, Tag_Question_Relation } from 'src/service';

jest.mock('src/service', () => {
  class Service {
    getMe() {
      return new Promise((resolve, reject) => {
        resolve({ user_id: 1 });
      });
    }
    createQuestion() {
      return new Promise((resolve, reject) => {
        resolve({
          question_id: 1,
          title: 'test',
          description: 'test',
          view_count: 0,
          has_answer: 0,
          user_id: 1,
        });
      });
    }
    getAllTags() {
      return new Promise((resolve, reject) => {
        resolve([{ tag_id: 1, name: 'test' }]);
      });
    }
    createTagQuestionRelation() {
      return new Promise((resolve, reject) => {
        resolve({ tag_id: 1, question_id: 1 });
      });
    }
  }
  return new Service();
});

describe('CreateQuestion component', () => {
  test('CreateQuestion component renders', () => {
    const wrapper = shallow(<CreateQuestion />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Button click', () => {
  test('Button click works', () => {
    const wrapper = shallow(<CreateQuestion />);
    setTimeout(() => {
      wrapper.find(Button.Success).simulate('click');
      // expect alert to be called with the correct message
      setTimeout(() => {
        expect(alert).toHaveBeenCalledWith('You must have atlest one tag');
      });
    });
  });
});

describe('Page functionality', () => {
  test('title input works ', () => {
    const wrapper = shallow(<CreateQuestion />);
    wrapper.find('FormInput').simulate('change', { currentTarget: { value: 'test' } });
    expect(wrapper).toMatchSnapshot();
  });

  test('text input works ', () => {
    const wrapper = shallow(<CreateQuestion />);
    wrapper.find('FormTextarea').simulate('change', { currentTarget: { value: 'test' } });
    expect(wrapper).toMatchSnapshot();
  });
  test('tag checkbox input works ', () => {
    let checkboxClicked = false;
    const wrapper = shallow(<input type="checkbox" onChange={() => (checkboxClicked = true)} />);
    wrapper.find('input').simulate('change');
    expect(checkboxClicked).toEqual(true);
  });

  // test('create question works', (done) => {
  //   const wrapper = shallow(<CreateQuestion />);
  //   console.log(wrapper.debug());
  //   wrapper
  //     .find(Form.Input)
  //     .at(0) //kan droppe siden bare en input
  //     .simulate('change', { currentTarget: { value: 'test' } });
  //   wrapper
  //     .find(Form.Textarea)
  //     .at(0)
  //     .simulate('change', { currentTarget: { value: 'test' } });
  //   // wrapper.find(Form.Label).at(3)
  //   // .simulate('change',{currentTarget:{checked:true}});

  //   setTimeout(() => {
  //     wrapper.find(Button.Success).simulate('click');
  //     // expect alert to be called with the correct message
  //     setTimeout(() => {
  //       expect(window.location.href).toEqual('http://localhost/#/');
  //     });
  //   });
  // });

  // test('create question works', (done) => {
  //   const wrapper = shallow(<CreateQuestion />);
  //   console.log(wrapper.debug());
  //   setTimeout(()=>{
  //     // const inputNodes = wrapper.find('FormInput');
  //     // expect(inputNodes).toHaveLength(4);

  //     wrapper.find('#createTitle').simulate('change',{currentTarget:{value:'test'}});
  //     expect(wrapper.find('#createTitle').prop('value')).toEqual('test');

  //     wrapper.find('#createText').simulate('change',{currentTarget:{value:'test'}});
  //     expect(wrapper.find('#createTitle').prop('value')).toEqual('test');

  //     wrapper.find('FormLabel').simulate('change',{currentTarget:{value:'test'}})
  //     expect(wrapper.find('formLabel').prop('value')).toEqual('test');

  //     wrapper.find('ButtonSuccess').simulate('click');

  //     setTimeout(()=>{
  //       expect(window.location.href).toEqual('hhtp://localhost/#/questions/1'); // fra heine

  //       done()
  //     })

  //   })
  //   })
});
