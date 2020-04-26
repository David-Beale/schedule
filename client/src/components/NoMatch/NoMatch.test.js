import NoMatch from './NoMatch';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('No Match', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NoMatch />, div);
  });
  it('should render properly', () => {
    const component = render(<NoMatch />);
    expect(component).toMatchSnapshot();
  });
});
