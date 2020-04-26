import Card from './Card';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('Card', () => {
  it('should render without crashing', () => {
    const RealDate = Date.now;

    beforeAll(() => {
      global.Date.now = jest.fn(() => new Date('2020-04-26T09:46:15.302Z'));
    });

    afterAll(() => {
      global.Date.now = RealDate;
    });
    jest.mock('moment', () => () => ({
      format: () => '2020-04-26T09:46:15.302Z',
    }));
    const div = document.createElement('div');
    ReactDOM.render(
      <Card
        info={{
          image: 'https://img.src',
          artistName: 'joseph',
          date: '2020-04-26T09:46:15.302Z',
        }}
        key={0}
      />,
      div
    );
  });
  it('should render properly', () => {
    const component = render(
      <Card
        info={{
          image: 'https://img.src',
          artistName: 'joseph',
          date: '2020-04-26T09:46:15.302Z',
        }}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it('render without data', () => {
    const component = render(
      <Card
        info={{
          image: undefined,
          artistName: undefined,
          date: '2020-04-26T09:46:15.302Z',
        }}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
