import redux from 'REDUX';
import './lazy-load.config';
import { loadCSS } from 'fmihel-lazy-load';
import './actions';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './style/index.scss';

loadCSS('style/index.css');

redux.on(() => {
    console.log('change state', redux.getState());
});
createRoot(document.getElementById('root')).render(<Provider store={redux.store}><App /></Provider>);
