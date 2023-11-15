import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { NavBar, Card, Alert, SideMenu, Row, Column } from '../widgets';
import service, { Question } from '../service';
export class IndexSigned extends Component {
  questions: Question[] = [];
  render() {
    return (
      <Card title="">
        <div className="row">
        <SideMenu header='Menu'
            items={[
              { label: "Questions", to: "/questions" },
              { label: "My Questions", to: "myquestions" },
              { label: "My Favourite Answers", to: "favourites" },
              { label: "New Question", to: "createquestion" },
              { label: "Tags", to: "/tags" }
            ]}/>
          <Card title="Top Questions">
            {this.questions.map((question) => (
              <Row key={question.question_id}>
                {question.title}
                <br></br>
                {question.text}
              </Row>
            ))}
          </Card>
        </div>
      </Card>
    );
  }
  mounted() {
    service.getTopFiveQuestions().then((questions) => (this.questions = questions));
  }
}
