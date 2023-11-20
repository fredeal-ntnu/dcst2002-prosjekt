import React from 'react';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';
import { AllQuestions } from 'src/components/all-question'; // Adjust the import path as needed
import { Column, Button, ButtonFavourite, ButtonUpvote, ButtonDownVote, ButtonCommentBuble, Card, MiniCard, InsideMiniCard, SideMenu } from 'src/widgets';
import { FavouriteIcon, UpvoteIcon, DownvoteIcon, CommentBubleIcon } from 'src/icons';
import service from 'src/service'; // Adjust the import path as needed

jest.mock('src/service'); // Mock the service module



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

describe('Navlink widget tests', () => {
  test('Draws a navlink with text', () => {
    const wrapper = shallow(<Link to="/test">Test</Link>);
    expect(
      wrapper.containsMatchingElement(
        <NavLink className="btn btn-outline-light" activeClassName="active" to="/test">
        Test
      </NavLink>
      )
    ).toEqual(true);
  });
});

describe('SideMenu widget tests', () => { 
  test('Draws a side menu with text', () => {
    //@ts-ignore
    const wrapper = shallow(<SideMenu>Test</SideMenu>);
    console.log(wrapper.debug());
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
  
