import React from 'react';
import {shallow } from 'enzyme';
import service from 'src/service';
import { MyQuestions } from 'src/components/my-questions';
import { Row, Column } from 'src/widgets';


// jest.mock('src/service', () => ({
//     getMe: jest.fn(() => Promise.resolve({ user_id: '123' })),
//     getQuestionsByUserid: jest.fn(() => Promise.resolve([])),
//     getUserTopFiveQuestions: jest.fn(() => Promise.resolve([])),
//     getUserUnansweredQuestions: jest.fn(() => Promise.resolve([])),
//     getAllTags: jest.fn(() => Promise.resolve(['tag1', 'tag2'])), // Mock the response as needed
//   }));
  
//   describe('MyQuestions tests', () => {
//     let wrapper;
  
//     beforeEach(() => {
//       wrapper = shallow(<MyQuestions />);
//     });
  
//     it('should load questions for all filter', async () => {
//       await wrapper.instance().loadQuestions();
  
//       // Add your assertions here
//       expect(wrapper.state('questions')).toEqual([]);
//     });
  
//     // Add more test cases for different filters
  
//     it('should handle errors', async () => {
//       // Mocking a rejected promise for testing error handling
//       jest.spyOn(console, 'error').mockImplementation(() => {});
  
//       // Mocking a rejected promise for testing error handling
//       jest.spyOn(wrapper.instance().service, 'getQuestionsByUserid').mockRejectedValueOnce(new Error('Mocked error'));
  
//       await wrapper.instance().loadQuestions();
  
//       // Add your assertions here
//       expect(console.error).toHaveBeenCalledWith('Mocked error');
  
//       // Restore the console.error mock
//       console.error.mockRestore();
//     });
//   });






jest.mock('src/service', () => {
    class Service {
        getQuestionsByUserId() {
            return Promise.resolve([
                { question_id: 1, title: 'Test Question 1', text: 'Test Text 1' },
                { question_id: 2, title: 'Test Question 2', text: 'Test Text 2' },
                { question_id: 3, title: 'Test Question 3', text: 'Test Text 3' },
            ]);
            
        }
        getMe() {
            return Promise.resolve({ user_id: 1 });
        }

        getAllTags() {
            return Promise.resolve(['tag1', 'tag2']);
        }
    }
    return new Service();
});



describe('MyQuestions Component tests', () => {
    test('renders without crashing', (done) => {
        const wrapper = shallow(<MyQuestions />);
        setTimeout(() => {
            expect(wrapper.containsAllMatchingElements([
                <Row>
                    <Column>
                        Test Question 1
                    </Column>
                    <Column>
                        Test Text 1
                    </Column>
                </Row>,
                <Row>
                    <Column>
                        Test Question 2
                    </Column>
                    <Column>
                        Test Text 2
                    </Column>
                </Row>,
                <Row>
                    <Column>
                        Test Question 3
                    </Column>
                    <Column>
                        Test Text 3
                    </Column>
                </Row>
            ])
            ).toBe(true);
            done();
        });
    })

})
