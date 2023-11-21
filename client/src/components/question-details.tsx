import * as React from 'react';
import { Component } from 'react-simplified';
import {
  Card,
  Alert,
  Row,
  Column,
  Button,
  SideMenu,
  Form,
  ButtonFavourite,
  ButtonUpvote,
  ButtonDownVote,
  ButtonCommentBuble,
  MiniCard,
  InsideMiniCard,
} from '../widgets';

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
  filter: string = 'all'; // State to manage the filter type

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
  questionComment: QuestionComment = {
    question_comment_id: 0,
    text: '',
    question_id: 0,
    user_id: 0,
  };
  answerComment: AnswerComment = { answer_comment_id: 0, text: '', answer_id: 0, user_id: 0 };
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
        <Column width={3}>
          <SideMenu
            header="Menu"
            items={[
              { label: 'Questions', to: '/questions' },
              { label: 'My Questions', to: '/myquestions' },
              { label: 'My Favourite Answers', to: '/favourites' },
              { label: 'New Question', to: '/createquestion' },
              { label: 'Tags', to: '/tags' },
            ]}
          />
        </Column>
        <Card title="Question">
          <MiniCard title={this.question.title}>{this.question.text}</MiniCard>

          <MiniCard title="Tags">
            {this.relations
              .filter((relation) => relation.question_id == this.props.match.params.id)
              .map((relation) => this.tags.find((tag) => tag.tag_id == relation.tag_id))
              .filter((tag): tag is Tag => tag !== undefined)
              .map((tag) => tag.name)
              .join(', ')}
              
          </MiniCard>
          <Row>
            <Column width={1}>{this.createQuestionEditButton()}</Column>
          </Row>
        </Card>
        <Row>
          <Column width={5}>
            {this.handleQuestionCommentDisplay()}
            {this.addQuestionCommentInput()}
          </Column>
          <Column width={5}>
            {this.handleAnswerMapDisplay()}
            {this.addAnswerInput()}
          </Column>
        </Row>
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
      .catch((error) => console.error(error.message));

    service
      .getQuestion(this.props.match.params.id)
      .then((question) => (this.question = question))
      .catch((error: Error) => console.error('Error getting question: ' + error.message));

    service.getAllTagQuestionRelations().then((relations) => (this.relations = relations));

    service
      .getAnswerScoresByQuestionId(this.props.match.params.id)
      .then((answers_votes) => (this.answers_votes = answers_votes))
      .catch((error: Error) => console.error('Error getting answers: ' + error.message));

    service
      .getQuestionCommentsForQuestion(this.props.match.params.id)
      .then((questionComments) => (this.questionComments = questionComments))
      .catch((error: Error) => console.error('Error getting question comments: ' + error.message));
  }

  handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.filter = event.target.value;
    this.loadAnswers(); // Call a method to load questions based on the selected filter
  };

  //Logic for fetching and filtering answers
  loadAnswers() {
    switch (this.filter) {
      case 'all':
        service
          .getAnswerScoresByQuestionId(this.props.match.params.id)
          .then((answers_votes) => (this.answers_votes = answers_votes))
          .catch((error: Error) => console.error('Error getting answers: ' + error.message));
        break;
      case 'popular':
        service
          .getAnswerScoresByQuestionId(this.props.match.params.id)
          .then((answers_votes) => {
            // Sort answers by score in descending order
            this.answers_votes = answers_votes.sort((a: any, b: any) => b.score - a.score);
          })
          .catch((error: Error) => console.error('Error getting answers: ' + error.message));
        break;
      case 'mostRecent':
        service
          .getAnswerScoresByQuestionId(this.props.match.params.id)
          .then((answers_votes) => {
            // Sort answers by last_updated in descending order
            this.answers_votes = answers_votes.sort((a: any, b: any) => {
              const dateA = new Date(a.last_updated);
              const dateB = new Date(b.last_updated);
              return dateB.getTime() - dateA.getTime();
            });
          })
          .catch((error: Error) => console.error('Error getting answers: ' + error.message));
        break;

      case 'confirmed':
        service.getAnswerScoresByQuestionId(this.props.match.params.id).then((answers_votes) => {
          // Filter answers by confirmed_answer
          this.answers_votes = answers_votes.filter(
            (answer: { confirmed_answer: number }) => answer.confirmed_answer == 1,
          );
        });
        break;
    }
  }

  createQuestionEditButton() {
    if (this.connectedUser == this.question.user_id) {
      return (
        <Button.Success
          onClick={() => history.push('/questions/' + this.props.match.params.id + '/edit')}
        >
          Edit
        </Button.Success>
      );
    } else
      return (
        <Row>
          <div style={{ minHeight: '1em' }} />
        </Row>
      );
  }

  addQuestionCommentInput() {
    if (this.connectedUser) {
      return (
        <MiniCard title="Add comment">
          <Row>
            <Column>
              <Form.Textarea
                placeholder="Add comment"
                type="text"
                value={this.questionComment.text}
                onChange={(event) => (this.questionComment.text = event.currentTarget.value)}
                rows={5}
                maxLength={1000}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Button.Success onClick={this.createComment}>Add</Button.Success>
            </Column>
          </Row>
        </MiniCard>
      );
    } else return;
  }

  createComment() {
    if (this.connectedUser) {
      service
        .createQuestionComment(
          this.questionComment.text,
          this.props.match.params.id,
          this.connectedUser,
        )
        .then(() => this.mounted())
        .then(() => (this.questionComment.text = ''))
        .catch((error) => console.error('Error saving comment: ' + error.message));
    } else alert('You have to be logged in to comment');
  }
  addAnswerInput() {
    if (this.connectedUser) {
      return (
        <MiniCard title="Add answer">
          <Row>
            <Column>
              <Form.Textarea
                placeholder="add answer"
                type="text"
                value={this.answer.text}
                onChange={(event) => (this.answer.text = event.currentTarget.value)}
                rows={5}
                maxLength={1000}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Button.Success onClick={this.createAnswer}>Add</Button.Success>
            </Column>
          </Row>
        </MiniCard>
      );
    } else return;
  }

  handleQuestionCommentDisplay() {
    //If logged in
    if (this.connectedUser) {
      return (
        <MiniCard title="Comments">
          {this.questionComments.map((questionComment) => {
            if (questionComment.question_id == this.props.match.params.id) {
              return (
                <InsideMiniCard title="" key={questionComment.question_comment_id}>
                  <Row>
                    {questionComment.text}
                    <Row>
                      <Column>{this.handleQuestionCommentEdit(questionComment)}</Column>
                    </Row>
                  </Row>
                </InsideMiniCard>
              );
            }
          })}
        </MiniCard>
      );
    }

    //If not logged in
    else {
      return (
        <Card title="Comments">
          {this.questionComments.map((questionComment) => {
            if (questionComment.question_id == this.props.match.params.id) {
              return (
                <Card title="" key={questionComment.question_comment_id}>
                  <Row>{questionComment.text}</Row>
                </Card>
              );
            }
          })}
        </Card>
      );
    }
  }

  handleQuestionCommentEdit(questionComment: QuestionComment) {
    //if logged in
    if (this.connectedUser == questionComment.user_id) {
      return (
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
      );
      //if not logged in
    } else return;
  }

  handleAnswerMapDisplay() {
    //if logged in
    if (this.connectedUser) {
      return (
        <MiniCard title="Answers">
          <Form.Select value={this.filter} onChange={this.handleFilterChange}>
            <option value="all">All Answers</option>
            <option value="popular">Most Popular Answers</option>
            <option value="mostRecent">Most Recent</option>
            <option value="confirmed">Confirmed Answers</option>
          </Form.Select>
          {this.answers_votes.map((answer) => {
            const isFavoriteKey = `isFavorite_${answer.answer_id}`;
            const isConfirmedAnswerKey = `isConfirmedAnswer_${answer.answer_id}`;
            if (answer.question_id == this.props.match.params.id) {
              return (
                <InsideMiniCard title="" key={answer.answer_id}>
                  {answer.text}
                  <Column>
                    <ButtonUpvote
                      onClick={() => {
                        this.addUpvote(answer.answer_id);
                      }}
                    ></ButtonUpvote>
                  </Column>
                  <Column>{answer.score}</Column>
                  <ButtonDownVote
                    onClick={() => {
                      this.addDownvote(answer.answer_id);
                    }}
                  ></ButtonDownVote>

                  <ButtonCommentBuble
                    onClick={() => {
                      this.sendToAnswerCommentPage(answer.answer_id);
                    }}
                  ></ButtonCommentBuble>

                  <Column>{this.handleEditAnswer(answer.answer_id, answer.user_id)}</Column>

                  <ButtonFavourite
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
                    {this.state[isFavoriteKey as keyof State] ? 'Remove from favorites' : ''}
                  </ButtonFavourite>
                  <Button.Success
                    onClick={() => {
                      if(this.question.user_id == this.connectedUser){
                        if (this.state[isConfirmedAnswerKey as keyof State]) {
                          this.setConfirmedAnswer(answer.answer_id);
                          this.setState({ [isConfirmedAnswerKey]: false });
                        } else {
                          this.setConfirmedAnswer(answer.answer_id);
                          this.setState({ [isConfirmedAnswerKey]: true });
                        }
                      }else return alert('You are not the owner of this question')
                      
                    }}
                  >
                    {this.state[isConfirmedAnswerKey as keyof State]
                      ? 'Remove confirmed answer'
                      : 'Set as confirmed answer'}
                  </Button.Success>
                </InsideMiniCard>
              );
            }
          })}
        </MiniCard>
      );
    }

    //If not logged in
    else
      return (
        <Card title="Answers">
          <Form.Select value={this.filter} onChange={this.handleFilterChange}>
            <option value="all">All Answers</option>
            <option value="popular">Most Popular Answers</option>
            <option value="mostRecent">Most Recent</option>
            <option value="confirmed">Confirmed Answers</option>
          </Form.Select>
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
      );
  }

  handleEditAnswer(answer_id: number, user_id: number) {
    //if logged in as owner of answer
    if (this.connectedUser == user_id) {
      return (
        <Button.Success
          onClick={() =>
            history.push(
              '/questions/' + this.props.match.params.id + '/answers/' + answer_id + '/edit',
            )
          }
        >
          Edit
        </Button.Success>
      );
    } else return;
  }
  createAnswer() {
    if (this.connectedUser) {
      service
        .createAnswer(this.answer.text, this.props.match.params.id, this.connectedUser)
        .then(() => this.setHasAnswered())
        .then(() => this.mounted())
        .then(() => (this.answer.text = ''))
        .catch((error) => console.error('Error saving answer: ' + error.message));
    } else alert('You have to be logged in to answer');
  }
  async setHasAnswered() {
    this.question.has_answer = 1;
    await service
      .updateQuestion(this.question)
      .catch((error) => console.error('Error saving question: ' + error.message));
  }

  sendToAnswerCommentPage(answer_id: number) {
    history.push('/questions/' + this.props.match.params.id + '/answers/' + answer_id);
  }

  addUpvote(answer_id: number) {
    if (this.connectedUser) {
      service
        .createVote(this.connectedUser, answer_id, 1)
        .then(() => this.mounted())
        .catch((error) => console.error('Error saving answer: ' + error.message));
    } else alert('You have to be logged in to vote');
  }

  addDownvote(answer_id: number) {
    if (this.connectedUser) {
      service
        .createVote(this.connectedUser, answer_id, 0)
        .then(() => this.mounted())
        .catch((error) => console.error('Error saving answer: ' + error.message));
    } else alert('You have to be logged in to vote');
  }

  addFavourite(answer_id: number, user_id: number) {
    if (this.connectedUser) {
      service
        .handleFavouriteRelation(answer_id, user_id)
        .catch((error) => console.error('Error saving answer: ' + error.message));
    } else alert('You have to be logged in to add to favorites');
  }

  // Set confirmed answer for connected user

  setConfirmedAnswer(answer_id: number) {
      service
        .getAnswerById(answer_id)
        .then((answer) => (this.answer = answer))
        .then(() => {
          this.answer.confirmed_answer = this.answer.confirmed_answer == 1 ? 0 : 1;
          service
            .updateAnswer(this.answer)
            .then(() => this.mounted())
            .then(() => (this.answer.text = ''))
            .catch((error) => console.error('Error saving answer: ' + error.message));
        })
        .catch((error) => console.error('Error getting answer: ' + error.message));
  
  }
}
