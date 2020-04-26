import Schedule from './Schedule';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../redux/store';

const store = configureStore();

let windowSpy;

describe('Schedule', () => {
  const RealDate = Date.now;

  beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2019-04-07T10:20:30Z'));
  });

  afterAll(() => {
    global.Date.now = RealDate;
  });
  it('should render properly', () => {
    const today = jest.fn(() => new Date('2019-04-07T10:20:30Z'));
    const about = render(
      <Provider store={store}>
        <Schedule />
      </Provider>
    );
    expect(about).toMatchSnapshot();
  });
});
