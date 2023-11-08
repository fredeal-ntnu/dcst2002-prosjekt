import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, SideMenu, Button, MainCard, Alert, Form } from '../widgets';
import service, { Question, Tag_Question_Relation, Tag } from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student
export class Login extends Component {
    user: User[] = [];
  
    render() { 
      return (
        <>
          <Card title="Login">
            
          </Card>
        </>
      );
    }

    mounted() {
         
    }
  
    
  
  
 
};


