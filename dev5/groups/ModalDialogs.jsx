import React, { useState } from 'react';
import Group from '../../jsx/Group.jsx';
import Block from './Block.jsx';
import Btn from '../../jsx/Btn.jsx';
import ModalDialog from '../../jsx/ModalDialog.jsx';
import TableFixed from '../../jsx/TableFixed.jsx';

const table = {
    fields: [
        { name: 'ID', caption: 'ID_SONG' },
        { name: 'NAME', caption: 'name webfjhwb jhwbhwebjr bj jhwfwjerfjh', title: 'long place' },
        { name: 'AGE', caption: 'age' },
        { name: 'NOTES', caption: 'NOTES', width: 50 },
        { name: 'DATA', caption: 'data', width: 50 },
        { name: 'UUID', caption: 'uuid', style: { textAlign: 'center' } },

    ],
    data: [
        {
            ID: 0,
            NAME: 'mike no sommatik boran',
            AGE: 10,
            DATA2: '01/02/03',
            UUID2: '8903-2342-3423',
        },
        { ID: 1, NAME: 'some', AGE: 3494 },
        { ID: 2, NAME: 'kurt', AGE: 23 },

        { ID: 3, NAME: 'doni j', AGE: 74 },
        { ID: 4, NAME: 'tori', AGE: 17 },
        { ID: 5, NAME: 'fri', AGE: 42 },
        { ID: 6, NAME: 'doni', AGE: 74 },
        { ID: 7, NAME: 'tori', AGE: 17 },
        { ID: 8, NAME: 'fri', AGE: 42 },
        { ID: 9, NAME: 'doni', AGE: 74 },
        { ID: 10, NAME: 'tori', AGE: 17 },
        { ID: 11, NAME: 'fri', AGE: 42 },
        { ID: 12, NAME: 'some', AGE: 34 },
        { ID: 13, NAME: 'kurt', AGE: 23 },
        { ID: 14, NAME: 'doni', AGE: 74 },
        { ID: 15, NAME: 'tori', AGE: 17 },
        { ID: 16, NAME: 'fri', AGE: 42 },
        { ID: 17, NAME: 'doni', AGE: 74 },
        { ID: 18, NAME: 'doni', AGE: 74 },
        { ID: 19, NAME: 'tori', AGE: 17 },
        { ID: 20, NAME: 'fri', AGE: 42 },
        { ID: 21, NAME: 'mara', AGE: 74 },
        { ID: 22, NAME: 'poke', AGE: 42 },
        { ID: 23, NAME: 'bone', AGE: 34 },
        { ID: 24, NAME: 'stomer', AGE: 74 },
        { ID: 25, NAME: 'bagi s tout', AGE: 17 },
        { ID: 26, NAME: 'blame', AGE: 42 },
        { ID: 27, NAME: 'bibi', AGE: 74 },
        { ID: 28, NAME: 'yoko', AGE: 74 },
        { ID: 29, NAME: 'suk', AGE: 17 },
        { ID: 30, NAME: 'bemoret', AGE: 42 },
        { ID: 31, NAME: 'fromer', AGE: 74 },
    ],
};
const CustomHead = () => <div>custom</div>;
export default ({}) => {
    const [pos, setPos] = useState({ left: 100, top: 50 });
    const [show, setShow] = useState('');
    const doClose = (o) => {
        setShow('');
    };

    const doOpen = (o) => {
        const name = o.target.id;
        setShow(name);
    };

    const defalt = {
        header: false,
        msg: '',
        onClickHeaderClose: doClose,
        onClickShadow: doClose,
        onClickFooterBtn: doClose,
    };
    const [dialogs, setDialogs] = useState({
        common: {
            ...defalt,
            header: 'text in header',
            msg: 'common simple dialog',
            mobile: { top: 30 },
        },

        table: {
            ...defalt,
            header: 'table',
            msg: '|--|',
            resizable: true,
            mobile: 'large',
        },

        'with btns': {
            ...defalt,
            header: <CustomHead/>,
            msg: 'common simple dialog',
            footer: ['ok', 'cancel'],
            mobile: { bottom: 40 },
        },

        stickTo: {
            ...defalt,
            header: 'text in header',
            msg: 'common simple dialog',
            footer: ['ok', 'cancel'],
            align: 'stickTo',
            stickTo: '#stickTo',
            height: 150,
            width: 300,
            draggable: false,
            mobile: { center: 30, width: 80 },
        },

        stickAndDrag: {
            ...defalt,
            header: 'text in header',
            msg: 'common simple dialog',
            footer: ['ok', 'cancel'],
            align: 'stickTo',
            stickTo: '#stickAndDrag',
            height: 150,
            width: 300,
            draggable: 'header', // by default true
            resizable: true,
            onShow() {
                console.log('show dialog');
            },
        },
        stickToHoriz: {
            ...defalt,
            header: 'stickTo-horiz',
            msg: 'stickTo-horiz',
            footer: ['ok', 'cancel'],
            align: 'stickTo',
            stickTo: '#stickToHoriz',
            stickAlign: 'left',
            stickOffY: -20,
            stickOffX: 10,
            height: 150,
            width: 300,
            draggable: true, // by default true
            resizable: true,

        },
        extend: {
            ...defalt,
            header: 'text in header',
            msg: 'common simple dialog',
            footer: {
                add(o) {
                    doOpen();
                },
                ok: {
                    onClick(o) {
                        console.log(o);
                    },
                    className: 'wd-primary',
                },
                cancel: {
                    id: 'cancel-btn',
                    caption: 'отмена',
                    className: 'wd-transparent',
                },
            },
            align: 'stickTo',
            stickTo: '#extend',
            height: 400,
            width: 400,
            resizable: true,
            draggable: true,
        },
        custom: {
            ...defalt,
            align: 'custom',
            msg: 'custom',
            left: 100,
            top: 100,
            width: 200,
            height: 200,
            resizable: false,
            draggable: false,
        },
        center: {
            ...defalt,
            align: 'center',
            msg: 'align center',
            resizable: false,
            draggable: false,
        },
    });
    return (
        <>
            <Group caption="Dialog">
                <Block>
                    {Object.keys(dialogs).map((key) => <Btn
                        id={`${key}`}
                        key={key}
                        onClick={doOpen}
                        value={key}/>)}
                </Block>
            </Group>
            { Object.keys(dialogs).map((name) => <ModalDialog
                key={name}
                id={`dialog-${name}`}
                {...dialogs[name]}
                {...(name === 'custom' ? { ...pos } : {})}
                visible={(name === show)}
            >
                {name === 'table'
                        && <div className="test-place-table">
                            <div className="test-box1">box1</div>
                            <div className="test-box2">
                                <TableFixed id={'tab3'} {...table} />
                            </div>
                        </div>

                }
                {name !== 'table' && dialogs[name].msg}
                {name === 'extend' && <Btn id="ex-btn" onClick={doOpen}>open</Btn>}
                {name === 'custom' && <Btn id="ex-btn-2" onClick={() => { setPos({ left: 200, top: 100 }); }}>move</Btn>}
            </ModalDialog>)}
        </>
    );
};
