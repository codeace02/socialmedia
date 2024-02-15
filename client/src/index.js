import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';

import { reducers } from './reducers';
import App from './App';
import './index.css';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <App
            tab='home'
        />
    </Provider>,
);

