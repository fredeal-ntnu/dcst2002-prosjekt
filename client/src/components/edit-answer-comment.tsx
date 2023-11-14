import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { NavBar, Card, Alert, Row, Column, Button, SideMenu, MainCard, Form} from '../widgets';
import service, { Question,Tag, Tag_Question_Relation, Answer, QuestionComment, AnswerComment} from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory();
export class AnswerCommentDetails extends Component<{ match: { params: { id: number } } }> {
  answerComments: AnswerComment[] = [];
  answerComment: AnswerComment = {answer_comment_id: 0, text: '', answer_id: 0};


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
    service.getAnswerCommentById(this.props.match.params.id)
    .then((answerComment) => (this.anwerComment = answerComment))
    .catch((error: Error) => Alert.danger('Error getting answer comment: ' + error.message));
  }

  save() {
    service
      .updateAnswerComment(this.answerComment)
      .then(() => history.push('/questions/' + this.questionComment.question_id))
      .catch((error) => Alert.danger('Error saving answer comment: ' + error.message));
  }

  delete() {
    service
    .deleteAnswerComment(this.answerComment.answer_comment_id)
    .then(() => history.push('/questions/' + this.questionComment.question_id))
    .catch((error) => Alert.danger('Error deleting answer comment: ' + error.message));

  }

}