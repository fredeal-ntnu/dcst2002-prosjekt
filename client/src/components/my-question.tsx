import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Column, Row, Form } from '../widgets';
import service, { Question } from '../service';
import { NavLink } from 'react-router-dom';

export class MyQuestions extends Component {
    questions: Question[] = [];
    search = '';

    render() {
        return (
            <>   
                <Card title='My Questions'>
                    <Row>
                        <Column width={10}>
                            <Form.Input
                                type='text' 
                                value={this.search} 
                                onChange={(event) => this.search = event.currentTarget.value}
                            />
                        </Column>
                    </Row>
                </Card>
                {this.questions
                    .filter((question) => question.title.toLowerCase().includes(this.search.toLowerCase()))
                    .map((question, i) => (
                        <Card key={i} title={<NavLink to={'/questions/' + question.question_id}>{question.title}</NavLink>}>
                            <Row>
                                <Column>{question.text}</Column>
                            </Row>
                        </Card>
                    ))
                }
            </>
        );
    }

    loadQuestions() {
        const username = "bob"; // Ensure this username has associated questions
    
        service
            .getQuestionsByUser(username)
            .then((questions) => {
                console.log('Fetched questions:', questions); // Debugging line
                this.questions = questions;
            })
            .catch((error) => {
                console.error('Error fetching questions:', error); // Debugging line
                Alert.danger(error.message);
            });
    }

    mounted() {
        this.loadQuestions();
    }
}

/* Legg til i Service.tsx:
    getQuestionsByUser(username: string) {
  return axios
  .get('/users/' + username + '/questions')
  .then((response) => response.data);
} */
