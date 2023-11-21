import React from 'react';
import { shallow } from 'enzyme';
import { EditQuestion } from 'src/components/edit-question'; // Adjust the import path as needed
import { Column, Button } from '../src/widgets';
import { Question } from 'src/service';
import { createHashHistory } from 'history';

const history = createHashHistory();
jest.mock('../src/service',()=>{
    class Service{
        getQuestion(id: number){
            return new Promise((resolve,reject)=>{
                resolve([{question_id:1,title:'test',text:'test',view_count:1,has_answer:1,user_id:1}]);
            });
        }
        
        updateQuestion(question: Question){
            return new Promise((resolve,reject)=>{
                resolve([{question_id:1,title:'updatedtest',text:'updatedtest',view_count:1,has_answer:1,user_id:1}]);
            });
        }   
        deleteQuestion(id: number){
            return new Promise((resolve,reject)=>{
                resolve([{question_id:1,title:'test',text:'test',view_count:1,has_answer:1,user_id:1}]);
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
        const wrapper = shallow(<EditQuestion match={{ params: { id: 1 } }} />);
        setTimeout(()=>{
            expect(wrapper).toMatchSnapshot();
            done()
        })
    });
});

describe('site functionality', () => {
    test('title edit field takes input', (done) => {
        const wrapper = shallow(<EditQuestion match={{ params: { id: 1 } }} />);
            wrapper.find('FormInput').simulate('change',{currentTarget:{value:'test'}});
            expect(wrapper).toMatchSnapshot();
            done()
        })
    
    test('text edit field takes input', (done) => {
        const wrapper = shallow(<EditQuestion match={{ params: { id: 1 } }} />);
            wrapper.find('FormTextarea').simulate('change',{currentTarget:{value:'test'}});
            expect(wrapper).toMatchSnapshot();
            done()
        })
    test('save button registers clcik', () => {
        let buttonClicked = false
        const wrapper = shallow(
            <Button.Success onClick={()=> (buttonClicked = true)}>test</Button.Success>,
        );
        wrapper.find('button').simulate('click');
        expect(buttonClicked).toEqual(true);
    })

    test('delete button registers click', () => {
        let buttonClicked = false
        const wrapper = shallow(
            <Button.Danger onClick={()=> (buttonClicked = true)}>test</Button.Danger>,
        );
        wrapper.find('button').simulate('click');
        expect(buttonClicked).toEqual(true);
    })
})
