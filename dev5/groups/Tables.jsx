/* eslint-disable camelcase */
import React, { useState } from 'react';
import Group from '../../jsx/Group.jsx';
import OnResize from '../../jsx/OnResize.jsx';
import Table from '../../jsx/Table.jsx';
import Btn from '../../jsx/Btn.jsx';
import ComboBox from '../../jsx/ComboBox.jsx';

const table_long3 = {
    fields: [
        { name: 'ID', caption: 'ID_SONG' },
        {
            name: 'NAME', caption: 'name webfjhwb jhwbhwebjr bj jhwfwjerfjh', title: 'long place', '-attr-': { name: '' },
        },
        { name: 'AGE', caption: 'age' },
        { name: 'NOTES', caption: 'NOTES', width: 50 },
        { name: 'DATA', caption: 'data', width: 50 },
        { name: 'UUID', caption: 'uuid', style: { textAlign: 'center' } },

    ],
    data: [
        { ID: 140, '-sep-': 'header' },
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
        { ID: 14, '-sep-': 'header', '-attr-': { red: '' } },
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
export default ({}) => {
    const [setup, setSetup] = useState({
        header: 'Text',
        footer: '',
        select: [],
    });
    const [head, setHead] = useState(true);
    const doClick = (o) => {
        setSetup({ ...setup, select: [o.row[o.aliasId]] });
    };
    const doDblClick = (o) => {

    };
    const doChange = (o) => {
        setSetup({
            ...setup,
            header: { header: 'single', none: false, cols: true }[o.data.id],
        });
        setHead(o.data.id);
    };
    return <Group caption = "Table" className="group-table">
        <OnResize
            debug = {false}
            rules={[
                { width: 0, className: '' },
                { width: 350, className: 'c100' },
                { width: 700, className: 'c200' },
            ]}
        >
            <div className='wd-panel pd'>
                <ComboBox
                    id={'headerSelect'}
                    list={[
                        { id: 'header', caption: 'header' },
                        { id: 'none', caption: 'none' },
                        { id: 'cols', caption: 'cols' },
                    ]}
                    onChange={doChange}
                    select={head}
                />

            </div>
            <Table
                id='tab33'
                fields={table_long3.fields}
                data={table_long3.data}
                onClick={doClick}
                onDoubleClick={doDblClick}
                header={setup.header}
                footer={setup.footer}
                select={setup.select}
                style={{ width: '100%' }}
                onDraw={({ value, col }) => {
                    if (col === 'AGE') return <div style={{ display: 'flex', alignItems: 'center' }}><div style={{ flex: '1 1 auto' }}>{value}</div><Btn id="btn-del">del</Btn></div>;
                    return value;
                }}
            />
        </OnResize>
    </Group>;
};
