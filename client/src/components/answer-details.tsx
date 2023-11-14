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
      {console.log(this.answerComments)}
        <Card title="Answer">
          <Row>
            <Column width={10}>
              {this.answer.text}
            </Column>
          </Row>
          <Row>
          </Row>
        </Card>
        <Card title="Comments">
          {this.answerComments.map((answerComment) => (
            <Row key={answerComment.answer_comment_id}>
              <Column width={10}>
                {answerComment.text}
                
              </Column>
            </Row>
          ))}
        </Card>
      </>
    );
    
  }

  mounted() {
    service
      .getAnswerById(this.props.match.params.id)
      .then((answer) => {
        this.answer = answer;
        return service.getAnswerCommentsForAnswer(this.answer.answer_id);
      })
      .then((answerComments) => (this.answerComments = answerComments))
      .catch((error: Error) => Alert.danger('Error getting answer: ' + error.message));
  }
}
