import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert, CardQuestions, CardHome, Row, Column } from './widgets';
import service, { Question } from './service';
// import { TaskList, TaskDetails, TaskEdit, TaskNew } from './task-components';


class Menu extends Component {
  render() {
    return (
      <NavBar brand="askMorgan">
        <NavBar.Search/>
        <NavBar.Link to="/login">Log in</NavBar.Link>
        <NavBar.Link to="/signup">Sign up</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  questions: Question[] = [];

  render() {
    return (
      <Card title="">
        <div className="row">
          <CardHome header="Public"
            items={[{ label: "Questions", to: "/questions" }, { label: "Tags", to: "/tags" }]}/>
          <CardQuestions header="Top Questions">
          {this.questions.map((question) => (
            <Row key={question.question_id}>
              {question.title}<br></br>{question.text}
            </Row>
          ))}
        </CardQuestions>
          
        </div> 
      </Card>
    );
  }


  createQuestion() {
    service.createQuestion().then((questions) => (this.questions = questions));
  }



    mounted() {
      service.getTopFiveQuestions().then((questions) => (this.questions = questions));
    }
}


let root = document.getElementById('root');
if (root)
  createRoot(root).render(
    <HashRouter>
      <div>
        <Alert />
        <Menu />
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/signin" component={login} /> */}
        {/* <Route exact path="/signup" component={signup} /> */}
        {/* <Route exact path="/signup" component={questions} /> */}
        {/* <Route exact path="/signup" component={tags} /> */}
      </div>
    </HashRouter>,
  );
