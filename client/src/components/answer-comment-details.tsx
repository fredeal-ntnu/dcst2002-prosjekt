import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { NavBar, Card, Alert, Row, Column, Button, SideMenu, MainCard} from '../widgets';

import service, {
  Question,
  Tag,
  Tag_Question_Relation,
  Answer,
  QuestionComment,
  AnswerComment,
} from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory();
export class AnswerCommentDetails extends Component<{ match: { params: { id: number } } }> {
  question: Question = {
    question_id: 0,
    title: '',
    text: '',
    view_count: 0,
    has_answer: false,
    username: '',
  };
  relations: Tag_Question_Relation[] = [];
  tags: Tag[] = [];
  answers: Answer[] = [];
  answer: Answer = { answer_id: 0, text: '', confirmed_answer: false, question_id: 0 };
  questionComments: QuestionComment = { question_comment_id: 0, text: '', question_id: 0 };
  answerComments: AnswerComment = { answer_comment_id: 0, text: '', answer_id: 0 };

  render() {
    return (
      <>
        <Card title="">
          <div className="row">
            <SideMenu
              header="Public"
              items={[
                { label: 'Questions', to: '/questions' },
                { label: 'Tags', to: '/tags' },
              ]}
            />
            <MainCard header="Question">
              <Row>
                <Column width={155}>
                  <Card title="Title">{this.question.title}</Card>
                </Column>
                <Column width={100}>
                  <Card title="Text">{this.question.text}</Card>
                </Column>
                <Row>
                  <Column width={100}>
                    <Card title="Tags">
                      {this.relations.map((relation) => {
                        if (relation.question_id == this.props.match.params.id) {
                          return this.tags.map((tag) => {
                            if (relation.tag_id == tag.tag_id) {
                              return tag.name + ', ';
                            }
                          });
                        }
                      })}
                    </Card>
                  </Column>
                </Row>
                <Row>
                  <Column width={2}>
                    <Button.Success
                      onClick={() =>
                        history.push('/questions/' + this.props.match.params.id + '/edit')
                      }
                    >
                      Edit
                    </Button.Success>
                  </Column>
                </Row>
              </Row>
            </MainCard>
            <Card title="Answers">
              <Column width={500}>
                <Row>
                  <Card title="Answers">
                    {
                    this.answers.map((answer) => {
                      if (answer.question_id == this.props.match.params.id) {
                        return( 
                        <Row key={answer.answer_id}>
                          <NavLink to={'/questions/'+this.props.match.params.id+'/answers/'+answer.answer_id}>{answer.text}</NavLink>
                        </Row>)
                      }
                    })
                    }
                  </Card>
                </Row>
              </Column>
              <Column width={500}>
                <Row>
                  <Card title="Comments">
                   
                    her skal alle kommentarene til et spørsmål vises
                  </Card>
                </Row>
              </Column>
            </Card>
          </div>
        </Card>
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

    service.getAllTagQuestionsRelations().then((relations) => (this.relations = relations));

    service
      .getAnswersForQuestion(this.props.match.params.id)
      .then((answers) => (this.answers = answers));
  }
}
