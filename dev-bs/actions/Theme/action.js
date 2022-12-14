import redux from 'REDUX';
import * as consts from './consts';

const doAction = (theme = '') => (dispatch) => {
    dispatch({
        type: consts.THEME,
        payload: { theme },
    });
};
const action = (theme = '') => redux.store.dispatch(doAction(theme));
export default action;
