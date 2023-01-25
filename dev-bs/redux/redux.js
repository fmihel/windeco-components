import { Redux } from 'fmihel-redux-wrapper';
import { connect } from 'react-redux';

class AppRedux extends Redux {
    connect(...arg) {
        return connect(...arg);
    }
}

export default AppRedux;
