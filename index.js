import {AppRegistry} from 'react-native';
import React from 'react';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import App from './App';
import {store} from './src/redux/Store';

const AppRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => AppRedux);
