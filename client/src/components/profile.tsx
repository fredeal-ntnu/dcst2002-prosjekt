import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Column, Row, Form, SideMenu, QuestionCard, AnswerCard, Button } from '../widgets';
import service, { Question, Tag, User, Answer } from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export class Profile extends Component {
    questions: Question[] = [];
    users: User[] = [];
    user:User = { user_id: 0, google_id: '', username: '', email: ''};

  
    render() {
      return (
        <Row>
            {/* Side Menu or other content */}
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

            <Column>
              <Card title="Profile">
                <Row>{"Welcome to your profile: " + this.user.username}</Row>
                <Row>{"Your email is: " + this.user.email}</Row>
                <Row>{"Your user id is: " + this.user.user_id}</Row>
              </Card>
              <Button.Danger onClick={() => {
                this.logout();
              }} >Log Out</Button.Danger>
            </Column>
          </Row>
      );
    }
  
    mounted() {
      service.getMe().then((user) => { this.user = user})
    }
      

    logout() {
      service.logOut()
      .then(() => window.location.assign('/'))
      .catch((error) => Alert.danger(error.message));
    }

}
