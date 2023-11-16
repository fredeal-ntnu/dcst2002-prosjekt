import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, Alert, Form } from '../widgets';
import service, { Answer,} from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory();

export class EditAnswer extends Component<{ match: { params: { id: number } } }> {
  answer: Answer = { answer_id: 0, text: '', confirmed_answer: 0, last_updated: new Date(), question_id: 0, user_id: 0};

  render() {
    return (
      <>
      {console.log(this.answer)}
        <Row>
          <Card title="Edit Answer">
            <Row>
              <Column>
                <Form.Textarea
                  placeholder="Edit answer"
                  type="text"
                  value={this.answer.text}
                  onChange={(event) => (this.answer.text = event.currentTarget.value)}
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
    service
      .getAnswerById(this.props.match.params.id)
      .then((answer) => (this.answer = answer))
      .catch((error: Error) => Alert.danger('Error getting answer: ' + error.message));
  }

  save() {
    service
      .updateAnswer(this.answer)
      .then(() => history.push('/questions/' + this.answer.question_id))
      .catch((error) => Alert.danger('Error saving answer: ' + error.message));
  }

  delete() {
    service
      .deleteAnswer(this.props.match.params.id)
      .then(() => history.push('/questions/' + this.answer.question_id))
      .catch((error) => Alert.danger('Error deleting answer: ' + error.message));
  }
}
