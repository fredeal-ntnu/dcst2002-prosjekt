// Import necessary libraries and components
import React from 'react';
import { shallow, mount } from 'enzyme';
import { CreateQuestion } from 'src/components/create-question'; // Update the path accordingly
import service from 'src/service';

// Mock the service module to simulate API calls
jest.mock('src/service', () => ({
  getAllTags: jest.fn(() => Promise.resolve([])),
  getMe: jest.fn(() => Promise.resolve({ user_id: 1 })),
  createQuestion: jest.fn(() => Promise.resolve(1)),
  createTagQuestionRelation: jest.fn(() => Promise.resolve()),
}));

describe('CreateQuestion Component', () => {
  let wrapper;

  beforeEach(() => {
    // Shallow render the component before each test
    wrapper = shallow(<CreateQuestion />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('initializes state correctly', () => {
    expect(wrapper.state('title')).toBe('');
    expect(wrapper.state('text')).toBe('');
    expect(wrapper.state('user_id')).toBe(0);
    expect(wrapper.state('connectedUser')).toBe(0);
    expect(wrapper.state('tags')).toEqual([]);
    expect(wrapper.state('selectedTags')).toEqual([]);
  });

  it('loads tags on mount', async () => {
    const tags = [{ tag_id: 1, name: 'Tag 1' }];

    // Mock the service method to return tags
    service.getAllTags.mockResolvedValueOnce(tags);

    // Update the component to reflect the new state
    await wrapper.instance().mounted();

    // Expect the tags to be set in the component's state
    expect(wrapper.state('tags')).toEqual(tags);
  });

  it('handles checkbox change correctly', () => {
    const event = { target: { value: '1', checked: true } };

    // Simulate a checkbox change event
    wrapper.instance().handleCheckboxChange(event);

    // Expect the selectedTags state to be updated
    expect(wrapper.state('selectedTags')).toEqual([1]);
  });

  it('handles add question correctly', async () => {
    const event = { preventDefault: jest.fn() };

    // Simulate setting some state values
    wrapper.setState({
      title: 'Test Title',
      text: 'Test Text',
      user_id: 1,
      selectedTags: [1],
    });

    // Mock the service method to return a question_id
    service.createQuestion.mockResolvedValueOnce(1);

    // Simulate the add question event
    await wrapper.instance().handleAddQuestion(event);

    // Expect the createQuestion and createTagQuestionRelation methods to be called
    expect(service.createQuestion).toHaveBeenCalledWith('Test Title', 'Test Text', 1);
    expect(service.createTagQuestionRelation).toHaveBeenCalledWith(1, 1);

    // Expect the history.push to be called with the correct path
    expect(history.push).toHaveBeenCalledWith('/questions/1');
  });
});
