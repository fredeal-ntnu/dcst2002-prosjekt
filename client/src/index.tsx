import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert, SideMenu, Row, Column, Button } from './widgets';
import service from './service';
import { CreateQuestion } from './components/create-question';
import { QuestionDetails } from './components/question-details';
import { EditQuestion } from './components/edit-question';
import { AllQuestions } from './components/all-questions';
import { Tags } from './components/tags';
import { AnswerDetails } from './components/answer-details';
import { EditQuestionComment } from './components/edit-question-comment';
import { EditAnswerComment } from './components/edit-answer-comment';
import { EditAnswer } from './components/edit-answer';
import { MyQuestions } from './components/my-questions';
import { Favourites } from './components/favourites';
import { Profile } from './components/profile';
import { User } from './service';

export class Menu extends Component {
  user: User = { user_id: 0, google_id: '', username: '', email: '' };
  connectedUser: number = 0;

  render() {
    return <>{this.handleNavbar()}</>;
  }
  loginLink() {
    window.location.href = '/api/v1/login/federated/google';
  }

  mounted(): void {
    service.getMe().then((user) => {
      this.user = user;
      this.connectedUser = this.user.user_id;
    });
  }

  handleNavbar() {
    if (this.connectedUser) {
      return (
        <NavBar brand="askMorgan">
          <NavBar.Link to="/profile">My Profile</NavBar.Link>
        </NavBar>
      );
    } else {
      return (
        <NavBar brand="askMorgan">
          <Button.Success onClick={this.loginLink}>Login</Button.Success>
        </NavBar>
      );
    }
  }
}

export class Home extends Component {
  user: User = { user_id: 0, google_id: '', username: '', email: '' };
  connectedUser: number = 0;

  render() {
    return (
      <Row>
        {/* Side Menu or other content */}
        <Column width={3}>
          <SideMenu
            header="Menu"
            items={[
              { label: 'Questions', to: '/questions' },
              { label: 'My Questions', to: 'myquestions' },
              { label: 'My Favourite Answers', to: 'favourites' },
              { label: 'New Question', to: 'createquestion' },
              { label: 'Tags', to: '/tags' },
            ]}
          />
        </Column>

        {/* Main content */}
        <Column>
          <Card title="">
            <h3>Welcome!</h3>
            <h6>
              At <b>askMorgan</b>, every question counts. <br /> Get answers, gain knowledge, and
              join our community of learners.
            </h6>
            <br />
            <h6>What would you like to know?</h6>
            <img
              src="https://scontent.xx.fbcdn.net/v/t1.15752-9/363534368_210845998630767_4305768850138656455_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=510075&_nc_ohc=W06aoFJdp0EAX_ECDQp&_nc_ht=scontent.xx&oh=03_AdRfgzRf_DqEK2Ff3HU-osJWu5NMu4QuuGA5PJfyQbFQRg&oe=657C122A"
              width="50%"
              height="50%"
            ></img>
          </Card>
        </Column>
      </Row>
    );
  }

  mounted() {
    service.getMe().then((user) => {
      this.user = user;
      this.connectedUser = user.user_id;
    });
  }
}

let root = document.getElementById('root');
if (root)
  createRoot(root).render(
    <HashRouter>
      <Alert />
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/questions" component={AllQuestions} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/tags" component={Tags} />
      <Route exact path="/myquestions" component={MyQuestions} />
      <Route exact path="/favourites" component={Favourites} />
      <Route exact path="/createQuestion" component={CreateQuestion} /> {/* er det index her? */}
      <Route exact path="/questions/:id(\d+)" component={QuestionDetails} />
      <Route exact path="/questions/:id(\d+)/answers/:id(\d+)" component={AnswerDetails} />
      <Route exact path="/questions/:id(\d+)/edit" component={EditQuestion} />
      <Route exact path="/questions/:id(\d+)/answers/:id(\d+)/edit" component={EditAnswer} />
      <Route
        exact
        path="/questions/:id(\d+)/comments/:id(\d+)/edit"
        component={EditQuestionComment}
      />
      <Route
        exact
        path="/questions/:id(\d+)/answers/:id(\d+)/comments/:id(\d+)/edit"
        component={EditAnswerComment}
      />
    </HashRouter>,
  );
