import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert, MainCard, SideMenu, Row, Column } from './widgets';
import service, { Question } from './service';
import { CreateQuestion } from './components/create-question';
import { IndexSigned } from './components/index-signed';


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
          <SideMenu header="Public"
            items={[{ label: "Questions", to: "/questions" }, { label: "Tags", to: "/tags" }]}/>
          <MainCard header="Top Questions">
          {this.questions.map((question) => (
            <Row key={question.question_id}>
              {question.title}<br></br>{question.text}
            </Row>
          ))}
        </MainCard>
        </div> 
      </Card>
    );
  }


  mounted() {
    service.getAllQuestions().then((questions) => (this.questions = questions));
  }
};


let root = document.getElementById('root');
if (root)
  createRoot(root).render(
    <HashRouter>
      <div>
        <Alert />
        <Menu />
        <Route exact path="/" component={Home} />
        <Route exact path="/createquestion" component={CreateQuestion} /> {/* er det index her? */}
        <Route exact path="/indexsigned/:1" component={IndexSigned} /> {/* huske å endre index */}
        {/* <Route exact path="/signup" component={Signup} /> */}
        {/* <Route exact path="/signup" component={Questions} /> */}
        {/* <Route exact path="/signup" component={Tags} /> */}
      </div>
    </HashRouter>,
  );
