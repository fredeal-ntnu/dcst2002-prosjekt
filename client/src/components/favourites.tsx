import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Column, Row, SideMenu, AnswerCard, Button } from '../widgets';
import service, { Question, User, Answer } from '../service';

export class Favourites extends Component {
  answers: Answer[] = [];
  questions: Question[] = [];
  user: User = { user_id: 0, google_id: '', username: '', email: '' };
  answer: Answer = {
    answer_id: 0,
    text: '',
    confirmed_answer: 0,
    last_updated: new Date(),
    question_id: 0,
    user_id: 0,
    score: 0,
    result: '',
  };
  search = '';

  render() {
    let answersCount = this.answers.length;

    return (
      <Row>
        <Column width={3}>
          <SideMenu
            header="Menu"
            items={[
              { label: 'Questions', to: '/questions' },
              { label: 'My Questions', to: 'myquestions' },
              { label: 'My Favourite Answers', to: 'favourites' },
              { label: 'New Question', to: 'createquestion' },
              { label: 'Tags', to: '/tags' },
            ]}
          />
        </Column>
        <Column>
          <Card title="My Favourite Answers!">
            <br />
            <Row>
              <Column>{answersCount} answers in total</Column>
            </Row>
          </Card>
          <Column>
            {this.answers.map((answer, i) => (
              <>
                <AnswerCard key={i} answer={answer} />
                <Button.Danger onClick={() => this.deleteFavourite(answer.answer_id)}>
                  Remove Favourite
                </Button.Danger>
              </>
            ))}
          </Column>
        </Column>
      </Row>
    );
  }

  mounted() {
    //get logged in answer
    service
      .getMe()
      .then((user) => {
        this.user = user;
        return service.getAllFavouriteAnswersByUserId(this.user.user_id);
      })
      .then((answers) => (this.answers = answers))
      .catch((error: Error) => console.error('Error getting answer: ' + error.message));
  }

  deleteFavourite(answerId: number) {
    service
      .handleFavouriteRelation(answerId, this.user.user_id)
      .then(() => Alert.success('Favourite deleted'))
      .then(() => this.mounted());
  }
}
