import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert, Row, Column, Button } from '../widgets';
import service, { Question, Tag, Tag_Question_Relation } from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory()

export class EditQuestion extends Component {
    render() {
        return(
            <>
            <Row>
            <Card title="Edit Question">
            </Card>
            </Row>
            <Row>
                <Column width={2}>
                    <Button.Danger onClick={()=>'delete()'}>Delete</Button.Danger>
                </Column>
            </Row>
            </>
            )

            
       
    }

    mounted() {
        
    }
}