/* eslint-disable camelcase */
import React, { useState } from 'react';
import {
    faAddressBook, faAddressCard, faAdjust, faCaretDown, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import Group from '../../jsx/Group.jsx';
import Block from './Block.jsx';
import ComboBoxEx from '../../jsx/ComboBox.jsx';
import Label from '../../jsx/Label.jsx';
import Edit from '../../jsx/Edit.jsx';
import BtnIcon from '../../jsx/BtnIcon.jsx';
import Btn from '../../jsx/Btn.jsx';
import ComboItemIcon from '../../jsx/ComboBox/ComboItemIcon.jsx';

const combo_list1 = [
    { id: 1, caption: 'text1' },
    { id: 2, caption: 'text2', _disabled_: 1 },
    { id: 3, caption: 'text3 long of text in comboboxEx set more symbols down tree qkejfkewf kqwe fkqwe fkj k wke fwkjer fkj wke fkwjerfkj kfjwkejr fkwejr ' },
    { id: 4, caption: 'text4' },

];
const combo_list2 = [
    { id: 1, caption: 'text1 wefierlf werf kwejrlw efkerj  qefqef w wfr AAA', addClass: 'wd-cbex-icon3' },
    {
        id: 2, caption: 'text2', _disabled_: 1, addClass: 'wd-cbex-icon2',
    },
    { id: 3, caption: 'text3', addClass: 'wd-cbex-icon1' },
    { id: 5, caption: 'text5', addClass: 'wd-cbex-iconno' },
    { id: 6, caption: 'text6', addClass: 'wd-cbex-iconno' },

];

const combo_list3 = [
    { id: 1, caption: 'text1', _indexClass_: '2' },
    { id: 2, caption: 'text2', _disabled_: 1 },
    { id: 3, caption: 'text3', _indexClass_: 3 },
    { id: 4, caption: 'text4', _indexClass_: 'none' },
    { id: 5, caption: 'text5' },
    { id: 6, caption: 'text6' },

];

const listClasses4 = {
    default: 'wd-cb32',
    line: 'wd-cb32 wd-cb32-line',
    double90: 'wd-cb32 wd-cb32-90-double',
    none: 'wd-cb32',
};

const icons = ['icon-dots', 'icon-bell', 'icon-file', 'icon-image', 'icon-man', 'icon-pen'];

const combo_list4 = [
    { id: 1, caption: 'text1', _indexClass_: 'line' },
    { id: 2, caption: 'text2', _disabled_: 1 },
    { id: 3, caption: 'text3', _indexClass_: 'double90' },
    { id: 4, caption: 'text4', _indexClass_: 'none' },
    { id: 5, caption: 'text5', _indexClass_: 'line' },
    { id: 6, caption: 'text6', _indexClass_: 'line' },

];
const combo_list5 = [
    {
        id: 4, caption: 'line', _src_: 'e-line.png',
    },
];

export default ({}) => {
    const [selects, setSelects] = useState({});

    const doChange = (o) => {
        console.log(o);
    };
    const getItemClass = (data) => {
        if (data) {
            if ('id' in data && icons[data.id]) {
                return icons[data.id];
            }
            return icons[0];
        }
        return '';
    };
    return (
        <Group caption="ComboBox">
            <Block>
                <Label id='cb1'>
                    <ComboBoxEx
                        id='cb1'
                        onChange={doChange}
                        list = {combo_list1}
                        select={selects.cb1}
                        required={true}
                    />
                </Label>
            </Block>
            <Block>
                <div className="block-horiz">
                    <ComboBoxEx
                        id='cb2'
                        onChange={doChange}
                        list = {combo_list3}
                        select={selects.cb2}
                        style={{ width: 100 }}
                        className={'wd-clamp'}
                    />
                    <Edit id="ttt" style={{ width: 100 }} onKeyPress={(o) => {
                        console.log(o);
                    }}> text from child</Edit>
                    <BtnIcon
                        hint = "icon"
                        icon={faAddressBook}
                        className="wd-danger"
                        iconClass="demo-bi-color"
                    >send</BtnIcon>
                    <Btn> left</Btn>
                </div>
            </Block>
            <Block>
                <div className="block-horiz">
                    <ComboBoxEx
                        onChange={(o) => { console.log(o); }}
                        list = {combo_list1}
                        select={3}
                        style={{
                            width: 100,
                            height: 43,
                        }}
                        styleOuter={{ lineHeight: '43px' }}
                        className={'wd-clamp'}
                        hideBtnOnSelect = {true}
                    />
                    <Edit id="tttt" style={{ width: 100, height: 43 }} onKeyPress={(o) => {
                        console.log(o);
                    }}>text from child</Edit>
                    <Edit id="tt90" style={{ width: 90, height: 43 }} onKeyPress={(o) => {
                        console.log(o);
                    }}>90</Edit>
                    <Edit id="tt20"
                        style={{ width: 20, height: 43 }} className={'wd-clamp'}
                        type='number' min={0} max={10} step={1} onKeyPress={(o) => {
                            console.log(o);
                        }}>20</Edit>
                    <Edit id="tt30" style={{ width: 30, height: 43 }} className={'wd-clamp'} type='number' min={0} max={10} step={1} onKeyPress={(o) => {
                        console.log(o);
                    }}>30</Edit>

                    <Edit id="tt40" style={{ width: 40, height: 43 }} type='number' min={0} max={10} step={1} onKeyPress={(o) => {
                        console.log(o);
                    }}>40</Edit>
                    <Edit id="tt50" style={{ width: 50, height: 43 }} type='number' min={0} max={10} step={1} onKeyPress={(o) => {
                        console.log(o);
                    }}>50</Edit>
                </div>
            </Block>

            <Block>
                <ComboBoxEx
                    id='cb3'
                    onChange={doChange}
                    list = {combo_list3}
                    select={selects.cb3}
                    ItemComponent={ComboItemIcon}
                    onGetItemClass={getItemClass}
                    style={{
                        height: '24px',
                    }}
                    styleOuter={{
                        height: '24px',
                        lineHeight: '22px',
                    }}
                />
            </Block>
            <Block>
                <Label caption="comboboxex" style={{ color: 'red' }}>
                    <ComboBoxEx
                        list = {combo_list2}
                        ItemComponent={ComboItemIcon}
                        onGetItemClass={getItemClass}
                    />
                </Label>
            </Block>
            <Block>
                <Label caption="disabled">
                    <ComboBoxEx list = {combo_list2} select={1} disabled={true}/>
                </Label>
            </Block>
            <Block>
                <Label caption="outer url">
                    <ComboBoxEx
                        listClasses={listClasses4}
                        list = {combo_list4}
                        select={1}
                    />
                </Label>
            </Block>
            <Block>
                <Label caption="outer _src_">
                    <ComboBoxEx
                        list = {combo_list5}
                        srcPath={'./media/combo_32/'}
                        addClassItem={'wd-cb32-src'}
                        select={-1}
                    />
                </Label>
            </Block>
        </Group>
    );
};
