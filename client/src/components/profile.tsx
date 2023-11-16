import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Column, Row, Form, SideMenu, QuestionCard, AnswerCard, Button } from '../widgets';
import service, { Question, Tag, User, Answer } from '../service';

export class Profile extends Component {
    questions: Question[] = [];
    users: User[] = [] || null;

  
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
                <Row>{"Welcome to your profile: " + this.users?.username}</Row>
                <Row>{"Your email is: " + this.users?.email}</Row>
                <Row>{"Your user id is: " + this.users?.user_id}</Row>
              </Card>
              <Button.Danger onClick={() => {
                this.logout();
              }} >Log Out</Button.Danger>
            </Column>
          </Row>
      );
    }
  
    mounted() {
      service.getMe().then((users) => { this.users = users})
    }
      

    async logout() {
        try {
        service.logOut()
        // this.users = null;
        // window.location.reload();

        } catch (error) {
            console.log(error)
        }
    
  }

}
