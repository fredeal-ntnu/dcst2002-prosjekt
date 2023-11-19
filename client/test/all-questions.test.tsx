import React from 'react';
import { shallow } from 'enzyme';
import { AllQuestions } from 'src/components/all-question'; // Adjust the import path as needed
import service from 'src/service'; // Adjust the import path as needed

jest.mock('src/service'); // Mock the service module

describe('AllQuestions Component', () => {
  let wrapper;

  beforeEach(() => {
    // Mock the service methods
    service.getAllQuestions.mockResolvedValue([]);
    service.getTopFiveQuestions.mockResolvedValue([]);
    service.getUnansweredQuestions.mockResolvedValue([]);
    service.getAllTags.mockResolvedValue([]);

    wrapper = shallow(<AllQuestions />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe('Rendering Child Components', () => {
    it('renders SideMenu', () => {
      expect(wrapper.find('SideMenu').exists()).toBe(true);
    });

    it('renders QuestionCard for each question', () => {
      wrapper.setState({ questions: [{ id: 1 }, { id: 2 }] });
      expect(wrapper.find('QuestionCard').length).toBe(2);
    });

    it('renders SideMenu with correct props', () => {
      expect(wrapper.find('SideMenu').prop('header')).toEqual('Menu');
      // Add assertions for other props as needed
    });
  });

  describe('State Management', () => {
    it('updates state correctly on filter change', () => {
      wrapper.find('Form.Select').simulate('change', { target: { value: 'popular' } });
      expect(wrapper.state('filter')).toBe('popular');
    });

    it('updates state correctly on search input change', () => {
      wrapper.find('Form.Input[type="text"]').simulate('change', { currentTarget: { value: 'test search' } });
      expect(wrapper.state('search')).toBe('test search');
    });
  });

  describe('Component Methods', () => {
    it('handleFilterChange updates filter state and calls loadQuestions', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'loadQuestions');
      instance.handleFilterChange({ target: { value: 'unanswered' } });
      expect(wrapper.state('filter')).toEqual('unanswered');
      expect(instance.loadQuestions).toHaveBeenCalled();
    });

    describe('loadQuestions Method', () => {
      it('calls correct service method based on filter state', async () => {
        await wrapper.instance().loadQuestions();
        expect(service.getAllQuestions).toHaveBeenCalled();

        wrapper.setState({ filter: 'popular' });
        await wrapper.instance().loadQuestions();
        expect(service.getTopFiveQuestions).toHaveBeenCalled();

        wrapper.setState({ filter: 'unanswered' });
        await wrapper.instance().loadQuestions();
        expect(service.getUnansweredQuestions).toHaveBeenCalled();
      });
    });
  });

  describe('Lifecycle Methods', () => {
    it('calls loadQuestions and getAllTags on component mount', () => {
      const loadQuestionsSpy = jest.spyOn(AllQuestions.prototype, 'loadQuestions');
      const getAllTagsSpy = jest.spyOn(service, 'getAllTags');

      shallow(<AllQuestions />);
      expect(loadQuestionsSpy).toHaveBeenCalled();
      expect(getAllTagsSpy).toHaveBeenCalled();
    });
  });

  describe('Conditional Rendering and Behavior', () => {
    it('displays the correct number of questions', () => {
      const testQuestions = [{ id: 1 }, { id: 2 }, { id: 3 }];
      wrapper.setState({ questions: testQuestions });
      const displayedText = wrapper.find('Column').at(0).text();
      expect(displayedText).toContain(`${testQuestions.length} questions in total`);
    });

    it('filters questions based on search input', () => {
      const testQuestions = [
        { id: 1, title: 'React Testing' },
        { id: 2, title: 'Enzyme Tutorial' },
        { id: 3, title: 'Jest Overview' }
      ];
      wrapper.setState({ questions: testQuestions, search: 'enzyme' });
      const filteredQuestions = wrapper.instance().questions.filter(q => q.title.toLowerCase().includes('enzyme'));
      expect(filteredQuestions.length).toBe(1);
    });
  });

  // Additional tests (if any) go here
});
