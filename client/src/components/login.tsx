import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, SideMenu, Button, Alert, Form } from '../widgets';
import service, { Question, Tag_Question_Relation, Tag, User } from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student
export class Login extends Component {
  user: User[] = [];
  user_name = '';
  password = '';

  render() {
    return (
      <>
        <Card title="Login">
          <Row>
            <Form.Label>Username:</Form.Label>
            <Form.Input
              type="text"
              placeholder="Username"
              value={this.user_name}
              onChange={(event) => (this.user_name = event.currentTarget.value)}
            />
            <Form.Label>Password:</Form.Label>
            <Form.Input
              type="text"
              placeholder="Password"
              value={this.password}
              onChange={(event) => (this.password = event.currentTarget.value)}
            />
            <Column>
              <Button.Success
                onClick={() => {
                  this.handleLogin;
                }}
              >
                Login
              </Button.Success>
            </Column>
            <h1>
            <a href="/api/v1/login/federated/google">Sign in with Google</a>
            </h1>
          </Row>
        </Card>
      </>
    );
  }

  mounted() {}

  //check if user exists with given username and password then log them in and redirect to home page
  handleLogin = async () => {
    service
      .getMe()
      .then((user) => {
        this.user = user;
        if (user.user_id.length == 1) {
          console.log('User logged in');
          history.push('/questions');
        }
      })
      .catch((error) => Alert.danger(error.message));
  };
}
