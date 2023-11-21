import React from 'react';
import { shallow } from 'enzyme';
import {
  EyeIcon,
  SearchIcon,
  QuestionIcon,
  FavouriteIcon,
  UpvoteIcon,
  DownvoteIcon,
  CommentBubleIcon,
} from 'src/icons';

describe('EyeIcon', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<EyeIcon size={24} color="blue" />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('SearchIcon', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<SearchIcon size={20} color="red" />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('QuestionIcon', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<QuestionIcon size={24} color="green" />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('FavouriteIcon', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<FavouriteIcon size={24} color="yellow" />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('UpvoteIcon', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<UpvoteIcon size={24} color="green" />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('DownvoteIcon', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<DownvoteIcon size={24} color="red" />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('CommentBubleIcon', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<CommentBubleIcon size={24} color="blue" />);
    expect(wrapper).toMatchSnapshot();
  });
});
