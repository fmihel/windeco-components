/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAddressBook, faAddressCard, faAdjust, faCaretDown, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import Group from '../../jsx/Group.jsx';
import Block from './Block.jsx';
import Btn from '../../jsx/Btn.jsx';
import BtnIcon from '../../jsx/BtnIcon.jsx';
import Icon from '../../jsx/Icon.jsx';

Icon.global = {
    ...Icon.global,
    icons: {
        ...Icon.global.icons,
        edit: { path: '../media/edit.png' },

    },
};

export default ({}) => (
    <Group caption={'BtnIcon'}>
        <Block>
            <Btn>left</Btn>
            <BtnIcon className="wd-primary wd-flat">button presed test</BtnIcon>
            <BtnIcon
                hint = "icon"
                IconComponent={Icon}
                icon={'edit'}
                className="wd-danger wd-flat"
                iconClass="demo-bi-color"
                onClick={() => { console.log('test click'); }}
            >ok</BtnIcon>
            <BtnIcon
                hint = "icon "
                IconComponent={FontAwesomeIcon}
                icon={faAddressBook}
                className="wd-danger"
                iconClass="demo-bi-color"
            >ok</BtnIcon>
            <Btn>standart</Btn>
            <BtnIcon className="wd-primary">cancel</BtnIcon>
            <BtnIcon>story</BtnIcon>
            <BtnIcon icon={faCaretDown} style={{ width: '100px' }} hint="no text"/>
            <BtnIcon className="wd-green">save</BtnIcon>
        </Block>
    </Group>
);
