import redux from 'REDUX';
import reducer from './reducer';
import action from './action';

redux.add(reducer, { Theme: action });
export default action;
