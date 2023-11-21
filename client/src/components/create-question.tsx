import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, SideMenu, Button, Form } from '../widgets';
import service, { Tag } from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory();
export class CreateQuestion extends Component {
  tags: Tag[] = [];
  selectedTags: number[] = [];
  title = '';
  text = '';
  user_id = 0;
  connectedUser: number = 0;

  render() {
    return (
      <>
        <Row>
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
          <Card title="Ask a Question">
            <Row>
              <Column width={2}>
                <Form.Label>Title:</Form.Label>
              </Column>
              <Column>
                <Form.Input
                  id="createTitle"
                  type="text"
                  value={this.title}
                  onChange={(event) => (this.title = event.currentTarget.value)}
                  maxLength={255}
                />
              </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Form.Label>Text:</Form.Label>
              </Column>
              <Column>
                <Form.Textarea
                  id="createText"
                  placeholder="Text"
                  value={this.text}
                  onChange={(event) => (this.text = event.currentTarget.value)}
                  rows={5}
                  maxLength={1000}
                />
              </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Form.Label>Tags:</Form.Label>
              </Column>
              <Column>
                <Row>
                  {this.tags.map((tag) => (
                    <Column key={tag.tag_id}>
                      <Form.Label>
                        {tag.name}
                        <Form.Checkbox
                          type="checkbox"
                          value={tag.tag_id}
                          checked={this.selectedTags.includes(tag.tag_id)}
                          onChange={(event) => {
                            this.handleCheckboxChange(event);
                          }}
                        />
                      </Form.Label>
                    </Column>
                  ))}
                </Row>
              </Column>
            </Row>

            <Row>
              <Column>
                <Button.Success
                  onClick={() => {
                    this.handleAddQuestion();
                  }}
                >
                  AskMorgan
                </Button.Success>
              </Column>
            </Row>
          </Card>
        </Row>
      </>
    );
  }

  mounted() {
    service
      //Get logged in user
      .getMe()
      .then((user) => {
        this.user_id = user.user_id;
        this.connectedUser = this.user_id;
      })
      .catch((error) => {
        console.error(error.message);
        history.push('/');
        alert('You must be logged in to create a question');
      });

    service
      .getAllTags()
      .then((tags) => (this.tags = tags))
      .catch((error) => console.error(error.message));
  }
  //checks if tags are checked
  handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let tagId = Number(event.target.value);

    if (event.target.checked) {
      this.selectedTags.push(tagId);
    } else {
      this.selectedTags = this.selectedTags.filter((id) => id !== tagId);
    }
  };

  //Adds a question and a relation between question and tags
  handleAddQuestion = async () => {
    if (this.selectedTags.length == 0) {
      alert('You must select at least one tag');
      return null;
    } else {
      var question_id = await service.createQuestion(this.title, this.text, this.user_id);
    }

    // For each selected tag, create a new relation in the Tag_question_relation table
    this.selectedTags.forEach((tag_id) => {
      service.createTagQuestionRelation(tag_id, question_id);
    });

    history.push(`/questions/${question_id}`);
  };
}
