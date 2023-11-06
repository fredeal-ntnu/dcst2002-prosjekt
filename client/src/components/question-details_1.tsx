import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert, Row, Column, Button } from '../widgets';
import service, { Question, Tag, Tag_Question_Relation } from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory()
export class QuestionDetails extends Component {
 question: Question = {question_id: 0, title: "", text: "", view_count: 0, user_id: 0, confirmed_answer: false};
 relations: Tag_Question_Relation[] = []
 tags: Tag[] = [];

  
  render() {
    return (
      <>
      <Card title="Question">
        <Row>
                <Column width={100}>
                  <Card title="Title">{this.question.title}</Card>
                </Column>
                <Column width={100}>
                  <Card title="Text">{this.question.text}</Card>
                </Column>
                <Row>
                <Column width={100}>
                    <Card title="Tags">{
                      this.relations.map((relation) => {
                        if (relation.question_id == this.props.match.params.id) {
                          return this.tags.map((tag) => {
                            if (relation.tag_id == tag.tag_id) {
                              return tag.name + ", ";
                            }
                          })
                        }
                      }
                      )}</Card>
                    </Column>
                    </Row>
        </Row>
      </Card>
      <Row>
        <Column width={2}>
          <Button.Success onClick={() => history.push('/questions/' + this.props.match.params.id + '/edit')}>Edit</Button.Success>
          </Column>
      </Row>
      <Card title="Answers"></Card>
      </>
    );
  }


  mounted() {
    service
    .getAllTags()
    .then((tags) => (this.tags = tags))
    .catch((error) => Alert.danger(error.message));

    
    service
      .getQuestion(this.props.match.params.id)
      .then((question) => (this.question = question))
      .catch((error: Error) => Alert.danger('Error getting question: ' + error.message));

    service
    .getAllTagQuestionsRelations()
    .then((relations) => (this.relations = relations));
    
  
  }
}



