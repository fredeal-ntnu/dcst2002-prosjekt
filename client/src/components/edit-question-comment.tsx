import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Button, Form} from '../widgets';
import service, { QuestionComment, User } from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory();
export class EditQuestionComment extends Component<{ match: { params: { id: number } } }> {
  questionComments: QuestionComment[] = [];
  questionComment: QuestionComment = {question_comment_id: 0, text: '', question_id: 0, user_id: 0};
  user: User = { user_id: 0, google_id: '', username: '', email: ''};
  connectedUser: number = 0;

  render() {
    return(
      <>
      <Card title="Edit Comment">
        <Row>
          <Column width={10}>
          <Form.Textarea
                type="text"
                value={this.questionComment.text}
                onChange={(event) => (this.questionComment.text = event.currentTarget.value)}
                rows={5}
                maxLength={1000}
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
    service.getMe()
    .then((user) => {
      this.user.user_id = user.user_id
      this.connectedUser = this.user.user_id;
    })
    .catch((error)=>{
      console.error(error.message)
      history.push('/')
      alert('You must be logged in to edit comment')
    })

    service.getQuestionCommentById(this.props.match.params.id)
    .then((questionComment) => (this.questionComment = questionComment))
    .catch((error: Error) => console.error('Error getting question comment: ' + error.message));
  }

  save() {
    if(this.connectedUser == this.questionComment.user_id){
    service
      .updateQuestionComment(this.questionComment)
      .then(() => history.push('/questions/' + this.questionComment.question_id))
      .catch((error) => console.error('Error saving question comment: ' + error.message));
  }else{
    Alert.danger('You are not the owner of this comment');
  }
}

  delete() {
    if(this.connectedUser == this.questionComment.user_id) {
      service
      .deleteQuestionComment(this.questionComment.question_comment_id)
      .then(() => history.push('/questions/' + this.questionComment.question_id))
      .catch((error) => console.error('Error deleting question comment: ' + error.message));
    }else{
      Alert.danger('You are not the owner of this comment');
    }
   

  }

}
