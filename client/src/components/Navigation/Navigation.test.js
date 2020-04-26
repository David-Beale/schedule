import Navigation from './Navigation';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { StitchAuthProvider } from '../StitchAuth/StitchAuth';
import { BrowserRouter as Router } from 'react-router-dom';
describe('Navigation', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <StitchAuthProvider>
          <Navigation />
        </StitchAuthProvider>
      </Router>,
      div
    );
  });
  it('should render properly', () => {
    const component = render(
      <Router>
        <StitchAuthProvider>
          <Navigation />
        </StitchAuthProvider>
      </Router>
    );
    expect(component).toMatchSnapshot();
  });
});
