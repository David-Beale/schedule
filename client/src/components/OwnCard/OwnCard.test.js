import OwnCard from './OwnCard';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('OwnCard', () => {
  const RealDate = Date.now;

  beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2019-04-07T10:20:30Z'));
  });

  afterAll(() => {
    global.Date.now = RealDate;
  });
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<OwnCard info={{ image: '' }} />, div);
  });
  it('should render properly', () => {
    const component = render(<OwnCard info={{ image: '' }} />);
    expect(component).toMatchSnapshot();
  });
});
