import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { NavBar, Card, Alert, MainCard, SideMenu, Row, Column } from './widgets';
import service, { Question } from './service';
import { CreateQuestion } from './components/create-question';
import { QuestionDetails } from './components/question-details';
import { EditQuestion } from './components/edit-question';
import { Login } from './components/login';
import { AllQuestions } from './components/all-question';
import { Tags } from './components/tags';
import { AnswerDetails } from './components/answer-details';
import { QuestionCommentDetails } from './components/question-comment-details';
import { AnswerCommentDetails } from './components/answer-comment-details';
import { EditAnswer } from './components/edit-answer';

class Menu extends Component {
  render() {
    return (
      <NavBar brand="askMorgan">
        <NavBar.Link to="/login">Log in</NavBar.Link>

        <NavBar.Link to="/signup">Sign up</NavBar.Link>
        <NavBar.Link to="/createQuestion">Add question</NavBar.Link>
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
          <SideMenu
            header="Public"
            items={[
              { label: 'Questions', to: '/questions' },
              { label: 'Tags', to: '/tags' },
            ]}
          />
          <MainCard header="Top Questions">
            {this.questions.map((question) => (
              <Row key={question.question_id}>
                <NavLink to={'/questions/' + question.question_id}>{question.title}</NavLink>
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
}

let root = document.getElementById('root');
if (root)
  createRoot(root).render(
    <HashRouter>
      
        <Alert />
        <Menu />
        <Route exact path="/" component={Home} />
        <Route exact path="/createQuestion" component={CreateQuestion} /> {/* er det index her? */}
        <Route exact path="/questions/:id(\d+)" component={QuestionDetails} />{' '}
        {/* huske å endre index */}
        <Route exact path="/questions/:id(\d+)/edit" component={EditQuestion} />
        <Route exact path="/questions/:id(\d+)/answers/:id(\d+)/edit" component={EditAnswer} />
        <Route
          exact
          path="/questions/:id(\d+)/comments/:id(\d+)"
          component={QuestionCommentDetails}
        />
        <Route
          exact
          path="/questions/:id(\d+)/answers/:id(\d+)/comments"
          component={AnswerCommentDetails}
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/questions" component={AllQuestions} />
        {/* <Route exact path="/signup" component={Questions} /> */}
        <Route exact path="/tags" component={Tags} />
     
    </HashRouter>,
  );
