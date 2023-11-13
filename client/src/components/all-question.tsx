import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Column, Row, Form, SideMenu, QuestionCard } from '../widgets';
import service, { Question, Tag } from '../service';
import { EyeIcon } from '../icons';
import { NavLink } from 'react-router-dom';

export class AllQuestions extends Component {
    questions: Question[] = [];
    filter: string = 'all'; // State to manage the filter type
    tags: Tag[] = [];
    search = '';
  
    render() {
      let questionsCount = this.questions.length;
      return (
        <Row>
          {/* Side Menu or other content */}
          <Column width={3}>
            <SideMenu header='Menu'
            items={[
              { label: "Questions", to: "/questions" },
              { label: "Tags", to: "/tags" },
              {label: "New Question", to: "createquestion"},
              {label: "My Questions", to: "myquestion"}
            ]}/>
          </Column>
  
          {/* Main content */}
          <Column>
            <Card title='All Questions'><br />
              <Row>
                <Column>{questionsCount} questions in total</Column>
                <Column>
                  <Form.Select value={this.filter} onChange={this.handleFilterChange}>
                    <option value="all">All Questions</option>
                    <option value="popular">Most Popular</option>
                    <option value="unanswered">Unanswered</option>
                  </Form.Select>
                </Column>
                <Column>
                  <Form.Input
                    type='text' 
                    placeholder='Search...'
                    value={this.search} 
                    onChange={(event) => this.search = event.currentTarget.value}
                  />
                </Column>
              </Row>
              {/* ... rest of your component */}
            </Card>
            {this.questions
              .filter((question) => (question.title.toLowerCase().includes(this.search.toLowerCase())))
              .map((question, i) => (
                <QuestionCard key={i} question={question} />
              ))
            }
          </Column>
        </Row>
      );
    }

    handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.filter = event.target.value;
        console.log(this.filter);
        this.loadQuestions() // Call a method to load questions based on the selected filter
      };
  
    // Method to load questions based on the current filter
    loadQuestions() {
      // Add logic here to fetch and filter questions accordingly
      // This is a placeholder for whatever your service methods might be
      switch (this.filter) {
        case 'all':
            service
                .getAllQuestions()
                .then((questions) => (this.questions = questions))
                .catch((error) => Alert.danger(error.message));
          break;
        case 'popular':
            service
                .getTopFiveQuestions()
                .then((questions) => (this.questions = questions))
                .catch((error) => Alert.danger(error.message));
          break;
        case 'unanswered':
            service
                .getUnansweredQuestions()
                .then((questions) => (this.questions = questions))
                .catch((error) => Alert.danger(error.message));
          break;
      }
    }
  
    // Lifecycle method to load questions when the component mounts
    mounted() {
      this.loadQuestions();

      service
        .getAllTags()
        .then((tags) => (this.tags = tags))
        .catch((error) => Alert.danger(error.message));   
  }
}