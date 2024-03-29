import * as React from 'react';
import { ReactNode, ChangeEvent } from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { Question, Answer } from './service';
import service from './service';

import { EyeIcon, FavouriteIcon, UpvoteIcon, DownvoteIcon, CommentBubleIcon } from './icons';

export class Card extends Component<{ title: ReactNode; smallTitle?: boolean }> {
  renderTextLines(text: string, maxCharsPerLine: number): JSX.Element[] {
    const lines = [];
    for (let i = 0; i < text.length; i += maxCharsPerLine) {
      lines.push(text.slice(i, i + maxCharsPerLine));
    }
    return lines.map((line, index) => <div key={index}>{line}</div>);
  }

  render() {
    const maxCharsPerLine = 1000;

    return (
      <div className="card" style={{ width: '900px' || 'auto', margin: '20px' }}>
        <div className="card-body">
          {this.props.smallTitle ? (
            <h6 className="card-title">{this.props.title}</h6>
          ) : (
            <h5 className="card-title">{this.props.title}</h5>
          )}
          <div className="card-text">
            {typeof this.props.children === 'string'
              ? this.renderTextLines(this.props.children, maxCharsPerLine)
              : this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
export class MiniCard extends Component<{ title: ReactNode; smallTitle?: boolean }> {
  renderTextLines(text: string, maxCharsPerLine: number): JSX.Element[] {
    const lines = [];
    for (let i = 0; i < text.length; i += maxCharsPerLine) {
      lines.push(text.slice(i, i + maxCharsPerLine));
    }
    return lines.map((line, index) => <div key={index}>{line}</div>);
  }

  render() {
    const maxCharsPerLine = 1000;

    return (
      <div className="card" style={{ width: '620px' || 'auto', margin: '23px' }}>
        <div className="card-body">
          {this.props.smallTitle ? (
            <h6 className="card-title">{this.props.title}</h6>
          ) : (
            <h5 className="card-title">{this.props.title}</h5>
          )}
          <div className="card-text">
            {typeof this.props.children === 'string'
              ? this.renderTextLines(this.props.children, maxCharsPerLine)
              : this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export class InsideMiniCard extends Component<{ title: ReactNode; smallTitle?: boolean }> {
  renderTextLines(text: string, maxCharsPerLine: number): JSX.Element[] {
    const lines = [];
    for (let i = 0; i < text.length; i += maxCharsPerLine) {
      lines.push(text.slice(i, i + maxCharsPerLine));
    }
    return lines.map((line, index) => <div key={index}>{line}</div>);
  }

  render() {
    const maxCharsPerLine = 30;

    return (
      <div className="card" style={{ width: '480px' || 'auto', margin: '20px' }}>
        <div className="card-body">
          {this.props.smallTitle ? (
            <h6 className="card-title">{this.props.title}</h6>
          ) : (
            <h5 className="card-title">{this.props.title}</h5>
          )}
          <div className="card-text">
            {typeof this.props.children === 'string'
              ? this.renderTextLines(this.props.children, maxCharsPerLine)
              : this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

class Link extends Component<{ to: string }> {
  render() {
    return (
      <NavLink
        className="btn btn-outline-light"
        activeClassName="active"
        to={this.props.to}
        style={{ color: 'Black' }}
      >
        {this.props.children}
      </NavLink>
    );
  }
}

export class SideMenu extends Component<{
  header: ReactNode;
  items?: { label: string; to: string }[];
}> {
  static Link = Link;

  render() {
    return (
      <div className="card" style={{ width: '250px', margin: '20px' }}>
        <h5 className="card-header">{this.props.header}</h5>
        {this.props.items ? (
          <ul className="list-group list-group-flush">
            {this.props.items.map((item, index) => (
              <li key={index} className="list-group-item">
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        ) : (
          this.props.children
        )}
      </div>
    );
  }
}

export class QuestionCard extends Component<{ question: Question }> {
  render() {
    return (
      <Card
        title={
          <NavLink to={'/questions/' + this.props.question.question_id}>
            {this.props.question.title}
          </NavLink>
        }
      >
        <Row>
          <Column>{this.props.question.text}</Column>
          <Column width={2} right>
            <EyeIcon style={{ verticalAlign: '-2px' }} /> {this.props.question.view_count}
          </Column>
        </Row>
      </Card>
    );
  }
}

export class AnswerCard extends Component<{ answer: Answer }> {
  question: Question = {
    question_id: 0,
    title: '',
    text: '',
    view_count: 0,
    has_answer: 0,
    user_id: 0,
  };

  render() {
    return (
      <Card
        title={
          <NavLink to={'/questions/' + this.question.question_id}>{this.question.title}</NavLink>
        }
      >
        <Row>
          <Column>{this.props.answer.text}</Column>
        </Row>
        <Row>
          <Column>{this.props.children}</Column>
        </Row>
      </Card>
    );
  }

  mounted(): void {
    service
      .getQuestionByAnswerId(this.props.answer.answer_id)
      .then((question) => (this.question = question));
  }
}

export class Row extends Component {
  render() {
    return <div className="row">{this.props.children}</div>;
  }
}

export class Column extends Component<{ width?: number; right?: boolean }> {
  render() {
    return (
      <div className={'col' + (this.props.width ? '-' + this.props.width : '')}>
        <div className={'float-' + (this.props.right ? 'end' : 'start')}>{this.props.children}</div>
      </div>
    );
  }
}

class ButtonSuccess extends Component<{
  small?: boolean;
  onClick: () => void;
}> {
  render() {
    return (
      <button
        type="button"
        className="btn btn-success"
        style={
          this.props.small
            ? {
                padding: '5px 5px',
                fontSize: '16px',
                lineHeight: '0.7',
              }
            : {}
        }
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export class ButtonFavourite extends Component<
  {
    small?: boolean;
    onClick: () => void;
  },
  {
    isFavorite: boolean;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      isFavorite: false,
    };
  }

  handleButtonClick = () => {
    this.setState((prevState) => ({
      isFavorite: !prevState.isFavorite,
    }));
    this.props.onClick();
  };

  render() {
    const btnClass = this.state.isFavorite ? 'btn-danger' : 'btn-light';

    return (
      <button
        type="button"
        className={`btn ${btnClass}`}
        style={
          this.props.small
            ? {
                padding: '5px 5px',
                fontSize: '16px',
                lineHeight: '0.7',
              }
            : {}
        }
        onClick={this.handleButtonClick}
      >
        <FavouriteIcon style={{ verticalAlign: '-2px', scale: '150%', alignItems: 'center' }} />{' '}
        {this.props.children}
      </button>
    );
  }
}

export class ButtonUpvote extends Component<{
  small?: boolean;
  onClick: () => void;
}> {
  render() {
    return (
      <button
        type="button"
        className="btn btn-light"
        style={{
          padding: '3px 18px',
        }}
        onClick={this.props.onClick}
      >
        <UpvoteIcon style={{ verticalAlign: '-2px', scale: '150%', alignItems: 'center' }} />{' '}
        {this.props.children}
      </button>
    );
  }
}

export class ButtonCommentBuble extends Component<{
  small?: boolean;
  onClick: () => void;
}> {
  render() {
    return (
      <button
        type="button"
        className="btn btn-light"
        style={{ padding: '3px 17px' }}
        onClick={this.props.onClick}
      >
        <CommentBubleIcon style={{ verticalAlign: '-2px', scale: '200%', alignItems: 'center' }} />{' '}
        {this.props.children}
      </button>
    );
  }
}

export class ButtonDownVote extends Component<{
  small?: boolean;
  onClick: () => void;
}> {
  render() {
    return (
      <button
        type="button"
        className="btn btn-light"
        style={{ padding: '3px 18px' }}
        onClick={this.props.onClick}
      >
        <DownvoteIcon style={{ verticalAlign: '-2px', scale: '150%', alignItems: 'center' }} />{' '}
        {this.props.children}
      </button>
    );
  }
}

class ButtonDanger extends Component<{
  small?: boolean;
  onClick: () => void;
}> {
  render() {
    return (
      <button
        type="button"
        className="btn btn-danger"
        style={
          this.props.small
            ? {
                padding: '5px 5px',
                fontSize: '16px',
                lineHeight: '0.7',
              }
            : {}
        }
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

class ButtonLight extends Component<{
  small?: boolean;
  onClick: () => void;
}> {
  render() {
    return (
      <button
        type="button"
        className="btn btn-light"
        style={
          this.props.small
            ? {
                padding: '5px 5px',
                fontSize: '16px',
                lineHeight: '0.7',
              }
            : {}
        }
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export class Button {
  static Success = ButtonSuccess;
  static Danger = ButtonDanger;
  static Light = ButtonLight;
}

class NavBarLink extends Component<{ to: string }> {
  render() {
    return (
      <NavLink
        className="btn btn-outline-light my-2 my-sm-0"
        activeClassName="active"
        to={this.props.to}
        style={{ marginRight: '10px' }}
      >
        {this.props.children}
      </NavLink>
    );
  }
}

export class Search extends Component {
  render() {
    return (
      <form className="form-inline d-flex align-items-center" style={{ width: '600px' }}>
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search..."
          aria-label="Search"
          style={{ marginRight: '5px' }}
        />
      </form>
    );
  }
}

export class NavBar extends Component<{ brand: ReactNode }> {
  static Link = NavBarLink;

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" activeClassName="active" exact to="/">
            {this.props.brand}
          </NavLink>
          <div className="navbar-nav">{this.props.children}</div>
        </div>
      </nav>
    );
  }
}

export class FormLabel extends Component {
  render() {
    return <label className="col-form-label">{this.props.children}</label>;
  }
}
export class FormInput extends Component<{
  type: string;
  value: string | number;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  [prop: string]: any;
}> {
  render() {
    const { type, value, placeholder, onChange, ...rest } = this.props;
    return (
      <input
        {...rest}
        className="form-control"
        type={this.props.type}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
      />
    );
  }
}

export class FormTextarea extends React.Component<{
  value: string | number;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  [prop: string]: any;
}> {
  render() {
    const { value, onChange, ...rest } = this.props;
    return <textarea {...rest} className="form-control" value={value} onChange={onChange} />;
  }
}

export class FormCheckbox extends Component<{
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  [prop: string]: any;
}> {
  render() {
    const { checked, onChange, ...rest } = this.props;
    return (
      <input
        {...rest}
        className="form-check-input"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    );
  }
}

export class FormSelect extends Component<{
  value: string | number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  [prop: string]: any;
}> {
  render() {
    const { value, onChange, children, ...rest } = this.props;
    return (
      <select
        {...rest}
        className="form-select"
        aria-label="Default select example"
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    );
  }
}

export class Form {
  static Label = FormLabel;
  static Input = FormInput;
  static Textarea = FormTextarea;
  static Checkbox = FormCheckbox;
  static Select = FormSelect;
}

export class Alert extends Component {
  alerts: { id: number; text: ReactNode; type: string }[] = [];
  nextId: number = 0;

  render() {
    return (
      <div>
        {this.alerts.map((alert, i) => (
          <div
            key={alert.id}
            className={'alert alert-dismissible alert-' + alert.type}
            role="alert"
          >
            {alert.text}
            <button
              type="button"
              className="btn-close btn-sm"
              onClick={() => this.alerts.splice(i, 1)}
            />
          </div>
        ))}
      </div>
    );
  }

  static success(text: ReactNode) {
    setTimeout(() => {
      let instance = Alert.instance();
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'success' });
    });
  }

  static info(text: ReactNode) {
    setTimeout(() => {
      let instance = Alert.instance();
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'info' });
    });
  }

  static warning(text: ReactNode) {
    setTimeout(() => {
      let instance = Alert.instance();
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'warning' });
    });
  }

  static danger(text: ReactNode) {
    setTimeout(() => {
      let instance = Alert.instance();
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'danger' });
    });
  }
}
