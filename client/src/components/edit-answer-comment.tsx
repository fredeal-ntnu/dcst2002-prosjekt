import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Button, Form} from '../widgets';
import service, {AnswerComment, User} from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory();
// let history = useHistory();
export class EditAnswerComment extends Component<{ match: { params: { id: number } } }> {
  answerComments: AnswerComment[] = [];
  answerComment: AnswerComment = {answer_comment_id: 0, text: '', answer_id: 0, user_id: 0};
  user: User = { user_id: 0, google_id: '', username: '', email: '' };
  connectedUser: number = 0;
  


  render() {
    return(
      <>
      <Card title="Edit Comment">
        <Row>
          <Column width={10}>
          <Form.Textarea
                type="text"
                value={this.answerComment.text}
                onChange={(event) => (this.answerComment.text = event.currentTarget.value)}
                rows={5}
              />
          </Column>
        </Row>
        <Row>
          <Column><Button.Success onClick={this.save}>Save</Button.Success></Column>
          <Column><Button.Danger onClick={this.delete}>Delete</Button.Danger></Column>
        </Row>
      </Card>
      </>
    )
    
  }

  mounted() {
    service.getMe().then((user) => {
      this.user = user;
      this.connectedUser = user.user_id;
    });


    service.getAnswerCommentById(this.props.match.params.id)
    .then((answerComment) => (this.answerComment = answerComment))
    .catch((error: Error) => Alert.danger('Error getting answer comment: ' + error.message));
  }

  save() {
    if(this.connectedUser == this.answerComment.user_id){
    service
      .updateAnswerComment(this.answerComment)
      .then(() => history.goBack())
      .catch((error) => Alert.danger('Error saving answer comment: ' + error.message));
  }else{
    Alert.danger('You are not the owner of this comment');
  }
}

  delete() {
    if(this.connectedUser == this.answerComment.user_id){
    service
    .deleteAnswerComment(this.answerComment.answer_comment_id)
    .then(() => history.goBack())
    .catch((error) => Alert.danger('Error deleting answer comment: ' + error.message));
  }else{
    Alert.danger('You are not the owner of this comment');
  }
}

}
