import Countdown from './Countdown';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('Countdown', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Countdown
        info={{
          date: new Date(
            'Sun Apr 26 2020 11:55:12 GMT+0100 (British Summer Time)'
          ),
        }}
      />,
      div
    );
  });
  it('should render properly', () => {
    const component = render(
      <Countdown
        info={{
          date: new Date(
            'Sun Apr 26 2020 11:55:12 GMT+0100 (British Summer Time)'
          ),
        }}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
