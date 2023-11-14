import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { NavBar, Card, Alert, Row, Column, Button, SideMenu, MainCard, Form } from '../widgets';

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
answerComment: AnswerComment = {answer_comment_id: 0, text: '', answer_id: 0};
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
                <Column>
                <Button.Success  onClick={() => 
                  history.push('/questions/' + this.answer.question_id + '/answers/' + answerComment.answer_id +'/comments/' + answerComment.answer_comment_id+'/edit')}>
                  Edit</Button.Success></Column>
              </Column>
            </Row>
          ))}
         
        </Card>
      
            <Card title="Add Comment">
            <Form.Textarea
                  placeholder="Add comment"
                  type="text"
                  value={this.answerComment.text}
                  onChange={(event) => (this.answerComment.text = event.currentTarget.value)}
                />
            <Column>
                  <Button.Success onClick={this.addAnswerComment}>Add Comment</Button.Success>
            </Column>
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

  addAnswerComment() {
    service
      .createAnswerComment(this.answerComment.text, this.answer.answer_id)
      .then(() => history.push('/questions/' + this.answer.question_id + '/answers/' + this.answer.answer_id))
      .catch((error) => Alert.danger('Error adding answer comment: ' + error.message));
  }
}
