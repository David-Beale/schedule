import Login from './Login';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { StitchAuthProvider } from '../StitchAuth/StitchAuth';

describe('Navigation', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <StitchAuthProvider>
        <Login />
      </StitchAuthProvider>,
      div
    );
  });
  it('should render properly', () => {
    const component = render(
      <StitchAuthProvider>
        <Login />
      </StitchAuthProvider>
    );
    expect(component).toMatchSnapshot();
  });
});
