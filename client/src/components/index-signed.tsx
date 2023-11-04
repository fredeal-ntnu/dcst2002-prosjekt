import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import {NavBar, Card, Alert, CardQuestions, CardHome, Row, Column } from '../widgets';
import service, { Question } from '../service';
export class IndexSigned extends Component {
  questions: Question[] = [];
  render() {
    return (
      <Card title="">
        <div className="row">
          <CardHome header="Profile"
            items={[{ label: "Questions", to: "/questions" }, { label: "Tags", to: "/tags" }, {label: "New Question", to: "createquestion"}, {label: "My Questions", to: "myquestion"}]}/>
          <CardQuestions header="Top Questions">
          {this.questions.map((question) => (
            <Row key={question.question_id}>
              {question.title}<br></br>{question.text}
            </Row>
          ))}
        </CardQuestions>
          
        </div> 
      </Card>
    );
  }};

 