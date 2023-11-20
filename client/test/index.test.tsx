import React from 'react';
import { shallow } from 'enzyme';
import { EditQuestion } from 'src/components/edit-question'; // Adjust the import path as needed
import { Column, Button } from '../src/widgets';
import { Question } from 'src/service';
import { createHashHistory } from 'history';

const history = createHashHistory();
jest.mock('../src/service',()=>{
    class Service{
        getAllQuestions(){
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

