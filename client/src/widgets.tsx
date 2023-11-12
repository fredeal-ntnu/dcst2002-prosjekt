import * as React from 'react';
import { ReactNode, ChangeEvent } from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

/**
 * Renders an information card using Bootstrap classes.
 *
 * Properties: title
 */
export class Card extends Component<{ title: ReactNode, smallTitle?: boolean }> {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          {this.props.smallTitle ? <h6 className="card-title">{this.props.title}</h6> : <h5 className="card-title">{this.props.title}</h5>}
          <div className="card-text">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

class Link extends Component<{ to: string }> {
  render() {
    return (
      <NavLink className="btn btn-outline-light" activeClassName="active" to={this.props.to} style={{ color: 'Black' }}>
        {this.props.children}
      </NavLink>
    );
  }
}

export class SideMenu extends Component<{ header: ReactNode, items?: {label: string, to: string}[] }> {
  static Link = Link;

  render() {
    return (
      <div className='col-md-3'>
        <div className="card" style={{ width: '18rem', marginTop: '20px' }}>
          <div className="card-header">{this.props.header}</div>
          {this.props.items ?
            <ul className="list-group list-group-flush">{this.props.items.map((item, index) => (
              <li key={index} className="list-group-item">
                <Link to={item.to}>{item.label}</Link>
              </li>))}
            </ul>
            : this.props.children
            }
        </div>
      </div>
    );
  }
}

export class MainCard extends Component<{ header: ReactNode }> {
  static Link = Link;
  render() {
    return (
      <div className='col-md-6'>
        <div className="card" style={{ width: '58rem', marginTop: '20px' }}>
          <div className="card-header">{this.props.header}</div>
            <div className="card-text" style={{ padding: '15px' }}>{this.props.children}</div>
        </div>
      </div>
    );
  }
}



/**
 * Renders a row using Bootstrap classes.
 */
export class Row extends Component {
  render() {
    return <div className="row">{this.props.children}</div>;
  }
}

/**
 * Renders a column with specified width using Bootstrap classes.
 *
 * Properties: width, right
 */
export class Column extends Component<{ width?: number; right?: boolean }> {
  render() {
    return (
      <div className={'col' + (this.props.width ? '-' + this.props.width : '')}>
        <div className={'float-' + (this.props.right ? 'end' : 'start')}>{this.props.children}</div>
      </div>
    );
  }
}

/**
 * Renders a success button using Bootstrap styles.
 *
 * Properties: small, onClick
 */
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


/**
 * Renders a danger button using Bootstrap styles.
 *
 * Properties: small, onClick
 */
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

/**
 * Renders a light button using Bootstrap styles.
 *
 * Properties: small, onClick
 */
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



/**
 * Renders a button using Bootstrap styles.
 *
 * Properties: onClick
 */
export class Button {
  static Success = ButtonSuccess;
  static Danger = ButtonDanger;
  static Light = ButtonLight;
}

/**
 * Renders a NavBar link using Bootstrap styles.
 *
 * Properties: to
 */
class NavBarLink extends Component<{ to: string }> {
  render() {
    return (
      <NavLink className="btn btn-outline-light my-2 my-sm-0" activeClassName="active" to={this.props.to} style={{ marginRight: '5px' }}>
        {this.props.children}
      </NavLink>
    );
  }
}

class Search extends Component {
  render() {
    return (
      <form className="form-inline d-flex align-items-center" style={{ width: '600px' }}>
        <input className="form-control mr-sm-2" type="search" placeholder="Search..." aria-label="Search" style={{ marginRight: '5px' }}/>
      </form>
    );
  }
}

/**
 * Renders a NavBar using Bootstrap classes.
 *
 * Properties: brand
 */
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

/**
 * Renders a form label using Bootstrap styles.
 */
class FormLabel extends Component {
  render() {
    return <label className="col-form-label">{this.props.children}</label>;
  }
}

/**
 * Renders a form input using Bootstrap styles.
 */
class FormInput extends Component<{
  type: string;
  value: string | number;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  [prop: string]: any;
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, width, height, pattern
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
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

/**
 * Renders a form textarea using Bootstrap styles.
 */
class FormTextarea extends React.Component<{
  value: string | number;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  [prop: string]: any;
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, rows, cols
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { value, onChange, ...rest } = this.props;
    return <textarea {...rest} className="form-control" value={value} onChange={onChange} />;
  }
}

/**
 * Renders a form checkbox using Bootstrap styles.
 */
class FormCheckbox extends Component<{
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  [prop: string]: any;
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, width, height, pattern
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
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

/**
 * Renders a form select using Bootstrap styles.
 */
class FormSelect extends Component<{
  value: string | number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  [prop: string]: any;
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, size.
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { value, onChange, children, ...rest } = this.props;
    return (
      <select 
        {...rest} 
        className="custom-select"
        value={value} 
        onChange={onChange}>
        {children}
      </select>
    );
  }
}

/**
 * Renders a form radio button using Bootstrap styles.
 */
class FormRadio extends Component<{
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
        type="radio"
        checked={checked}
        onChange={onChange}
      />
    );
  }
}

export class RadioRow extends Component<{
  label: string;
  checked: boolean; 
  onChange: (event: ChangeEvent<HTMLInputElement>) => void; 
  [prop: string]: any;
}> {
  render() {
    const { checked, label, onChange, ...rest } = this.props;

    return(
        <Row>  
            <Column>
                {label}
            </Column>
            <Column right>
                <Form.Radio
                    {...rest}
                    className="form-check-input"
                    type="radio"
                    checked={checked}
                    onChange={onChange}
                    label={label}
                />
            </Column>
        </Row> 
)}
    }

/**
 * Renders form components using Bootstrap styles.
 */
export class Form {
  static Label = FormLabel;
  static Input = FormInput;
  static Textarea = FormTextarea;
  static Checkbox = FormCheckbox;
  static Select = FormSelect;
  static Radio = FormRadio;
}

/**
 * Renders alert messages using Bootstrap classes.
 *
 * Students: this slightly more complex component is not part of curriculum.
 */
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

  /**
   * Show success alert.
   */
  static success(text: ReactNode) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      let instance = Alert.instance(); // Get rendered Alert component instance
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'success' });
    });
  }

  /**
   * Show info alert.
   */
  static info(text: ReactNode) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      let instance = Alert.instance(); // Get rendered Alert component instance
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'info' });
    });
  }

  /**
   * Show warning alert.
   */
  static warning(text: ReactNode) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      let instance = Alert.instance(); // Get rendered Alert component instance
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'warning' });
    });
  }

  /**
   * Show danger alert.
   */
  static danger(text: ReactNode) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      let instance = Alert.instance(); // Get rendered Alert component instance
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'danger' });
    });
  }
}
