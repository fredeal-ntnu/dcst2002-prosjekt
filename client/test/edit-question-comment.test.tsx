import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Button, Form} from '../widgets';
import service, { QuestionComment, User } from '../service';
import { createHashHistory } from 'history';