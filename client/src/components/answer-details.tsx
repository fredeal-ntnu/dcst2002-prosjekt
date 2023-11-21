import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, Form } from '../widgets';
import service, { Answer, AnswerComment, User } from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory();

export class AnswerDetails extends Component<{ match: { params: { id: number } } }> {
  answerComments: AnswerComment[] = [];
  answer: Answer = {
    answer_id: 0,
    text: '',
    confirmed_answer: 0,
    last_updated: new Date(),
    question_id: 0,
    user_id: 0,
  };
  answerComment: AnswerComment = { answer_comment_id: 0, text: '', answer_id: 0, user_id: 0 };
  user: User = { user_id: 0, google_id: '', username: '', email: '' };
  connectedUser: number = 0;

  render() {
    return (
      <>
        <Card title="Answer">
          <Row>
            <Column width={10}>{this.answer.text}</Column>
          </Row>
        </Card>
        <Card title="Comments">
          {this.answerComments.map((answerComment) => (
            <Row key={answerComment.answer_comment_id}>
              <Column width={10}>
                {answerComment.text}
                <Column>
                  <Button.Success
                    onClick={() =>
                      history.push(
                        '/questions/' +
                          this.answer.question_id +
                          '/answers/' +
                          answerComment.answer_id +
                          '/comments/' +
                          answerComment.answer_comment_id +
                          '/edit',
                      )
                    }
                  >
                    Edit
                  </Button.Success>
                </Column>
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
            maxLength={1000}
            style={{ width: '500px' }}
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

      //Get logged in user
      .getMe()
      .then((user) => {
        this.user = user;
        this.connectedUser = this.user.user_id;
      })
      .catch((error) => {
        console.error(error.message);
        history.push('/');
        alert('You must be logged in to access this page');
      });

    service
      .getAnswerById(this.props.match.params.id)
      .then((answer) => {
        this.answer = answer;
        return service.getAnswerCommentsForAnswer(this.answer.answer_id);
      })
      .then((answerComments) => (this.answerComments = answerComments))
      .catch((error: Error) => console.error('Error getting answer: ' + error.message));
  }

  addAnswerComment() {
    
    if(this.connectedUser) {
      service
      .createAnswerComment(this.answerComment.text, this.answer.answer_id, this.connectedUser)
      .then(() => this.mounted())
      .then(() => (this.answerComment.text = ''))
      .catch((error) => console.error('Error adding answer comment: ' + error.message));
    }else return
    
  }
}
