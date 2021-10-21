/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import {
    binds, storage,
} from 'fmihel-browser-lib';
import { connect } from 'react-redux';
import React from 'react';
import Edit from '../source/Edit/Edit.jsx';
import Btn from '../source/Btn/Btn.jsx';
import ComboBox from '../source/ComboBox/ComboBox.jsx';
import CheckBox from '../source/CheckBox/CheckBox.jsx';
import Label from '../source/Label/Label.jsx';
import Table from '../source/Table/Table.jsx';
import TableFixed from '../source/TableFixed/TableFixed.jsx';
import Modal from '../source/Modal/Modal.jsx';

import Head from './jsx/Head.jsx';
import Block from './jsx/Block.jsx';
import { table_long } from './data.js';

class App extends React.Component {
    constructor(p) {
        super(p);
        binds(this, 'onTheme', 'onSize', 'onClickTable', 'onClickTableFixed', 'OpenDialog', 'CloseDialog');
        this.state = {
            theme: storage.get('theme-style', { default: 'dark' }),
            size: storage.get('theme-size', { default: 'normal' }),
            checked: 0,
            dialog: 'extend',
        };

        // общие параметры для диалогов
        const defaultDialogParam = {
            header: false,
            msg: '',
            onClickHeaderClose: this.CloseDialog,
            onClickShadow: this.CloseDialog,
            onClickFooterBtn: this.CloseDialog,

        };
        // cgb
        this.dialogs = {
            common: {
                ...defaultDialogParam,
                header: 'text in header',
                msg: 'common simple dialog',
            },
            'with btns': {
                ...defaultDialogParam,
                // header: 'text in header',
                msg: 'common simple dialog',
                footer: ['ok', 'cancel'],
            },
            'stick-to': {
                ...defaultDialogParam,
                header: 'text in header',
                msg: 'common simple dialog',
                footer: ['ok', 'cancel'],
                align: 'stickTo',
                stickTo: '#dialog-btn-stick-to',
                height: 150,
                width: 300,
            },
            extend: {
                ...defaultDialogParam,
                header: 'text in header',
                msg: 'common simple dialog',
                footer: {
                    ok: {
                        id: 'ok-btn',
                        addClass: 'wd-primary',
                        caption: 'ввести',

                    },
                    cancel: {
                        id: 'cancel-btn',
                        caption: 'отмена',
                        addClass: 'wd-transparent',
                    },
                },
                align: 'stickTo',
                stickTo: '#dialog-btn-extend',
                height: 150,
                width: 300,
            },
        };
    }

    OpenDialog(name) {
        this.setState({ dialog: name });
    }

    CloseDialog() {
        this.setState({ dialog: false });
    }

    onTheme(o) {
        storage.set('theme-style', o.currentTarget.id);
        this.setState({ theme: o.currentTarget.id });
    }

    onSize(o) {
        storage.set('theme-size', o.currentTarget.id);
        this.setState({ size: o.currentTarget.id });
    }

    onClickTable(o) {
        console.log(o);
        o.sender.select(o.row);
    }

    onClickTableFixed(o) {
        console.log(o.row);
        o.sender.select(o.row);
    }

    render() {
        const dialogs = Object.keys(this.dialogs);
        return (
            <div className={`${this.state.theme} ${this.state.size}`}>
                <div className="panel">
                    <span>{`${this.state.theme} / ${this.state.size}`} </span>
                    <input id="light" type="button" value="light" onClick={this.onTheme}/>
                    <input id="dark" type="button" value="dark" onClick={this.onTheme}/>
                    <input id="small" type="button" value="small" onClick={this.onSize}/>
                    <input id="normal" type="button" value="normal" onClick={this.onSize}/>
                </div>
                <div className='content wd-scrollbar'>
                    <Head>Edit</Head>
                    <Block> <Edit> text from child</Edit></Block>
                    <Block> <Edit value="text from value"/></Block>
                    <Block> <Edit value="disabled" disabled={1} /></Block>
                    <Block> <Edit placeholder="set text" disable={{ dim: true }}/></Block>
                    <Block> <Label caption="label"><Edit value="set text" disable={{ dim: true }}/></Label></Block>
                    <Block> <Label caption="readonly"><Edit value="readonly text in edit" dim={''} readonly={true}/></Label></Block>
                    <Head>Btn</Head>
                    <Block>
                        <Btn>button</Btn>
                        <Btn addClass="wd-danger">wd-danger</Btn>
                        <Btn addClass="wd-primary">wd-primary</Btn>
                        <Btn addClass="wd-transparent">wd-transparent</Btn>
                    </Block>
                    <Head>Dialog</Head>
                    <Block>
                        {dialogs.map((name, key) => <Btn id={`dialog-btn-${name}`} key={key} onClick={() => { this.OpenDialog(name); }} value={name}/>)}

                    </Block>

                    <Head>TableFixed</Head>
                    <Block addClass="table-fixed-height">
                        <TableFixed {...table_long}
                            onClick={this.onClickTableFixed}
                        />
                    </Block>
                    <Head>ComboBox</Head>
                    <Block> <ComboBox/></Block>
                    <Block> <Label caption="combobox"><ComboBox disable={{ dim: false }}/></Label></Block>
                    <Head>CheckBox</Head>
                    <Block> <CheckBox/></Block>
                    <Block> <Label caption='check'><CheckBox /></Label></Block>
                    <Block> <Label caption='on change'><Btn onClick={() => { this.setState({ checked: 0 }); }} >on change false</Btn></Label></Block>
                    <Block> <Label caption='on change'><CheckBox checked={this.state.checked} asRadio={1} onChange={() => { this.setState({ checked: 1 }); }}/></Label></Block>
                    <Head>Table</Head>
                    <Block> <Table onClick={this.onClickTable}/></Block>
                </div>
                { this.state.dialog
                    && <Modal {...this.dialogs[this.state.dialog]}>
                        {this.dialogs[this.state.dialog].msg}
                    </Modal>
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    // table: state.table,
    // ui: state.ui,
});

App.defaultProps = {
};

export default connect(mapStateToProps)(App);
