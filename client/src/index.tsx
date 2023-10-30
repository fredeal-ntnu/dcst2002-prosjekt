import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert, Form, CardHome } from './widgets';
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
  render() {
    return (
      <CardHome header="Public"
      items=
      {[
        { label: "Questions", to: "/questions" },
        { label: "Tags", to: "/tags" },
      ]}
      />
    );
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
        {/* <Route exact path="/signin" component={signin} /> */}
        {/* <Route exact path="/signup" component={signup} /> */}
      </div>
    </HashRouter>,
  );
