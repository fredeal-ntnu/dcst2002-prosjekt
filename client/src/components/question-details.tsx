import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Button, SideMenu, Form } from '../widgets';
import service, {
  Question,
  Tag,
  Tag_Question_Relation,
  Answer,
  QuestionComment,
  AnswerComment,
  Vote,
  User,
} from '../service';
import { createHashHistory } from 'history';
import { useState } from 'react';

const history = createHashHistory();

interface State {
  isFavorite: boolean;
  isConfirmedAnswer: boolean;
  // define other state properties here
}

export class QuestionDetails extends Component<{ match: { params: { id: number } } }> {
  relations: Tag_Question_Relation[] = [];
  tags: Tag[] = [];
  answers: Answer[] = [];
  questionComments: QuestionComment[] = [];
  votes: Vote[] = [];
  question: Question = {
    question_id: 0,
    title: '',
    text: '',
    view_count: 0,
    has_answer: 0,
    user_id: 0,
  };
  answer: Answer = {
    answer_id: 0,
    text: '',
    confirmed_answer: 0,
    last_updated: new Date(),
    question_id: 0,
    user_id: 0,
  };
  questionComment: QuestionComment = { question_comment_id: 0, text: '', question_id: 0, user_id: 0};
  answerComment: AnswerComment = { answer_comment_id: 0, text: '', answer_id: 0, user_id: 0};
  vote: Vote = { user_id: 0, answer_id: 0, vote_type: 0 };
  user: User = { user_id: 0, google_id: '', username: '', email: '' };
  score: number = 0;
  connectedUser: number = 0;
  answers_votes: Answer[] = [];

  state: State = {
    isFavorite: false,
    isConfirmedAnswer: false,
  };

  render() {
    return (
      <>
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
             {this.createQuestionEditButton()}
            </Column>
          </Row>
        </Card>
        {this.handleQuestionCommentDisplay()}
        {this.addQuestionCommentInput()}
       {this.handleAnswerMapDisplay()}
       {this.addAnswerInput()}
      </>
    );
  }

  mounted() {
    service.getMe().then((user) => {
      this.user = user;
      this.connectedUser = user.user_id;
    });
    service
      .getAllTags()
      .then((tags) => (this.tags = tags))
      .catch((error) => Alert.danger(error.message));

    service
      .getQuestion(this.props.match.params.id)
      .then((question) => (this.question = question))
      .catch((error: Error) => Alert.danger('Error getting question: ' + error.message));

    service.getAllTagQuestionsRelations()
    .then((relations) => (this.relations = relations));

    service
      .getVotesBs(this.props.match.params.id)
      .then((answers_votes) => (this.answers_votes = answers_votes))
      .catch((error: Error) => Alert.danger('Error getting answers: ' + error.message));

    service
      .getQuestionCommentsForQuestion(this.props.match.params.id)
      .then((questionComments) => (this.questionComments = questionComments))
      .catch((error: Error) => Alert.danger('Error getting question comments: ' + error.message));

    service
    .getAnswersByQuestionId(this.props.match.params.id)
    .then((answers) => (this.answers = answers))
    .catch((error: Error) => Alert.danger('Error getting answers: ' + error.message))

    // this.answers.map((answer) => {
    //   service.getVotesByAnswerId(answer.answer_id)
    //     .then((vote) => { this.vote = vote })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // });
  }

 

createQuestionEditButton() {
  
  if(this.connectedUser == this.question.user_id) {
    return(
      <Button.Success
      onClick={() =>  history.push('/questions/' + this.props.match.params.id + '/edit')}
    >
      Edit
    </Button.Success>
    )
  }
    else return
}


  addQuestionCommentInput() {
    if(this.connectedUser) {
      return(
        <Card title="Add comment">
        <Row>
          <Column>
            <Form.Textarea
              placeholder="Add comment"
              type="text"
              value={this.questionComment.text}
              onChange={(event) => (this.questionComment.text = event.currentTarget.value)}
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
      )
      
    }else return
   
  }

  
  createComment() {
    if(this.connectedUser) {
      service
      .createQuestionComment(this.questionComment.text, this.props.match.params.id, this.connectedUser)
      .then(() => this.mounted())
      .catch((error) => Alert.danger('Error saving comment: ' + error.message));
    }
    else alert("You have to be logged in to comment")
  }

