import screen from './screen';
import global from '../global';

export default () => screen().width <= global.wd_middle_width;
