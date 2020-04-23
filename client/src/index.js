import React from 'react';
import ReactDOM from 'react-dom';
import { StitchAuthProvider } from './components/StitchAuth';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import './index.css';
import App from './App';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StitchAuthProvider>
        <App />
      </StitchAuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