  addAnswerInput() {
    if(this.connectedUser) {
      return(
        <Card title="Add answer">
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
      )
    }else return
  } 



handleQuestionCommentDisplay() {
  
  if(this.connectedUser == this.questionComment.user_id) {
   return(
    <Card title="Comments">
    {this.questionComments.map((questionComment) => {
      if (questionComment.question_id == this.props.match.params.id) {
        return (
          <Card title="" key={questionComment.question_comment_id}>
            <Row>
              {questionComment.text}
              <Row>
                <Column>
                  <Button.Success
                    onClick={() =>
                      history.push(
                        '/questions/' +
                          this.props.match.params.id +
                          '/comments/' +
                          questionComment.question_comment_id +
                          '/edit',
                      )
                    }
                  >
                    Edit
                  </Button.Success>
                </Column>
              </Row>
            </Row>
          </Card>
        );
      }
    })}


  </Card>
   )
  }
  else {
    return(
      <Card title="Comments">
      {this.questionComments.map((questionComment) => {
        if (questionComment.question_id == this.props.match.params.id) {
          return (
            <Card title="" key={questionComment.question_comment_id}>
              <Row>
                {questionComment.text}
              </Row>
            </Card>
          );
        }
      })}


    </Card>
    )
  }
}


handleAnswerMapDisplay () {
  if(this.connectedUser) {
return(
  <Card title="Answers HUSK SORTERING">
    {this.answers_votes.map((answer) => {
      
      const isFavoriteKey = `isFavorite_${answer.answer_id}`;
      if (answer.question_id == this.props.match.params.id) {
        return (
          <Card title="" key={answer.answer_id}>
            <Row>
              {answer.text}
              <Row>
                <Column>
                  <Button.Success
                    onClick={() => {
                      this.addUpvote(answer.answer_id);
                    }}
                  >
                    Upvote
                  </Button.Success>
                </Column>
                <Column>
                  <Button.Success
                    onClick={() => {
                      this.addDownvote(answer.answer_id);
                    }}
                  >
                    Downvote
                  </Button.Success>
                </Column>
                <Column>
                  <Card title="Votes">{answer.score}</Card>
                </Column>
                <Column>
                  <Button.Success
                    onClick={() => {
                      this.sendToAnswerCommentPage(answer.answer_id);
                    }}
                  >
                    Comments
                  </Button.Success>
                </Column>
                <Column>
                {this.handleEditAnswer(answer.answer_id,answer.user_id)}
                </Column>
                <Column>
                  <Button.Success onClick={() => this.setConfirmedAnswer(answer.answer_id)}>
                    Mark as best
                  </Button.Success>
                </Column>
                <Column>
                  <Button.Success
                    onClick={() => {
                      if (this.state[isFavoriteKey as keyof State]) {
                        this.addFavourite(answer.answer_id, this.connectedUser);
                        this.setState({ [isFavoriteKey]: false });
                      } else {
                        this.addFavourite(answer.answer_id, this.connectedUser);
                        this.setState({ [isFavoriteKey]: true });
                      }
                    }}
                  >
                    {this.state[isFavoriteKey as keyof State] ? 'Remove from favorites' : 'Add to favorites'}
                  </Button.Success>
                </Column>
              </Row>
            </Row>
          </Card>
        );
      }
    })}
    
   
  </Card>
)
    

  }

  else return (
    <Card title="Answers HUSK SORTERING">
    {this.answers_votes.map((answer) => {
      const isFavoriteKey = `isFavorite_${answer.answer_id}`;
      if (answer.question_id == this.props.match.params.id) {
        return (
          <Card title="" key={answer.answer_id}>
            <Row>
              {answer.text}
              
                
                <Column>
                  <Card title="Votes">{answer.score}</Card>
                </Column>
                
               
              </Row>
            
          </Card>
        );
      }
    })}
    
   
  </Card>
  )
}


handleEditAnswer(answer_id: number, user_id: number) {
  
  console.log(this.answer.answer_id)

  if(this.connectedUser == user_id) {
    return(
      <Button.Success
      onClick={() =>  history.push('/questions/' + this.props.match.params.id + '/answers/' + answer_id + '/edit')}
    >
      Edit
    </Button.Success>
    )
  }

  else return
}





  createAnswer() {
    if(this.connectedUser) {
      service
      .createAnswer(this.answer.text, this.props.match.params.id, this.connectedUser)
      .then(() => this.setHasAnswered())
      .then(() => this.mounted())
      .catch((error) => Alert.danger('Error saving answer: ' + error.message));
    }
    else(alert("You have to be logged in to answer"))
  }
  async setHasAnswered() {
    this.question.has_answer = 1;
    await service
      .updateQuestion(this.question)
      .catch((error) => Alert.danger('Error saving question: ' + error.message));
  }

  sendToAnswerCommentPage(answer_id: number) {
    history.push('/questions/' + this.props.match.params.id + '/answers/' + answer_id);
  }

  handleVoteDisplay(answer_id: number) {

  }

  addUpvote(answer_id: number) {
    if(this.connectedUser) {
      service
      .createVote(this.connectedUser, answer_id, 1)
      .then(() => this.mounted())
      .catch((error) => Alert.danger('Error saving answer: ' + error.message));
    }
    else(alert("You have to be logged in to vote"))
  }

  addDownvote(answer_id: number) {
    if(this.connectedUser) {
      service
      .createVote(this.connectedUser, answer_id, 0)
      .then(() => this.mounted())
      .catch((error) => Alert.danger('Error saving answer: ' + error.message));
    }
    else alert("You have to be logged in to vote")
   
  }

  addFavourite(answer_id: number, user_id: number) {
    if(this.connectedUser) {
      service
      .createFavouriteRelation(answer_id, user_id)
      .catch((error) => Alert.danger('Error saving answer: ' + error.message));
    }
    else alert("You have to be logged in to add to favorites")
    
  }

  // Set confirmed answer for connected user

   setConfirmedAnswer(answer_id: number) {

    

    if (this.question.user_id == this.connectedUser) {
      service
        .getAnswerById(answer_id)
        .then((answer) => (this.answer = answer))
        .then(() => {
          this.answer.confirmed_answer = 1;
          service.updateAnswer(this.answer)
          .then(() => this.mounted())
          .catch((error) => Alert.danger('Error saving answer: ' + error.message));
        
      })
    .catch((error) => Alert.danger('Error getting answer: ' + error.message));

      
    

   }else alert("You are not the owner of this question")
  
  }

}
