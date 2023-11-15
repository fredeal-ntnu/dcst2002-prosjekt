import * as React from 'react';
import { Component } from 'react-simplified';
import {Card, Alert, Row, Column, Button, SideMenu, Form } from '../widgets';
import service, { Question, Tag, Tag_Question_Relation, Answer, QuestionComment, AnswerComment, Vote, User } from '../service';
import { createHashHistory } from 'history';

const history = createHashHistory();

export class QuestionDetails extends Component<{ match: { params: { id: number } } }> {
  relations: Tag_Question_Relation[] = [];
  tags: Tag[] = [];
  answers: Answer[] = [];
  questionComments: QuestionComment[] = [];
  votes: Vote[] = []
  question: Question = { question_id: 0, title: '', text: '', view_count: 0, has_answer: 0, user_id: 0};
  answer: Answer = { answer_id: 0, text: '', confirmed_answer: false, question_id: 0 };
  questionComment: QuestionComment = { question_comment_id: 0, text: '', question_id: 0 };
  answerComment: AnswerComment = { answer_comment_id: 0, text: '', answer_id: 0 };
  vote: Vote = { user_id: 0, answer_id: 0, vote_type: false };
  connectedUser = 0;
  score: number = 0;

  render() {
  
    return (
      <>{this.connectedUser}
     
            <SideMenu
              header="Public"
              items={[
                { label: 'Questions', to: '/questions' },
                { label: 'Tags', to: '/tags' },
              ]}
            />
            <Card title="Question">
              
              
                  <Card title="Title">{this.question.title}</Card>
                
                
                  <Card title="Text">{this.question.text}</Card>
               
                
                <Row>
                  
                    <Card title="Tags">
                      {this.relations
                        .filter((relation) => relation.question_id == this.props.match.params.id)
                        .map((relation) => this.tags.find((tag) => tag.tag_id == relation.tag_id))
                        .filter((tag): tag is Tag => tag !== undefined)
                        .map((tag) => tag.name)
                        .join(', ')}
                    </Card>
                 
                </Row>
                <Row>
                  <Column width={2}>
                    <Button.Success
                      onClick={() =>
                        history.push('/questions/' + this.props.match.params.id + '/edit')
                      }
                    >
                      Edit
                    </Button.Success>
                  </Column>
                </Row>
            </Card>
            <Card title="Comments">
                    {this.questionComments.map((questionComment) => {
                      if (questionComment.question_id == this.props.match.params.id) {
                        return (
                          <Card title="">
                            <Row key={questionComment.question_comment_id}>
                              {questionComment.text}
                              <Row>
                                <Column>
                                  <Button.Success
                                    onClick={() =>
                                      history.push(
                                        '/questions/' +
                                          this.props.match.params.id +
                                          '/comments/' +
                                          questionComment.question_comment_id + '/edit',
                                      )
                                    }
                                  >
                                    Edit
                                  </Button.Success>
                                </Column>
                              </Row>
                            </Row>
                          </Card>
                        )
                      }
                    })}
                    <Row>
                      <Column>
                        <Form.Textarea
                          placeholder="Add comment"
                          type="text"
                          value={this.questionComment.text}
                          onChange={(event) =>
                            (this.questionComment.text = event.currentTarget.value)
                          }
                          rows={5}
                        />
                      </Column>
                    </Row>
                    <Row>
                      <Column>
                        <Button.Success onClick={this.createComment}>Add</Button.Success>
                      </Column>
                    </Row>
                  </Card>
                  <Card title="Answers HUSK SORTERING">
                    {this.answers.map((answer) => {
                      if (answer.question_id == this.props.match.params.id) {
                        return (
                          
                          <Card title="">
                            <Row key={answer.answer_id}>
                              {answer.text}
                              <Row>
                                <Column>
                                  <Button.Success  onClick={() => {
                                      this.addUpvote(answer.answer_id);
                                    }}>Upvote</Button.Success>
                                </Column>
                                <Column>
                                  <Button.Success onClick={() => {}}>Downvote</Button.Success>
                                </Column>
                                
                                  <Column>
                                    <Card title="Votes">
                                      {answer.score}
                                      
                                      
                              

                          
                                    </Card>
                                  </Column>
                                
                                <Column>
                                  <Button.Success
                                    onClick={() => {
                                      this.sendToAnswerCommentPage(answer.answer_id)}}>Comments</Button.Success>
                                </Column>
                                <Column>
                                  <Button.Success
                                    onClick={() =>
                                      history.push(
                                        '/questions/' +
                                          this.props.match.params.id +
                                          '/answers/' +
                                          answer.answer_id +
                                          '/edit',
                                      )
                                    }
                                  >
                                    Edit
                                  </Button.Success>
                                </Column>
                                <Column>
                                  <Button.Success onClick={() => {}}>Mark as best</Button.Success>
                                </Column>
                              </Row>
                            </Row>
                          </Card>
                        );
                      }
                    })}
                    <Row>
                      <Column>
                        <Form.Textarea
                          placeholder="add answer"
                          type="text"
                          value={this.answer.text}
                          onChange={(event) => (this.answer.text = event.currentTarget.value)}
                          rows={5}
                        />
                      </Column>
                    </Row>
                    <Row>
                      <Column>
                        <Button.Success onClick={this.createAnswer}>Add</Button.Success>
                      </Column>
                    </Row>
                  </Card>
                
              
              
          
          
        
      </>
    );
  }

