import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { NavBar, Card, Alert, Row, Column, Button, SideMenu, MainCard } from '../widgets';

import service, {
  Question,
  Tag,
  Tag_Question_Relation,
  Answer,
  QuestionComment,
  AnswerComment,
} from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory();
export class AnswerDetails extends Component<{ match: { params: { id: number } } }> {
answer: Answer = {answer_id: 0, text: '', confirmed_answer: false, question_id: 0};
answerComments: AnswerComment[] = [];
  render() {
    return (
      <>
        <Card title="Answer">
          <Row>
            <Column width={10}>
              <p>{this.answer.text}</p>
            </Column>
          </Row>
          <Row>
            <Column>
              <Button.Success onClick={this.confirmAnswer}>Confirm answer</Button.Success>
            </Column>
          </Row>
        </Card>
        <Card title="Comments">
          {this.answerComments.map((answerComment) => (
            <Row key={answerComment.answer_comment_id}>
              <Column width={10}>
                <p>{answerComment.text}</p>
              </Column>
              <Column width={2}>
                <NavLink to={'/answerComments/' + answerComment.answer_comment_id}>Edit</NavLink>
              </Column>
            </Row>
          ))}
        </Card>
      </>
    );
    )
  }
  mounted() {}
}
