import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Column, Row, Form, SideMenu, QuestionCard } from '../widgets';
import service, { Question, Tag, User } from '../service';

export class MyQuestions extends Component {
  questions: Question[] = [];
  filter: string = 'all';
  tags: Tag[] = [];
  search = '';
  user: User = { user_id: 0, google_id: '', username: '', email: '' };

  render() {
    let questionsCount = this.questions.length;
    return (
      <Row>
        <Column width={3}>
          <SideMenu
            header="Menu"
            items={[
              { label: 'Questions', to: '/questions' },
              { label: 'My Questions', to: 'myquestions' },
              { label: 'My Favourite Answers', to: 'favourites' },
              { label: 'New Question', to: 'createquestion' },
              { label: 'Tags', to: '/tags' },
            ]}
          />
        </Column>
        <Column>
          <Card title="My Questions">
            <br />
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
                  type="text"
                  placeholder="Search..."
                  value={this.search}
                  onChange={(event) => (this.search = event.currentTarget.value)}
                />
              </Column>
            </Row>
          </Card>
          {this.questions
            .filter((question) => question.title.toLowerCase().includes(this.search.toLowerCase()))
            .map((question, i) => (
              <QuestionCard key={i} question={question} />
            ))}
        </Column>
      </Row>
    );
  }

  handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.filter = event.target.value;
    this.loadQuestions(); 
  };

  // Method to load questions based on the current filter
  loadQuestions() {
    switch (this.filter) {
      case 'all':
        service
          .getQuestionsByUserid(this.user.user_id)
          .then((questions) => (this.questions = questions))
          .catch((error) => console.error(error.message));
        break;
      case 'popular':
        service
          .getUserTopFiveQuestions(this.user.user_id)
          .then((questions) => (this.questions = questions))
          .catch((error) => console.error(error.message));
        break;
      case 'unanswered':
        service
          .getUserUnansweredQuestions(this.user.user_id)
          .then((questions) => (this.questions = questions))
          .catch((error) => console.error(error.message));
        break;
    }
  }

  mounted() {
    // Get logged in user
    service
      .getMe()
      .then((user) => {
        this.user = user;
        return service.getQuestionsByUserid(this.user.user_id);
      })
      .then((questions) => {
        this.questions = questions;
        return this.loadQuestions();
      })
      .catch((error) => console.error('Error getting answer: ' + error.message));

    service
      .getAllTags()
      .then((tags) => (this.tags = tags))
      .catch((error) => console.error(error.message));
  }
}
