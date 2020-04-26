import About from './index';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('About', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<About />, div);
  });
  it('should render properly', () => {
    const about = render(<About />);
    expect(about).toMatchSnapshot();
  });
});
