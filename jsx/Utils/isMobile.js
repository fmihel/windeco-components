import screen from './screen';
import global from '../global';

export default () => screen().width <= global.wd_max_mobile_width;