  mounted() {
    service
      .getAllTags()
      .then((tags) => (this.tags = tags))
      .catch((error) => Alert.danger(error.message));

    service
      .getQuestion(this.props.match.params.id)
      .then((question) => (this.question = question))
      .catch((error: Error) => Alert.danger('Error getting question: ' + error.message));

    service.getAllTagQuestionsRelations().then((relations) => (this.relations = relations));

    service
      .getAnswersForQuestion(this.props.match.params.id)
      .then((answers) => (this.answers = answers));

    service
      .getQuestionCommentsForQuestion(this.props.match.params.id)
      .then((questionComments) => (this.questionComments = questionComments))
      .catch((error: Error) => Alert.danger('Error getting question comments: ' + error.message))

      // this.answers.map((answer) => {
      //   service.getVotesByAnswerId(answer.answer_id)
      //     .then((vote) => { this.vote = vote })
      //     .catch((error) => {
      //       console.error(error);
      //     });
      // });
    
    
      
  }

  createAnswer() {
    service
      .createAnswer(this.answer.text, this.props.match.params.id)
      .then(() => this.setHasAnswered()) 
      .then(() => location.reload())
      .catch((error) => Alert.danger('Error saving answer: ' + error.message));
  }
  async setHasAnswered() {
    this.question.has_answer = 1;
    console.log(this.question)
    await service
      .updateQuestion(this.question)
      .catch((error) => Alert.danger('Error saving question: ' + error.message));
  }

  createComment() {
    service
      .createQuestionComment(this.questionComment.text, this.props.match.params.id)
      .then(() => location.reload())
      .catch((error) => Alert.danger('Error saving comment: ' + error.message));
  }

  sendToAnswerCommentPage(answer_id: number) {
    history.push(
      '/questions/' + this.props.match.params.id + '/answers/' + answer_id,
    );
  }

  addUpvote(answer_id: number) {
    console.log(this.connectedUser, answer_id)
    
    service
      .createVote(this.connectedUser, answer_id, true)
      .then(() => location.reload())
      .catch((error) => Alert.danger('Error saving answer: ' + error.message));
  }

  // setConfirmedAnswer() {
  //   if (this.connectedUser == this.question.user_id) {
  //     this.answer.confirmed_answer = true;
  //     service
  //       .updateAnswer(this.answer)
  //       .then(() => location.reload())
  //       .catch((error) => Alert.danger('Error saving answer: ' + error.message));
  //   } else {
  //     Alert.danger('You are not the owner of this question');
  //   }
  // }


  // createVoteForAnswer() {
  //   service
  //     .createVoteForAnswer(this.vote.user_id, this.vote.answer_id, this.vote.vote_type)
  //     .then(() => location.reload())
  //     .catch((error) => Alert.danger('Error saving answer: ' + error.message));
  // }


  // getVotesByAnswerId(id: number) {
  //   console.log(id)
  //   service
  //   .getVotesByAnswerId(id)
  //   .then((votes) => (this.votes = votes))
  //   .catch((error: Error) => Alert.danger('Error getting votes: ' + error.message))
  // }
  




  // downwoteAnswer() {
  //   service.downwoteAnswer(this.answer.answer_id)
  //   .then(() => location.reload())
  //   .catch((error) => Alert.danger('Error saving answer: ' + error.message));


}
