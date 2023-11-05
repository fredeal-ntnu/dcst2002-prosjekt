import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { Card, Row, Column, SideMenu, Button, MainCard, Alert } from '../widgets';


export class CreateQuestion extends Component {
    // questions: Question[] = [];
  
    render() {
      return (
        <Card title="">
          <div className="row">
            <SideMenu header="Public"
              items={[{ label: "Questions", to: "/questions" }, { label: "Tags", to: "/tags" }]}/>
            <MainCard header="Top Questions">
          </MainCard>
          </div> 
        </Card>
      );
    }
};