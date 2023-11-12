import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { NavBar, Card, Alert, Row, Column, Button, SideMenu, MainCard} from '../widgets';

import service, {
  Question,
  Tag,
  Tag_Question_Relation,
  Answer,
  QuestionComment,
  AnswerComment,
} from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory();
export class AnswerDetails extends Component<{ match: { params: { id: number } } }> {
 render() {
     return(
        'hei'
     )
 }
 mounted() {
     
 }
}
