import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';
import routes from 'routes';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>{routes}</Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
