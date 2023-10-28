import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert } from './widgets';
import { TaskList, TaskDetails, TaskEdit, TaskNew } from './task-components';


class Menu extends Component {
  render() {
    return (
      <NavBar brand="AskMorgan">
        <NavBar.Link to="/questions">Questions</NavBar.Link>
        <NavBar.Link to="/login">Log In</NavBar.Link>
        <NavBar.Link to="/signup">Sign Up</NavBar.Link>
        <NavBar.Link to="/">Sign Up</NavBar.Link>
        <NavBar.Link to="/tasks">Tasks</NavBar.Link>
        <NavBar.Link to="/tasks/new">New Task</NavBar.Link>
        <NavBar.Link to="/tasks/1">Task 1</NavBar.Link>
        <NavBar.Link to="/tasks/2">Task 2</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Splash">Her kan vi ha mest sette spørsmål</Card>;
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
        <Route exact path="/tasks" component={TaskList} />
        <Route exact path="/tasks/:id(\d+)" component={TaskDetails} /> {/* id must be number */}
        <Route exact path="/tasks/:id(\d+)/edit" component={TaskEdit} /> {/* id must be number */}
        <Route exact path="/tasks/new" component={TaskNew} />
      </div>
    </HashRouter>,
  );
