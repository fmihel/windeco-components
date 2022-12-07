/* eslint-disable import/no-extraneous-dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BtnIcon from '../source/BtnIcon/BtnIcon.jsx';
import Icon from '../source/Icon/Icon.jsx';

BtnIcon.global = {
    ...BtnIcon.global,
    IconComponent: FontAwesomeIcon,
    style: {
        ...BtnIcon.global.style,
        // borderRadius: '0px',
        // marginLeft: '2px',
    },
};
export const iEdit = 'edit';
export const iEdit16 = 'edit16';

Icon.global = {
    ...Icon.global,
    icons: {
        ...Icon.global.icons,
        [iEdit]: { path: './media/edit.png', addClass: 'wd-icon' },
        [iEdit16]: { path: './media/edit16.png' },

    },
};
