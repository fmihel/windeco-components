/* eslint-disable import/no-extraneous-dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Edit from '../source/Edit/Edit.jsx';
import Btn from '../source/Btn/Btn.jsx';
import BtnIcon from '../source/BtnIcon/BtnIcon.jsx';
import ComboBox from '../source/ComboBox/ComboBox.jsx';
import ComboBoxEx from '../source/ComboBoxEx/ComboBoxEx.jsx';
import CheckBox from '../source/CheckBox/CheckBox.jsx';
import Label from '../source/Label/Label.jsx';
import Table from '../source/Table/Table.jsx';
import ModalDialog from '../source/ModalDialog/ModalDialog.jsx';
import Modal from '../source/Modal/Modal.jsx';
import Text from '../source/Text/Text.jsx';
import Icon from '../source/Icon/Icon.jsx';

ComboBoxEx.global({
    // listClasses: listClasses3,
    offText: {
        // y: 10,
    },
});
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
