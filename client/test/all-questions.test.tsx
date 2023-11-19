// Import necessary libraries and components
import React from 'react';
import { shallow, mount } from 'enzyme';
import { AllQuestions } from 'src/components/all-question';
import service from 'src/service';

// Mock the service module to simulate API calls
jest.mock('src/service', () => ({
  getAllQuestions: jest.fn(() => Promise.resolve([])),
  getTopFiveQuestions: jest.fn(() => Promise.resolve([])),
  getUnansweredQuestions: jest.fn(() => Promise.resolve([])),
  getAllTags: jest.fn(() => Promise.resolve([])),
}));

describe('AllQuestions Component', () => {
  let wrapper;

  beforeEach(() => {
    // Shallow render the component before each test
    wrapper = shallow(<AllQuestions />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('initializes state correctly', () => {
    expect(wrapper.state('questions')).toEqual([]);
    expect(wrapper.state('filter')).toBe('all');
    expect(wrapper.state('tags')).toEqual([]);
    expect(wrapper.state('search')).toBe('');
  });

  it('loads questions on mount', () => {
    // Mock the componentDidMount lifecycle method
    const loadQuestionsMock = jest.spyOn(AllQuestions.prototype, 'loadQuestions');
    
    // Mount the component to trigger the lifecycle method
    mount(<AllQuestions />);
    
    // Expect the loadQuestions method to be called once
    expect(loadQuestionsMock).toHaveBeenCalledTimes(1);

    // Restore the mock after the test
    loadQuestionsMock.mockRestore();
  });

  it('handles filter change correctly', () => {
    const select = wrapper.find('Form.Select');
    
    // Simulate a filter change event
    select.simulate('change', { target: { value: 'popular' } });
    
    // Expect the component state to be updated
    expect(wrapper.state('filter')).toBe('popular');
  });

  it('renders questions correctly', async () => {
    const questions = [
      { id: 1, title: 'Question 1' },
      { id: 2, title: 'Question 2' },
    ];

    // Mock the service method to return questions
    service.getAllQuestions.mockResolvedValueOnce(questions);

    // Update the component to reflect the new state
    await wrapper.update();

    // Expect the QuestionCard components to be rendered based on the number of questions
    expect(wrapper.find('QuestionCard')).toHaveLength(questions.length);
  });

  it('handles search input correctly', () => {
    const input = wrapper.find('Form.Input');

    // Simulate a search input change event
    input.simulate('change', { currentTarget: { value: 'search query' } });

    // Expect the component state to be updated
    expect(wrapper.state('search')).toBe('search query');
  });
});