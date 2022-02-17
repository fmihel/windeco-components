/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import {
    binds, storage,
} from 'fmihel-browser-lib';
import { connect } from 'react-redux';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFile, faFolder, faFolderOpen, faCoffeCup, faFileCode, faAddressBook,
} from '@fortawesome/free-solid-svg-icons';
import Edit from '../source/Edit/Edit.jsx';
import Btn from '../source/Btn/Btn.jsx';
import BtnIcon from '../source/BtnIcon/BtnIcon.jsx';
import ComboBox from '../source/ComboBox/ComboBox.jsx';
import ComboBoxEx from '../source/ComboBoxEx/ComboBoxEx.jsx';
import CheckBox from '../source/CheckBox/CheckBox.jsx';
import Label from '../source/Label/Label.jsx';
import Table from '../source/Table/Table.jsx';
import TableFixed from '../source/TableFixed/TableFixed.jsx';
import ModalDialog from '../source/ModalDialog/ModalDialog.jsx';
import Modal from '../source/Modal/Modal.jsx';

import Head from './jsx/Head.jsx';
import Block from './jsx/Block.jsx';
import {
    table_long2, table_long, combo_list1, combo_list2, combo_list3, listClasses3,
} from './data.js';

ComboBoxEx.global({
    // listClasses: listClasses3,
});

