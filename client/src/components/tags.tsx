import * as React from 'react';
import { Component } from 'react-simplified';
import { Form, Card, Alert, MainCard, SideMenu, Row, Column, Button, RadioRow } from '../widgets';
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
      <Card title="">
        <div className="row">
          <SideMenu header="Select Tags">
            <ul className="list-group list-group-flush">
              <Card title="Sort by" smallTitle>
                <RadioRow
                  label="Popularity"
                  checked={this.sortOrder === 'popularity'}
                  onChange={() => this.handleSortChange('popularity')}
                />
                <RadioRow
                  label="A-Z"
                  checked={this.sortOrder === 'a-z'}
                  onChange={() => this.handleSortChange('a-z')}
                />
                <RadioRow
                  label="Z-A"
                  checked={this.sortOrder === 'z-a'}
                  onChange={() => this.handleSortChange('z-a')}
                />
                <div style={{ marginTop: '5px' }}>
                  <Form.Input
                    type="text"
                    placeholder={`Search`}
                    value={this.tagSearch}
                    onChange={(event) => (this.tagSearch = event.currentTarget.value)}
                  />
                </div>
              </Card>

              {this.tags
                .filter((tag) => tag.name.toLowerCase().includes(this.tagSearch.toLowerCase()))
                .map((tag, index) => (
                  <li key={index} className="list-group-item">
                    <Button.Light
                      key={tag.tag_id}
                      onClick={() => this.showQuestionsByTag(tag.tag_id)}
                    >
                      {tag.name} {tag.questions}
                    </Button.Light>
                  </li>
                ))}
            </ul>
          </SideMenu>
          <MainCard header="Top Questions">
            <Form.Input
              type="text"
              placeholder={`Search`}
              value={this.questionSearch}
              onChange={(event) => (this.questionSearch = event.currentTarget.value)}
            />
            <br />
            {this.questions
              .filter((question) =>
                question.title.toLowerCase().includes(this.questionSearch.toLowerCase()),
              )
              .map((question, i) => (
                <Card
                  key={i}
                  title={
                    <NavLink to={'/questions/' + question.question_id}>{question.title}</NavLink>
                  }
                >
                  <Row>
                    <Column>{question.text}</Column>
                    <Column width={1} right>
                      <EyeIcon style={{ verticalAlign: '-2px' }} /> {question.view_count}
                    </Column>
                  </Row>
                </Card>
              ))}
          </MainCard>
        </div>
      </Card>
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

  handleSortChange(sortOrder: string) {
    this.sortOrder = sortOrder;

    switch (this.sortOrder) {
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
        break;
    }
  }

  mounted() {
    service.getAllQuestions().then((questions) => (this.questions = questions));

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
