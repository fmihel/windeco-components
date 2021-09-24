/* eslint-disable import/no-extraneous-dependencies */
import { Redux } from 'fmihel-redux-wrapper';
import { connect } from 'react-redux';
import MyStoring from './storing';
import data from './data';

class MyRedux extends Redux {
    connect(...arg) {
        return connect(...arg);
    }
}

const redux = new MyRedux(data, MyStoring);

export default redux;