class App extends React.Component {
    constructor(p) {
        super(p);
        binds(this, 'onTheme', 'onSize', 'onClickTable', 'onClickTableFixed', 'OpenDialog', 'CloseDialog', 'undefTheme');
        this.state = {
            theme: storage.get('theme-style', { default: 'dark' }),
            size: storage.get('theme-size', { default: 'normal' }),
            checked: 0,
            dialog: false,
            modalShow: false,
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
            table: {
                ...defaultDialogParam,
                header: 'table',
                msg: '|--|',
            },
            'with btns': {
                ...defaultDialogParam,
                // header: 'text in header',
                msg: 'common simple dialog',
                footer: ['ok', 'cancel'],
            },
            stickTo: {
                ...defaultDialogParam,
                header: 'text in header',
                msg: 'common simple dialog',
                footer: ['ok', 'cancel'],
                align: 'stickTo',
                stickTo: '#dialog-btn-stickTo',
                height: 150,
                width: 300,
                draggable: false,
            },
            stickAndDragg: {
                ...defaultDialogParam,
                header: 'text in header',
                msg: 'common simple dialog',
                footer: ['ok', 'cancel'],
                align: 'stickTo',
                stickTo: '#dialog-btn-stickAndDragg',
                height: 150,
                width: 300,
                draggable: true, // by default true

            },
            extend: {
                ...defaultDialogParam,
                header: 'text in header',
                msg: 'common simple dialog',
                footer: {
                    add(o) {
                        console.log('press add', o);
                    },
                    ok: {
                        onClick(o) {
                            console.log(o);
                        },
                        addClass: 'wd-primary',
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
            custom: {
                ...defaultDialogParam,
                align: 'custom',
                msg: 'custom',
                left: 100,
                top: 100,
                width: 200,
                height: 200,
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

    undefTheme(o) {
        storage.set('theme-style', o.currentTarget.id);
        storage.set('theme-size', o.currentTarget.id);
        this.setState({ theme: o.currentTarget.id, size: o.currentTarget.id });
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
                    <input id="undef-theme" type="button" value="undef-theme" onClick={this.undefTheme}/>
                </div>
                <div className='content wd-scrollbar'>
                    <Head>Abs position</Head>
                    <Block addClass="abs-pos"> <Edit
                        disable={{ dim: true }}
                        style={
                            {
                                position: 'absolute',
                                left: 540,
                                top: -75,
                                // border: '1px dashed lime',
                                width: 57,
                                height: 16,
                            }
                        }>abs position</Edit></Block>

                    <Block addClass="abs-pos"> <CheckBox style={
                        {
                            position: 'absolute',
                            left: 350,
                            top: -75,
                            // border: '1px dashed lime',
                            width: 14,
                            height: 14,
                        }
                    }/></Block>
                    <Block addClass="abs-pos"> <ComboBoxEx
                        list = {combo_list3}
                        listClasses={listClasses3}
                        disable={{ dim: true }}
                        select={3}
                        style={
                            {
                                position: 'absolute',
                                left: 380,
                                top: -75,
                                // border: '1px dashed lime',
                                height: 16,
                                width: 150,

                            }
                        }/></Block>
                    <Head>BtnIcon</Head>
                    <Block>

                        <Btn>left</Btn>
                        <BtnIcon>button presed test</BtnIcon>
                        <BtnIcon
                            hint = "icon"
                            IconComponent={FontAwesomeIcon}
                            icon={faAddressBook}
                            addClass="wd-danger"
                            iconClass="demo-bi-color"
                        >ok</BtnIcon>
                        <Btn>standart</Btn>
                        <BtnIcon addClass="wd-primary">cancel</BtnIcon>
                        <BtnIcon>story</BtnIcon>
                        <BtnIcon addClass="wd-green">save</BtnIcon>
                    </Block>

                    <Head>Dialog</Head>
                    <Block>
                        {dialogs.map((name, key) => <Btn id={`dialog-btn-${name}`} key={key} onClick={() => { this.OpenDialog(name); }} value={name}/>)}

                    </Block>
                    <Head>Edit</Head>
                    <Block> <Edit> text from child</Edit></Block>
                    <Block> <Edit value="text from value, and hint" hint="hint prop"/></Block>
                    <Block> <Edit value="disabled" disabled={1} /></Block>
                    <Block> <Edit placeholder="set text" disable={{ dim: true }}/></Block>
                    <Block> <Label caption="label"><Edit value="set text" disable={{ dim: true }}/></Label></Block>
                    <Block> <Label caption="readonly"><Edit value="readonly text in edit" dim={''} readonly={true}/></Label></Block>

                    <Head>ComboBox</Head>
                    <Block> <ComboBox /></Block>
                    <Block> <Label caption="combobox"><ComboBox disable={{ dim: false }}/></Label></Block>
                    <Head>ComboBoxEx</Head>
                    <Block>
                        <ComboBoxEx
                            onChange={(o) => { console.log(o); }}
                            list = {combo_list1}
                        />
                    </Block>

                    <Block>
                        <ComboBoxEx
                            onChange={(o) => { console.log(o); }}
                            list = {combo_list3}
                            listClasses={listClasses3}
                            disable={{ dim: true }}
                            select={3}
                        />
                    </Block>
                    <Block>
                        <Label caption="comboboxex">
                            <ComboBoxEx list = {combo_list2} disable={{ dim: false }}/>
                        </Label></Block>
                    <Head>Btn</Head>
                    <Block>
                        <Btn>button</Btn>
                        <Btn addClass="wd-danger" hint="wd-danger hint">wd-danger</Btn>
                        <Btn addClass="wd-primary">wd-primary</Btn>
                        <Btn addClass="wd-transparent">wd-transparent</Btn>
                        <Btn addClass="wd-primary pic-bag">pic</Btn>
                    </Block>

                    <Head>TableFixed</Head>
                    <Block addClass="table-fixed-height">
                        <TableFixed {...table_long}
                            onClick={this.onClickTableFixed}
                        />
                    </Block>

                    <Head>CheckBox</Head>
                    <Block> <CheckBox/></Block>
                    <Block> <Label caption='check'><CheckBox /></Label></Block>
                    <Block> <Label caption='on change'><Btn onClick={() => { this.setState({ checked: 0 }); }} >on change false</Btn></Label></Block>
                    <Block> <Label caption='on change'><CheckBox checked={this.state.checked} asRadio={1} onChange={() => { this.setState({ checked: 1 }); }}/></Label></Block>
                    <Head>Table</Head>
                    <Block> <Table onClick={this.onClickTable}/></Block>
                    <Head>Modal</Head>
                    <Block>
                        <Btn onClick={() => { this.setState({ modalShow: true }); }} >show</Btn>
                        {this.state.modalShow
                        && <Modal
                            onClickShadow={() => {
                                this.setState({ modalShow: false });
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    left: 100,
                                    top: 100,
                                    width: 200,
                                    height: 200,
                                    border: '1px solid navy',
                                    background: 'gray',
                                }}>
                                <Btn >btn on modal 1</Btn>
                                <Btn >btn on modal 2</Btn>
                            </div>
                        </Modal>
                        }
                    </Block>
                </div>
                { this.state.dialog
                    && <ModalDialog {...this.dialogs[this.state.dialog]}>
                        {this.state.dialog === 'table'
                        && <TableFixed {...table_long2}
                            onClick={this.onClickTableFixed}
                        />
                        }
                        {this.state.dialog !== 'table' && this.dialogs[this.state.dialog].msg}
                    </ModalDialog>
                }
                <div id="wd-modal" ></div>
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
