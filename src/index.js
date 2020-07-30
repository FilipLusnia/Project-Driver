import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import Firebase, { FirebaseContext } from './components/Firebase/FirebaseIndex';
import {SessionHandler} from './components/Firebase/ProvideAuth'

import './scss/main.scss';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <SessionHandler>
      <App />
    </SessionHandler>
  </FirebaseContext.Provider>
 , document.getElementById('root')
);

serviceWorker.unregister();
