import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { Card, Row, Column, SideMenu, Button, MainCard, Alert, Form } from '../widgets';
import service, { Question } from '../service';


export class CreateQuestion extends Component {
  title = '';
  text = '';
  
    render() { 
      return (
        <>
          <Card title="">
            <div className="row">
              <SideMenu header="Public"
                items={[{ label: "Questions", to: "/questions" }, { label: "Tags", to: "/tags" }]}/>
              <MainCard header="Create Question">
                <Row>
                  <Column width={2}>
                    <Form.Label>Title:</Form.Label>
                  </Column>
                  <Column>
                    <Form.Input
                      placeholder="Title"
                      type="text"
                      value={this.title}
                      onChange={(event) => (this.title = event.currentTarget.value)}
                    />
                  </Column> 
                </Row><br/>
                <Row>
                  <Column width={2}>
                    <Form.Label>Text:</Form.Label>
                  </Column>
                  <Column>
                    <Form.Textarea 
                      placeholder='Text'
                      value={this.text}
                      onChange={(event) => (this.text = event.currentTarget.value)}
                      rows={5}
                    />
                  </Column>
                </Row><br/>
                <Row>
                  <Column width={2}>
                    <Form.Label>Tags:</Form.Label>
                  </Column>
                  <Column>
                    <Form.Checkbox
                      /* hva faen skal jeg skrive her */                   
                    />
                  </Column>
                </Row><br/>
                <Row>
                  <Column>
                    <Button.Success
                      onClick={() => {
                        service
                        .createQuestion(this.title, this.text)
                        // .then((id) => history.push('/question/' + id))
                        // .catch((error) => Alert.danger('Error creating questions: ' + error.message));
                      }}>askMorgan
                    </Button.Success>
                  </Column>
                </Row>
            </MainCard>
            </div> 
          </Card>
        </>
      );
    }
    
};

export class MyQuestion extends Component {
  questions: Question[] = [];

  render() { 
    return (
      <>
       {/*  <Card title="My Questions">
          {this.questions.map((question) => (
            <Row key={question.id}>
              <Column>
                <NavLink to={'/question/' + task.id}>{task.title}</NavLink>
              </Column>
            </Row>
          ))}
        </Card>
        <Button.Success onClick={() => history.push('/question/:id(\d+)')}>New task</Button.Success> */}
      </>
    );
  }
};

