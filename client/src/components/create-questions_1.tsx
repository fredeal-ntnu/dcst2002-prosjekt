import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, Form, Card, Row, Column, Button} from '.././widgets';
import { NavLink } from 'react-router-dom';
import service, { Question, Tag_Question_Relation, Tag } from '.././service';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student
export class CreateQuestion extends Component {
    tags: Tag[] = [];
    title = "";
    text = "";
    selectedTags: number[] = []; 
  

  render() {
    return (
          <Row>
            <Form.Label>Ask a question</Form.Label>
                <Form.Input
                    type='text'
                    placeholder='Tittel'
                    value={this.title}
                    onChange={(event) => (this.title = event.currentTarget.value)}
                />
                <Form.Input
                    type='text'
                    placeholder='Text'
                    value={this.text}
                    onChange={(event) => (this.text = event.currentTarget.value)}
                />
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
                <Button.Success onClick={() => {this.handleAddQuestion()}}>Create</Button.Success>                    
          </Row>
    );
  }

  mounted() {
        
    service
      .getAllTags()
      .then((tags) => (this.tags = tags))
      .catch((error) => Alert.danger(error.message));
      console.log(this.tags)
  
  }

  handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let tagId = Number(event.target.value);

    if (event.target.checked) {
        this.selectedTags.push(tagId);
    } else {
        this.selectedTags = this.selectedTags.filter(id => id !== tagId);
    }
}


handleAddQuestion = async () => {
    console.log(typeof(this.selectedTags))
    const question_id = await service.createQuestion(this.title, this.text);

    // For each selected tag, create a new relation in the Tag_question_relation tabl
    this.selectedTags.forEach(tag_id => {
        service.createTagQuestionRelation(tag_id, question_id);
    });
    
    // Redirect to the question page
    history.push(`/questions/${question_id}`);
}


}







/*

createquestion{
  hent ut alle tagger og display på siden i form av checkbox

  insert tittel og text fra bruker
  send til tabell
  få ut result.question id

  bruk question.id til å loope igjennom alle tagger som vi har hentet, ved bruk av tag.id som vi kan sjekke med if checked.
  for alle tags funnet med den question.id, insert question.id og tag.id i tag_question_relation


}

*/