/* eslint-disable import/no-extraneous-dependencies */
//import redux from 'REDUX';
import React from 'react';
import { createRoot } from 'react-dom/client';
//import { Provider } from 'react-redux';
import App from './App.jsx';
import './style/index.scss';


createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        {/* <Provider store={redux.store}> */}
            <App/>
        {/* </Provider> */}
    </React.StrictMode>,
);
