import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { NavBar, Card, Alert, Row, Column, Button, SideMenu, MainCard, Form} from '../widgets';
import service, { Question,Tag, Tag_Question_Relation, Answer, QuestionComment, AnswerComment} from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory();
export class QuestionCommentDetails extends Component<{ match: { params: { id: number } } }> {
  questionComments: QuestionComment[] = [];
  questionComment: QuestionComment = {question_comment_id: 0, text: '', question_id: 0};


  render() {
    return(
      <>
      {console.log(this.props.match.params.id)}
      <Card title="Edit Comment">
        <Row>
          <Column width={10}>
          <Form.Textarea
                type="text"
                value={this.questionComment.text}
                onChange={(event) => (this.questionComment.text = event.currentTarget.value)}
                rows={5}
              />
          </Column>
        </Row>
        <Row>
          <Column><Button.Success onClick={this.save}>Save</Button.Success></Column>
          <Column><Button.Danger onClick={this.delete}></Button.Danger></Column>
        </Row>
      </Card>
      </>
    )
    
  }

  mounted() {
    service.getQuestionCommentsForQuestion(this.props.match.params.id)
    .then((questionComments) => (this.questionComments = questionComments));
  }

  save() {
    service
      .updateQuestionComment(this.questionComment)
      .then(() => history.push('/questions/' + this.questionComment.question_id))
      .catch((error) => Alert.danger('Error saving question comment: ' + error.message));
  }

  delete() {

  }

}