import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, SideMenu, Button, MainCard, Alert, Form } from '../widgets';
import service, { Question, Tag_Question_Relation, Tag, User } from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student
export class Login extends Component {
    user: User[] = [];
    user_name = "";
    password = "";
  
    render() { 
      return (
        <>
          <Card title="Login">
            <Row>
                
                 <Form.Label>Username:</Form.Label>
                    <Form.Input
                        type='text'
                        placeholder='Username'
                        value={this.user_name}
                        onChange={(event) => (this.user_name = event.currentTarget.value)}
                    />
                    <Form.Label>Password:</Form.Label>
                    <Form.Input
                        type='text'
                        placeholder='Password'
                        value={this.password}
                        onChange={(event) => (this.password = event.currentTarget.value)}
                />      
            </Row>  
          </Card>
        </>
      );
    }

    mounted() {
         
    }
  
    
  
  
 
};


