import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';

import { StitchAuthProvider } from '../StitchAuth/StitchAuth';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import configureStore from '../../redux/store';
const store = configureStore();

describe('render app component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <StitchAuthProvider>
          <App />
        </StitchAuthProvider>
      </Provider>,
      div
    );
  });
  it('renders app', () => {
    const app = render(
      <Provider store={store}>
        <StitchAuthProvider>
          <App />
        </StitchAuthProvider>
      </Provider>
    );
    expect(app).toMatchSnapshot();
  });
});
