import React from 'react';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';
import { Row, Column, Button, ButtonFavourite, ButtonUpvote, ButtonDownVote, ButtonCommentBuble,
   Card, QuestionCard, AnswerCard, MiniCard, InsideMiniCard, SideMenu, Alert, NavBar, FormTextarea, FormInput, FormLabel, FormCheckbox, FormSelect, Search } from 'src/widgets';
import { FavouriteIcon, UpvoteIcon, DownvoteIcon, CommentBubleIcon, EyeIcon } from 'src/icons';


jest.mock('src/service', () => ({
  getQuestionByAnswerId: jest.fn().mockResolvedValue({
    question_id: '1',
    title: 'Mocked Question Title',

  }),
}));

describe('Row widget test', () => {
  test('Draws a row without properties', () => {
    const wrapper = shallow(<Row>Test</Row>);
    expect(
      wrapper.containsMatchingElement(
        <div className="row">
          Test
        </div>
      )
    ).toEqual(true);
  });
});

describe('Column widget test', () => {

  test('Draws a column without properties', () => {
    const wrapper = shallow(<Column>Test</Column>);

    expect(
      wrapper.containsMatchingElement(
        <div className="col">
        <div className="float-start">
          Test
        </div>
      </div>
      )
    ).toEqual(true);
  });


  test('Draws a column with width', () => {
    const wrapper = shallow(<Column width={3}>Test</Column>);

    expect(
      wrapper.containsMatchingElement(
        <div className="col-3">
        <div className="float-start">
          Test
        </div>
      </div>
      )
    ).toEqual(true);
  });

  test('Draws a column with width and right', () => {
    const wrapper = shallow(<Column width={3} right>Test</Column>);

    expect(
      wrapper.containsMatchingElement(
        <div className="col-3">
        <div className="float-end">
          Test
        </div>
      </div>
      )
    ).toEqual(true);
  });
})



describe('Button widget tests', () => {
  test('Draws a button with danger type', () => {
      //@ts-ignore
    const wrapper = shallow(<Button.Danger>Test</Button.Danger>);

    expect(
      wrapper.containsMatchingElement(
        <button type="button" className="btn btn-danger">
          Test
        </button>
      )
    ).toEqual(true);
  });

  test('Draws a button with success type', () => {
    //@ts-ignore
    const wrapper = shallow(<Button.Success>Test</Button.Success>);

    expect(
      wrapper.containsMatchingElement(
        <button type="button" className="btn btn-success">
          Test
        </button>
      )
    ).toEqual(true);
  });

  test('Draws a button with favourite type', () => {
    //@ts-ignore
    const wrapper = shallow(<ButtonFavourite>Test</ButtonFavourite>);

    expect(
      wrapper.containsMatchingElement(
        <button type="button" className="btn btn-danger">
          <FavouriteIcon />
          Test
        </button>
      )
    ).toEqual(true);
  }
  )
test('Draws a button with upvote type', () => {
  //@ts-ignore
  const wrapper = shallow(<ButtonUpvote>Test</ButtonUpvote>);

  expect(
    wrapper.containsMatchingElement(
      <button type="button" className="btn btn-light">
        <UpvoteIcon />
        Test
      </button>
    )
  ).toEqual(true);
})

test('Draws a button with downvote type', () => {
  //@ts-ignore
  const wrapper = shallow(<ButtonDownVote>Test</ButtonDownVote>);

  expect(
    wrapper.containsMatchingElement(
      <button type="button" className="btn btn-light">
        <DownvoteIcon />
        Test
      </button>
    )
  ).toEqual(true);
})

test('Draws a button with comment buble type', () => {
  //@ts-ignore
  const wrapper = shallow(<ButtonCommentBuble>Test</ButtonCommentBuble>);

  expect(
    wrapper.containsMatchingElement(
      <button type="button" className="btn btn-light">
        <CommentBubleIcon />
        Test
      </button>
    )
  ).toEqual(true);
})

test('Draws a button with light type', () => {
  //@ts-ignore
  const wrapper = shallow(<Button.Light>Test</Button.Light>);

  expect(
    wrapper.containsMatchingElement(
      <button type="button" className="btn btn-light">
        Test
      </button>
    )
  ).toEqual(true);
})
})

