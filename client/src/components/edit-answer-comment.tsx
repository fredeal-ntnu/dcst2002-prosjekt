import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Button, Form} from '../widgets';
import service, {AnswerComment} from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory();
// let history = useHistory();
export class EditAnswerComment extends Component<{ match: { params: { id: number } } }> {
  answerComments: AnswerComment[] = [];
  answerComment: AnswerComment = {answer_comment_id: 0, text: '', answer_id: 0, user_id: 0};


  render() {
    return(
      <>
      hei!
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
    service.getAnswerCommentById(this.props.match.params.id)
    .then((answerComment) => (this.answerComment = answerComment))
    .catch((error: Error) => Alert.danger('Error getting answer comment: ' + error.message));
  }

  save() {
    service
      .updateAnswerComment(this.answerComment)
      .then(() => history.goBack())
      .catch((error) => Alert.danger('Error saving answer comment: ' + error.message));
  }

  delete() {
    service
    .deleteAnswerComment(this.answerComment.answer_comment_id)
    .then(() => history.goBack())
    .catch((error) => Alert.danger('Error deleting answer comment: ' + error.message));

  }

}
