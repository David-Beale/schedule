import EventModal from './EventModal';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('Navigation', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <EventModal info={{ title: '', image: '', description: '' }} />,
      div
    );
  });
  it('should render properly', () => {
    const component = render(
      <EventModal info={{ title: '', image: '', description: '' }} />
    );
    expect(component).toMatchSnapshot();
  });
});
