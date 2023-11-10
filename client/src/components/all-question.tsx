import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Column, Row, Form } from '../widgets';
import service, { Question, Tag } from '../service';

export class AllQuestions extends Component {
    questions: Question[] = [];
    filter: string = 'All'; // State to manage the filter type
    search = '';
    tags: Tag[] = [];
  
    render() {
      return (
        <>   
          <Card title='All Questions'>
            <Row>
                <Column width={2}>
                <Form.Select value={this.filter} onChange={this.handleFilterChange}>
                    <option value="all">All Questions</option>
                    <option value="popular">Most Popular</option>
                    <option value="unanswered">Unanswered</option>
                </Form.Select>
                </Column>
                <Column width={10}>
                    <Form.Input
                    type='text' 
                    value={this.search} 
                    onChange={(event) => this.search = event.currentTarget.value}
                    />
                </Column>
            </Row>

               
            {/* <Row>
            {this.tags.map((tag) => (
                        <Column>
                            <Form.Label>
                                {tag.name}
                                <input type='checkbox'
                                    value={tag.tag_id}
                                    onChange={() => {'vet ikke'}}
                                />
                            
                            </Form.Label>
                        
                        </Column>
                    ))}
            </Row> */}
          </Card>
          {this.questions
                .filter((question) => (question.title.toLowerCase().includes(this.search.toLowerCase())))
                .map((question, i) => (
                    <Card key={i} title={question.title}>
                        <Row>
                            <Column width={2}>{question.text}</Column>
                        </Row>
                    </Card>
                ))
                }
        </>
      );
    }

    handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.filter = event.target.value;
        this.loadQuestions(); // Call a method to load questions based on the selected filter
      };
  
    // Method to load questions based on the current filter
    loadQuestions() {
      // Add logic here to fetch and filter questions accordingly
      // This is a placeholder for whatever your service methods might be
      switch (this.filter) {
        case 'All':
          // Fetch all questions
          break;
        case 'Popular':
          // Fetch most popular questions
          break;
        case 'Unanswered':
          // Fetch unanswered questions
          break;
        default:
          // Handle default case
      }
    }
  
    // Lifecycle method to load questions when the component mounts
    mounted() {
      this.loadQuestions();

      service
        .getAllTags()
        .then((tags) => (this.tags = tags))
        .catch((error) => Alert.danger(error.message));  
      
      service
        .getAllQuestions()
        .then((questions) => (this.questions = questions))
        .catch((error) => Alert.danger(error.message));

  }
}