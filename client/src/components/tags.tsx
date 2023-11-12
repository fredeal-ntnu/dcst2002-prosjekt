import * as React from 'react';
import { Component } from 'react-simplified';
import { Form, Card, Alert, MainCard, SideMenu, Row, Column, Button } from '../widgets';
import service, { Question, Tag } from '../service';
import { NavLink } from 'react-router-dom';
import { EyeIcon, SearchIcon } from '../icons';


export class Tags extends Component {
    questions: Question[] = [];
    tags: Tag[] = [];
    search = '';
  
    render() {
      return (
        <Card title="">
          <div className="row">
            <SideMenu header="Select Tags">
            <ul className="list-group list-group-flush">
                {this.tags.map((tag, index) => (
                    <li key={index} className="list-group-item">
                        <Button.Light key={tag.tag_id} onClick={() => this.showTags(tag.tag_id)}>
                            {tag.name}
                        </Button.Light>
                    </li>
                    ))
                }   
                </ul>
            </SideMenu>
            <MainCard header="Top Questions">
                <Form.Input
                    type='text' 
                    placeholder={`Search`}
                    value={this.search} 
                    onChange={(event) => this.search = event.currentTarget.value}
                    /><br/>
            {this.questions
                .filter((question) => (question.title.toLowerCase().includes(this.search.toLowerCase())))
                .map((question, i) => (
                    <Card key={i} 
                    title={<NavLink to={'/questions/' + question.question_id}>{question.title}</NavLink>}>
                        <Row>
                            <Column>{question.text}</Column>
                            <Column width={1} right><EyeIcon style={{ verticalAlign: '-2px' }} />{' '}{question.view_count}</Column>
                        </Row>
                    </Card>
                ))
                }
         </MainCard>
          </div> 
        </Card>
      );
    }

    showTags(tag_id: number) {
        service
            .getQuestionsByTag(tag_id)
            .then((questions) => (this.questions = questions))
            .catch((error) => Alert.danger(error.message));
    }
  
  
    mounted() {
      service
        .getAllQuestions()
        .then((questions) => (this.questions = questions));

    service
        .getAllTags()
        .then((tags) => (this.tags = tags))
        .catch((error) => Alert.danger(error.message));  
    }
  };