describe('Card widget tests', () => {
  test('Draws a card with title and body', () => {
    const wrapper = shallow(<Card title="Test">Test</Card>);
    expect(
      wrapper.containsMatchingElement(
        <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Test
          </h5>
          <div className="card-text">
            <div>
              Test
            </div>
          </div>
        </div>
      </div>
      )
    ).toEqual(true);
  });

  test('Draws a card with title and body', () => {
    const mockQuestion = {
      question_id: '1',
      title: 'Test Title',
      text: 'Test Text',
      view_count: 100
    };
  
    // @ts-ignore
    const wrapper = shallow(<QuestionCard question={mockQuestion} />);
  
    expect(

      wrapper.containsMatchingElement(
        // @ts-ignore
        <Card>
        <Row>
          <Column>
            Test Text
          </Column>
          <Column width={2} right={true}>
            <EyeIcon/>
            100
          </Column>
        </Row>
      </Card>
      )
    ).toEqual(true);
  });

  test('Draws a card with title and body', async () => {
    const mockAnswer = {
      answer_id: '1',
      text: 'Test Text',
    };
  //@ts-ignore
    const wrapper = shallow(<AnswerCard answer={mockAnswer} />);
    console.log(wrapper.debug());
    await wrapper.update();
  
    expect(
      wrapper.containsMatchingElement(
        // @ts-ignore
        <Card>
          <Row>
            <Column>
              Test Text
            </Column>
          </Row>
        </Card>
      )
    ).toEqual(true);
  });
  

  test('Draws a card with title and body', () => {
    const wrapper = shallow(<MiniCard title="Test">Test</MiniCard>);
    expect(
      wrapper.containsMatchingElement(
        <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Test
          </h5>
          <div className="card-text">
            <div>
              Test
            </div>
          </div>
        </div>
      </div>
      )
    ).toEqual(true);
  });



  test('Draws a card with title and body', () => {
    const wrapper = shallow(<InsideMiniCard title="Test">Test</InsideMiniCard>);
    expect(
      wrapper.containsMatchingElement(
        <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Test
          </h5>
          <div className="card-text">
            <div>
              Test
            </div>
          </div>
        </div>
      </div>
      )
    ).toEqual(true);
  });
});


describe('SideMenu widget tests', () => { 
  test('Draws a side menu with text', () => {
    //@ts-ignore
    const wrapper = shallow(<SideMenu>Test</SideMenu>);
    expect(
      wrapper.containsMatchingElement(
        <div className="card">
        <h5 className="card-header" />
        Test
      </div>
      )
    ).toEqual(true);
  });
})
  
describe('Alert widget tests', () => {
  test('Draws an alert with text', () => {
    const wrapper = shallow(<Alert>Test</Alert>);
    expect(
      wrapper.containsMatchingElement(
        <div />
      )
    ).toEqual(true);
  });

  test('Renders alerts correctly', () => {
    const wrapper = shallow(<Alert />);
    //@ts-ignore
    wrapper.instance().alerts = [
      { id: 1, text: 'Success Alert', type: 'success' },
      { id: 2, text: 'Info Alert', type: 'info' },
    ];
    wrapper.update();
  
    expect(wrapper.find('.alert-success').text()).toContain('Success Alert');
    expect(wrapper.find('.alert-info').text()).toContain('Info Alert');
  });

  test('Removes an alert on close button click', () => {
    const wrapper = shallow(<Alert />);
    console.log(wrapper.debug());
    //@ts-ignore
    wrapper.instance().alerts = [{ id: 1, text: 'Test Alert', type: 'success' }];
    wrapper.update();
  
    wrapper.find('.btn-close').simulate('click');
    wrapper.update();
  
    // Check if the alert is removed
    expect(wrapper.find('.alert')).toHaveLength(0);
  });
})

jest.useFakeTimers();

