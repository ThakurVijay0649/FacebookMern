import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { Provider as AlertProvider, positions, transitions } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import store from './Store';

const options = {
  position: positions.MIDDLE,
  timeout: 5000,
  transition: transitions.SCALE
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
  ,
  document.getElementById('root')
);
