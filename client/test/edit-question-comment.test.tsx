import React from 'react';
import { shallow } from 'enzyme';
import { EditQuestionComment } from 'src/components/edit-question-comment'; // Adjust the import path as needed
import { Column, Button } from '../src/widgets';
import {QuestionComment } from 'src/service';
import { createHashHistory } from 'history';

const history = createHashHistory();
jest.mock('../src/service',()=>{
    class Service{
        getQuestionCommentById(id: number){
            return new Promise((resolve,reject)=>{
                resolve([{question_comment_id:1,text:'test',question_id:1,user_id:1}]);
            });
        }
        
        updateQuestionComment(questionComment: QuestionComment){
            return new Promise((resolve,reject)=>{
                resolve([{question_comment_id:1,text:'updatedtest',question_id:1,user_id:1}]);
            });
        }   
        deleteQuestionComment(id: number){
            return new Promise((resolve,reject)=>{
                resolve([{question_comment_id:1,text:'test',question_id:1,user_id:1}]);
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
        const wrapper = shallow(<EditQuestionComment match={{ params: { id: 1 } }} />);
        setTimeout(()=>{
            expect(wrapper).toMatchSnapshot();
            done()
        })
    });
});

describe('Edit existing question comment', () => {
    test('edit existing question comment', (done) => {
        const wrapper = shallow(<EditQuestionComment match={{ params: { id: 1 } }} />);
        setTimeout(()=>{
            wrapper.setState({questionComment:{question_comment_id:0,text:'test',question_id:1,user_id:1}});
            wrapper.instance().save();
            done()
        })
    })
})

describe('Delete existing question comment', () => {
    test('delete existing question comment', (done) => {
        const wrapper = shallow(<EditQuestionComment match={{ params: { id: 1 } }} />);
        setTimeout(()=>{
            wrapper.setState({questionComment:{question_comment_id:0,text:'test',question_id:1,user_id:1}});
            wrapper.instance().delete();
            done()
        })
    })
})

describe('site functionality', () => {
    test('edit field takes input', (done) => {
        const wrapper = shallow(<EditQuestionComment match={{ params: { id: 1 } }} />);
        console.log(wrapper.debug());
        
            wrapper.find('FormTextarea').simulate('change',{target:{value:'test'}});
            expect(wrapper).toMatchSnapshot();
            done()
        })
    })
