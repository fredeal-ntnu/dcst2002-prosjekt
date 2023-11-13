import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { NavBar, Card, Alert, MainCard, SideMenu, Row, Column } from '../widgets';
import service, { Question } from '../service';
export class IndexSigned extends Component {
  questions: Question[] = [];
  render() {
    return (
      <Card title="">
        <div className="row">
          <SideMenu
            header="Private"
            items={[
              { label: 'Questions', to: '/all-questions' },
              { label: 'New Question', to: 'createquestion' },
              { label: 'My Questions', to: 'myquestion' },
            ]}
          />
          <MainCard header="Top Questions">
            {this.questions.map((question) => (
              <Row key={question.question_id}>
                {question.title}
                <br></br>
                {question.text}
              </Row>
            ))}
          </MainCard>
        </div>
      </Card>
    );
  }
  mounted() {
    service.getTopFiveQuestions().then((questions) => (this.questions = questions));
  }
}
