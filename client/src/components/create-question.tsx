import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, SideMenu, Button, MainCard, Alert, Form } from '../widgets';
import service, { Question, Tag_Question_Relation, Tag } from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student
export class CreateQuestion extends Component {
    tags: Tag[] = [];
    selectedTags: number[] = []; 
    title = "";
    text = "";
  
    render() { 
      return (
        <>
          <Card title="">
            <div className="row">
              <SideMenu header="Public"
                items={[{ label: "Questions", to: "/questions" }, { label: "Tags", to: "/tags" }]}/>
              <MainCard header="Ask a Question">
                <Row>
                  <Column width={2}>
                    <Form.Label>Title:</Form.Label>
                  </Column>
                  <Column>
                  <Form.Input
                type="text"
                value={this.title}
                onChange={(event) => (this.title = event.currentTarget.value)}
              />
                  </Column> 
                </Row><br/>
                <Row>
                  <Column width={2}>
                    <Form.Label>Text:</Form.Label>
                  </Column>
                  <Column>
                    <Form.Textarea 
                      placeholder='Text'
                      value={this.text}
                      onChange={(event) => (this.text = event.currentTarget.value)}
                      rows={5}
                    />
                  </Column>
                </Row><br/>
                <Row>
                  <Column width={2}>
                    <Form.Label>Tags:</Form.Label>
                  </Column>
                  <Column>
                    <Row>
                    {this.tags.map((tag) => (
                        <Column>
                            <Form.Label>
                                {tag.name}
                                <input type='checkbox'
                                    value={tag.tag_id}
                                    onChange={(event) => {this.handleCheckboxChange(event)}}
                                />
                            
                            </Form.Label>
                        
                        </Column>
                    ))}
                </Row>
                  </Column>
                </Row><br/>
                <Row>
                  <Column>
                  <Button.Success onClick={() => {this.handleAddQuestion()}}>AskMorgan</Button.Success> 
                  </Column>
                </Row>
            </MainCard>
            </div> 
          </Card>
        </>
      );
    }

    mounted() {
        
      service
        .getAllTags()
        .then((tags) => (this.tags = tags))
        .catch((error) => Alert.danger(error.message));  
    }
  
    handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let tagId = Number(event.target.value);
      console.log(tagId)
  
      if (event.target.checked) {
          this.selectedTags.push(tagId);
      } else {
          this.selectedTags = this.selectedTags.filter(id => id !== tagId);
      }
  }
  
  
  handleAddQuestion = async () => {
      let question_id = await service.createQuestion(this.title, this.text);
      
  
      // For each selected tag, create a new relation in the Tag_question_relation tabl
      this.selectedTags.forEach(tag_id => {
          service.createTagQuestionRelation(tag_id, question_id);
      });
      
      // Redirect to the question page
      history.push(`/questions/${question_id}`);
  }
};