describe('Alert static method tests', () => {
  // @ts-ignore
  let alertInstance;

  beforeEach(() => {
    // @ts-ignore
    Alert.instance = jest.fn(() => alertInstance);
    
    alertInstance = shallow(<Alert />).instance();
    // @ts-ignore
    alertInstance.alerts = [];
  });

  test('success method adds a success alert', () => {
    // Call the static method
    Alert.success('Success message');

    // Fast-forward time to execute the setTimeout
    jest.runAllTimers();

    // Check if the alert was added to the instance's alerts array
    // @ts-ignore
    expect(alertInstance.alerts).toEqual([
      { id: expect.any(Number), text: 'Success message', type: 'success' }
    ]);
  });

  beforeEach(() => {
    // @ts-ignore
    Alert.instance = jest.fn(() => alertInstance);
    
    alertInstance = shallow(<Alert />).instance();
    // @ts-ignore
    alertInstance.alerts = [];
  });

  test('info method adds an info alert', () => {
    Alert.info('Info message');

    jest.runAllTimers();

    // @ts-ignore
    expect(alertInstance.alerts).toEqual([
      { id: expect.any(Number), text: 'Info message', type: 'info' }
    ]);
  });

  test('warning method adds a warning alert', () => {
    Alert.warning('Warning message');

    jest.runAllTimers();

    // @ts-ignore
    expect(alertInstance.alerts).toEqual([
      { id: expect.any(Number), text: 'Warning message', type: 'warning' }
    ]);
  });

  test('danger method adds a danger alert', () => {

    Alert.danger('Danger message');

    jest.runAllTimers();

    // @ts-ignore
    expect(alertInstance.alerts).toEqual([
      { id: expect.any(Number), text: 'Danger message', type: 'danger' }
    ]);
  });


});


describe('NavBar widget tests', () => {
  test('Draws a navbar with text', () => {
    //@ts-ignore
    const wrapper = shallow(<NavBar>Test</NavBar>);
    expect(
      wrapper.containsMatchingElement(
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" activeClassName="active" exact={true} to="/" />
          <div className="navbar-nav">
            Test
          </div>
        </div>
      </nav>
      )
    ).toEqual(true);
  });
});

describe('Form widget tests', () => {
  test('Draws a form with text', () => {
    //@ts-ignore
    const wrapper = shallow(<FormTextarea>Test</FormTextarea>);
    expect(
      wrapper.containsMatchingElement(
        <textarea className="form-control">
        Test
      </textarea>
      )
    ).toEqual(true);
  });


  test('Draws a input with text', () => {
    //@ts-ignore
    const wrapper = shallow(<FormInput>Test</FormInput>);
    expect(
      wrapper.containsMatchingElement(
        <input className="form-control">
        Test
      </input>
      )
    ).toEqual(true);
  });

  test('Draws a form with text', () => {
    //@ts-ignore
    const wrapper = shallow(<FormLabel>Test</FormLabel>);
    expect(
      wrapper.containsMatchingElement(
        <label className="col-form-label">
        Test
      </label>
      )
    ).toEqual(true);
  });

  test('Draws a textbox with text', () => {
    //@ts-ignore
    const wrapper = shallow(<FormCheckbox>Test</FormCheckbox>);
    expect(
      wrapper.containsMatchingElement(
        <input className="form-check-input" type="checkbox">
        Test
      </input>
      )
    ).toEqual(true);
  });

  test('Draws a form with text', () => {
    //@ts-ignore
    const wrapper = shallow(<FormSelect>Test</FormSelect>);
    expect(
      wrapper.containsMatchingElement(
        <select className="form-select" aria-label="Default select example">
        Test
      </select>
      )
    ).toEqual(true);
  });
});

describe('Search widget tests', () => {
  test('Draws a search with text', () => {
    //@ts-ignore
    const wrapper = shallow(<Search>Test</Search>);
    expect(
      wrapper.containsMatchingElement(
        <form className="form-inline d-flex align-items-center">
        <input className="form-control mr-sm-2" type="search" placeholder="Search..." aria-label="Search"/>
      </form>
      )
    ).toEqual(true);
  });
});
