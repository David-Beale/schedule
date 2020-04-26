import React from 'react';
import ReactDOM from 'react-dom';
import { StitchAuthProvider } from '../StitchAuth/StitchAuth';
import { Provider } from 'react-redux';
import configureStore from '../../redux/store';
import Landing from './Landing';
import { render } from '@testing-library/react';

const store = configureStore();

describe('Landing', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <StitchAuthProvider>
          <Landing />
        </StitchAuthProvider>
      </Provider>,
      div
    );
  });
  it('should render properly', () => {
    const component = render(
      <Provider store={store}>
        <StitchAuthProvider>
          <Landing />
        </StitchAuthProvider>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
