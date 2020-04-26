import EventForm from './EventForm';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../redux/store';
import { StitchAuthProvider } from '../StitchAuth/StitchAuth';
import { BrowserRouter as Router } from 'react-router-dom';

const store = configureStore();

describe('EventForm', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <StitchAuthProvider>
            <EventForm />
          </StitchAuthProvider>
        </Router>
      </Provider>,
      div
    );
  });
  it('should render properly', () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <StitchAuthProvider>
            <EventForm />
          </StitchAuthProvider>
        </Router>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
