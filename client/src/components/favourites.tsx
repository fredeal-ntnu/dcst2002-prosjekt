import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Column, Row, Form, SideMenu, QuestionCard, AnswerCard } from '../widgets';
import service, { Question, Tag, User, Answer } from '../service';

export class Favourites extends Component {
    answers: Answer[] = [];
    questions: Question[] = [];
    user:User = { user_id: 0, google_id: '', username: '', email: ''};
    search = '';
  
    render() {
      let answersCount = this.answers.length;

      return (
        <Row>
          <Column width={3}>
            <SideMenu header='Menu'
            items={[
              { label: "Questions", to: "/questions" },
              { label: "My Questions", to: "myquestions" },
              { label: "My Favourite Answers", to: "favourites" },
              { label: "New Question", to: "createquestion" },
              { label: "Tags", to: "/tags" }
            ]}/>
          </Column>
          
          {/* Main content */}
          <Column>
            <Card title='My Favourite Answers!'><br />
              <Row>
                <Column>{answersCount} answers in total</Column>
                </Row>
            </Card>
            <Column>
                    {this.answers.map((answer, i) => (
                <AnswerCard key={i} answer={answer}/>
              ))
            }
                </Column>
          </Column>
        </Row>
      );
    }
  
  
    // Lifecycle method to load answers when the component mounts
    mounted() {
      service
    .getMe()
    .then((user) => {
      this.user = user;
    return service.getAllFavouriteAnswersByUserId(this.user.user_id);
    })
    .then(answers => (this.answers = answers))
    .catch((error: Error) => console.error('Error getting answer: ' + error.message));
  }
}





