import LogoutScreen from './LogoutScreen';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('Navigation', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LogoutScreen />, div);
  });
  it('should render properly', () => {
    const component = render(<LogoutScreen />);
    expect(component).toMatchSnapshot();
  });
});
