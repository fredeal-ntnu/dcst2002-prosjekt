import * as React from 'react';
import { Component } from 'react-simplified';
import { Form, Card, Alert, MainCard, SideMenu, Row, Column, Button, RadioRow, QuestionCard } from '../widgets';
import service, { Question, Tag, Tag_Question_Relation } from '../service';
import { NavLink } from 'react-router-dom';
import { EyeIcon } from '../icons';

type TagWithCount = {
  tag_id: number;
  name: string;
  questions: number;
};

export class Tags extends Component {
    questions: Question[] = [];
    tags: TagWithCount[] = [];
    relations: Tag_Question_Relation[] = [];   
    questionSearch = '';
    tagSearch = '';
    sortOrder = 'none';
  
    render() {
        return (
            <Row>
            <Column width={3}>
                <SideMenu header='Menu'
                items={[
                  { label: "Questions", to: "/questions" },
                  { label: "Tags", to: "/tags" },
                  {label: "New Question", to: "createquestion"},
                  {label: "My Questions", to: "myquestion"}
                ]}/>
              <SideMenu header="Select Tags">
              <div style={{ padding: '10px', paddingBottom: '0px'}}>
                <Form.Select value={this.sortOrder} onChange={this.handleFilterChange}>
                  <option value="all">Sort tags...</option>
                  <option value="popularity">Popularity</option>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                </Form.Select>
                </div>
                <div style={{ padding: '10px'}}>
                  <Form.Input
                    type='text' 
                    placeholder={`Search`}
                    value={this.tagSearch} 
                    onChange={(event) => this.tagSearch = event.currentTarget.value}
                  />
                </div>              
                <ul className="list-group list-group-flush">
                  {this.tags
                    .filter((tag) => (tag.name.toLowerCase().includes(this.tagSearch.toLowerCase())))
                    .map((tag, index) => (
                      <li key={index} className="list-group-item">
                        <Button.Light key={tag.tag_id} onClick={() => this.showQuestionsByTag(tag.tag_id)}>
                          {tag.name}{' '}{tag.questions}
                        </Button.Light>
                      </li>
                    ))
                  }   
                </ul>
              </SideMenu>
            </Column>

            {/* Main content */}
            <Column>
              <Card title="Top Questions" width='600px'><br />
                <Row>
                  <Column>
                    <Form.Input
                    type='text' 
                    placeholder={`Search`}
                    value={this.questionSearch} 
                    onChange={(event) => this.questionSearch = event.currentTarget.value}/>
                  </Column>
                </Row>
              </Card>
                {this.questions
                  .filter((question) => (question.title.toLowerCase().includes(this.questionSearch.toLowerCase())))
                  .map((question, i) => (
                    <QuestionCard key={i} question={question} />
                  ))
                }
            </Column>
            </Row>
        );
      }

  showQuestionsByTag(tag_id: number) {
    service
      .getQuestionsByTagId(tag_id)
      .then((relations) => (this.relations = relations))
      .then(() => {
        this.questions = [];
        this.relations.map((relation) => {
          service
            .getQuestion(relation.question_id)
            .then((question) => this.questions.push(question))
            .catch((error) => Alert.danger(error.message));
        });
      })
      .catch((error) => Alert.danger(error.message));
  }

    handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.sortOrder = event.target.value;
        console.log(this.sortOrder);
        this.handleSortChange() // Call a method to load questions based on the selected filter
      };

    handleSortChange() {        
        switch (this.sortOrder) {
            // må ha alle her, hvordan gjør man det
            case 'popularity':
                this.tags.sort((a, b) => b.questions - a.questions);
                break;
            case 'a-z':
                this.tags.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'z-a':
                this.tags.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                this.tags.sort((a, b) => a.tag_id - b.tag_id);
                break;
        }
      }
  
    mounted() {
      service
        .getAllQuestions()
        .then((questions) => (this.questions = questions));

    service
      .getAllTags()
      .then((tags) => (this.tags = tags))
      .then(() => {
        this.tags.map((tag, i) => {
          service
            .getQuestionsByTagId(tag.tag_id)
            .then((relations) => (this.relations = relations))
            .then(() => {
              this.tags[i].questions = this.relations.length;
            })
            .catch((error) => Alert.danger(error.message));
        });
      })
      .catch((error) => Alert.danger(error.message));
  }
}
