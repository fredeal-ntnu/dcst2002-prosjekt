import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { Card, Row, Column, SideMenu, Button, MainCard, Alert, Form } from '../widgets';
import service, { Question, Tag, Tag_Question_Relation } from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory()

export class EditQuestion extends Component {
    question: Question = {question_id: 0, title: "", text: "", view_count: 0, user_name: "", confirmed_answer: false};
    
    title = "";
    text = "";

    render() {
        return(
            <>
            <Row>
            <Card title="Edit Question">
                <Row>
                    <Column>
                    <Form.Label>

                    </Form.Label>
                    </Column>
                    <Column></Column>
                </Row>
            </Card> 
            </Row>
            <Row>
                <Column width={2}>
                    <Button.Danger onClick={()=>'delete()'}>Delete</Button.Danger>
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
}