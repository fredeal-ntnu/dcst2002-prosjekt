import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, Alert, Form } from '../widgets';
import service, { Question, QuestionComment, User } from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory();

export class EditQuestion extends Component<{ match: { params: { id: number } } }> {
  question: Question = {
    question_id: 0,
    title: '',
    text: '',
    view_count: 0,
    has_answer: 0,
    user_id: 0,
  };
  questionComment: QuestionComment = { question_comment_id: 0, text: '', question_id: 0, user_id: 0 };

  user: User = { user_id: 0, google_id: '', username: '', email: '' };
  connectedUser: number = 0;  

  render() {
    return (
      <>
        <Row>
          <Card title="Edit Question">
            <Row>
              <Column>
                <Form.Input
                  placeholder="Title"
                  type="text"
                  value={this.question.title}
                  onChange={(event) => (this.question.title = event.currentTarget.value)}
                />
              </Column>
              <Column>
                <Form.Textarea
                  placeholder="Text"
                  type="text"
                  value={this.question.text}
                  onChange={(event) => (this.question.text = event.currentTarget.value)}
                  rows={5}
                />
              </Column>
            </Row>
          </Card>
        </Row>
        <Row>
          <Column width={6}>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column width={6}>
            <Button.Danger onClick={this.delete}>Delete</Button.Danger>
          </Column>
        </Row>
      </>
    );
  }

  mounted() {
    service.getMe()
    .then((user) => {
      this.user.user_id = user.user_id
      this.connectedUser = this.user.user_id;
    })
    .catch((error)=>{
      console.error(error.message)
      history.push('/')
      alert('You must be logged in to edit question')
    })


    service
      .getQuestion(this.props.match.params.id)
      .then((question) => (this.question = question))
      .catch((error: Error) => console.error('Error getting question: ' + error.message));
  }

  save() {
    service
      .updateQuestion(this.question)
      .then(() => history.push('/questions/' + this.question.question_id))
      .catch((error) => console.error('Error saving question: ' + error.message));
  }

  delete() {
    service
      .deleteQuestion(this.props.match.params.id)
      .then(() => history.push('/questions'))
      .catch((error) => console.error('Error deleting question: ' + error.message));
  }
}
