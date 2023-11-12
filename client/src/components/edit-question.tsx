import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { Card, Row, Column, SideMenu, Button, MainCard, Alert, Form } from '../widgets';
import service, { Question, Tag, Tag_Question_Relation } from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory()

export class EditQuestion extends Component <{match: {params: {id: number}}}> {
    question: Question = {question_id: 0, title: "", text: "", view_count: 0, confirmed_answer: false, user_name: ""};
    
   

    render() {
        return(
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
                      placeholder='Text'
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
            )       
       
    }

    mounted() {
        service
      .getQuestion(this.props.match.params.id)
      .then((question) => (this.question = question))
      .catch((error: Error) => Alert.danger('Error getting question: ' + error.message))
    }

    save() {
        service
          .updateQuestion(this.question)
          .then(() => history.push('/questions/' + this.question.question_id))
          .catch((error) => Alert.danger('Error saving question: ' + error.message));
      }

    delete() {
        service
          .deleteQuestion(this.props.match.params.id)
          .then(() => history.push('/questions'))
          .catch((error) => Alert.danger('Error deleting question: ' + error.message));
    }
    
}