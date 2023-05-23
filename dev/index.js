/* eslint-disable import/no-extraneous-dependencies */
// import './style/custom.scss';
import './style/main.scss';
import 'fmihel-polyfills';
// import { DOM } from 'fmihel-browser-lib';
import React from 'react';
// import ReacDOM from 'react-dom';
import { Provider } from 'react-redux';
import redux from 'REDUX';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <Provider store={redux.store}>
            <App />
        </Provider>
    </React.StrictMode>,
);
