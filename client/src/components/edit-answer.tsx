import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, Alert, Form } from '../widgets';
import service, { Answer, User} from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory();

export class EditAnswer extends Component<{ match: { params: { id: number } } }> {
  answer: Answer = { answer_id: 0, text: '', confirmed_answer: 0, last_updated: new Date(), question_id: 0, user_id: 0};
  user: User = { user_id: 0, google_id: '', username: '', email: ''};
  connectedUser: number = 0;

  render() {
    return (
      <>
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
    )
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
      alert('You must be logged in to edit answer')
    })

    service
      .getAnswerById(this.props.match.params.id)
      .then((answer) => (this.answer = answer))
      .catch((error: Error) => console.error('Error getting answer: ' + error.message));
  }

  save() {
    if(this.answer.user_id == this.connectedUser) {
    service
      .updateAnswer(this.answer)
      .then(() => history.push('/questions/' + this.answer.question_id))
      .catch((error) => console.error('Error saving answer: ' + error.message));
  }else{
    history.push('/questions/' + this.answer.question_id)
    console.error('You are not the author of this answer')
  }
}

  delete() {
    if(this.answer.user_id == this.connectedUser)  {
      service
      .deleteAnswer(this.props.match.params.id)
      .then(() => history.push('/questions/' + this.answer.question_id))
      .catch((error) => console.error('Error deleting answer: ' + error.message));
    }else{
      history.push('/questions/' + this.answer.question_id)
      console.error('You are not the author of this answer')
    }
   
  }
}


