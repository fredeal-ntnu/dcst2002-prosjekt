import React from 'react';
import { shallow } from 'enzyme';
import { AllQuestions } from 'src/components/all-question'; // Adjust the import path as needed
import { Column, Button, Card, MiniCard, InsideMiniCard, Link } from 'src/widgets';
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
  })
});

describe('MiniCard widget tests', () => {
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
  })
});

describe('MiniCard widget tests', () => {
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
  })
});

describe('Navlink widget tests', () => {
  test('Draws a navlink with text', () => {
    const wrapper = shallow(<Link to="/test">Test</Link>);
    console.log(wrapper.debug());
    expect(
      wrapper.containsMatchingElement(
        <a className="nav-link" href="/test">
          Test
        </a>
      )
    ).toEqual(true);
  });
});

  
