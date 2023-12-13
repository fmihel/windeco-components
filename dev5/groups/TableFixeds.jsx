/* eslint-disable no-lone-blocks */
/* eslint-disable default-case */
import React, { useState } from 'react';
import Group from '../../jsx/Group.jsx';
import Block from './Block.jsx';
import Btn from '../../jsx/Btn.jsx';
import TableFixed from '../../jsx/TableFixed.jsx';

const table = {
    fields: [
        { name: 'ID', caption: 'id', width: 50 },
        {
            name: 'NAME', caption: 'name webfjhwb jhwbhwebjr bj jhwfwjerfjh', title: 'long place more', '-attr-': { name: '', born: '' },
        },
        { name: 'AGE', caption: 'age', style: { color: 'red' } },
    ],
    data: [
        { ID: 0, NAME: 'mike no sommatik boran', AGE: 10 },
        {
            ID: 1, NAME: 'some', AGE: 3494, '-attr-': { title: 'some' },
        },
        {
            ID: 2, NAME: 'kurt', AGE: 23, '-attr-': { high: 'NAME' },
        },

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
    ],
};

export default ({}) => {
    const [setup, setSetup] = useState({
        header: true,
        height: 200,
        footer: 'end',
        select: [],
    });
    const [data, setData] = useState(table.data);

    const doSetup = (o) => {
        const modif = {};
        // console.log(o.currentTarget.id);
        switch (o.currentTarget.id) {
        case 'head-false': {
            modif.header = false;
        } break;
        case 'head-text': {
            modif.header = 'text';
        } break;
        case 'head-true': {
            modif.header = true;
        } break;
        case 'h200': {
            modif.height = 200;
        } break;
        case 'h500': {
            modif.height = 500;
        } break;
        case 'footer': {
            modif.footer = setup.footer ? false : 'end';
        } break;

        default: {}
        }
        setSetup({ ...setup, ...modif });
    };
    const doClick = (o) => {
        setSetup({ ...setup, select: [o.row[o.aliasId]] });
    };
    const doClear = (o) => {
        setData([]);
    };
    const doFill = (o) => {
        setData(table.data);
    };
    return (
        <Group caption = "TableFixed">
            <Block>
                <Btn id='clear' onClick={doClear}>clear</Btn>
                <Btn id='fill' onClick={doFill}>fill</Btn>
                <Btn id='head-false' onClick={doSetup}>header no</Btn>
                <Btn id='head-text' onClick={doSetup}>header cap</Btn>
                <Btn id='head-true' onClick={doSetup}>header fields</Btn>
                <Btn id='h200' onClick={doSetup}>H=200</Btn>
                <Btn id='h500' onClick={doSetup}>H=500</Btn>
                <Btn id='footer' onClick={doSetup}>footer</Btn>
            </Block>

            <Block addClass="container-for-table-fixed2" style={{ height: setup.height }} hide={false} >
                <TableFixed
                    id='tab1'
                    fields={table.fields}
                    data={data}
                    onClick={doClick}
                    header={setup.header}
                    footer={setup.footer}
                    select={setup.select}
                    onDraw={({ value, col }) => {
                        if (col === 'AGE') {
                            return (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ flex: '1 1 auto' }}>{value}</div><Btn id="btn-del">del</Btn></div>);
                        }
                        return value;
                    }}

                />

            </Block>

        </Group>
    );
};
