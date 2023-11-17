import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Button, Form } from '../widgets';
import service, {Answer, AnswerComment} from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory();

export class AnswerDetails extends Component<{ match: { params: { id: number } } }> {

answer: Answer = {answer_id: 0, text: '', confirmed_answer: 0, last_updated: new Date(), question_id: 0, user_id: 0};
answerComments: AnswerComment[] = [];
answerComment: AnswerComment = {answer_comment_id: 0, text: '', answer_id: 0, user_id: 0};

  render() {
    return (
      <>
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
      .catch((error: Error) => console.error('Error getting answer: ' + error.message));
  }

  addAnswerComment() {
    service
      .createAnswerComment(this.answerComment.text, this.answer.answer_id, this.answer.user_id)
      // .then(() => history.push('/questions/' + this.answer.question_id + '/answers/' + this.answer.answer_id))
      .then(() => this.mounted())
      .catch((error) => console.error('Error adding answer comment: ' + error.message));
  }
}
