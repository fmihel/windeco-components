/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import {
    binds, storage,
} from 'fmihel-browser-lib';
import { connect } from 'react-redux';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faAddressBook, faAddressCard, faAdjust, faCaretDown, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

import { iEdit, iEdit16 } from './global';
import Btn from '../jsx/Btn.jsx';
import BtnIcon from '../jsx/BtnIcon.jsx';
import ComboBoxEx from '../jsx/ComboBox.jsx';
import ComboItemIcon from '../jsx/ComboBox/ComboItemIcon.jsx';

import CheckBox from '../jsx/CheckBox.jsx';
import TableFixed from '../jsx/TableFixed.jsx';
import Table from '../jsx/Table.jsx';
import ModalDialog from '../jsx/ModalDialog.jsx';
import Modal from '../jsx/Modal.jsx';
import Text from '../jsx/Text.jsx';
import Icon from '../jsx/Icon.jsx';
import Label from '../jsx/Label.jsx';
import Edit from '../jsx/Edit.jsx';
import List from '../jsx/List.jsx';
import Block from './jsx/Block.jsx';
import NavBar from '../jsx/NavBar.jsx';
import Group from '../jsx/Group.jsx';
import StaticText from '../jsx/StaticText.jsx';

// import NavLogo from '../jsx/NavBar/NavLogo.jsx';
// import NavMenu, { collapseMenus } from '../jsx/NavBar/NavMenu.jsx';
import NavItem from '../jsx/NavBar/NavItem.jsx';
// import Collapse from '../jsx/Collapse.jsx';
import isMobile from '../utils/isMobile';
// import '../style/Container.scss';
import Container from '../jsx/Container.jsx';
import {
    table_long2, table_long, table_long3,
    combo_list1, combo_list2, combo_list3, listClasses3, fonts, listClasses4, combo_list4, combo_list5,
    icons,
} from './data.js';
import map from '../utils/map';
import theme from '../utils/theme';
import navbar from '../utils/navbar';
import OnResize from '../jsx/OnResize.jsx';

// Icon.icons({
// [iEdit]: './media/edit.png',
// [iEdit16]: { path: './media/edit16.png' },
// });

theme.addClass(isMobile() ? 'mobile' : '');

const CustomHead = () => (<div>
    <span>text</span><Btn>press</Btn>
</div>);
class App extends React.Component {
    constructor(p) {
        super(p);
        const t = this;
        binds(this, 'onTheme', 'onSize',
            'onClickTable', 'onClickTableFixed',
            'OpenDialog', 'CloseDialog', 'undefTheme', 'OpenDialogEx',
            'CloseDialogEx');
        this.onTableClear = this.onTableClear.bind(this);
        this.onTableFill = this.onTableFill.bind(this);
        this.onChangeEx = this.onChangeEx.bind(this);
        this.onChangeCombo = this.onChangeCombo.bind(this);
        this.setLightTheme = this.setLightTheme.bind(this);
        this.setDarkTheme = this.setDarkTheme.bind(this);
        this.navSelect = this.navSelect.bind(this);
        this.onBtnClick = this.onBtnClick.bind(this);
        // общие параметры для диалогов
        const defaultDialogParam = {
            header: false,
            msg: '',
            onClickHeaderClose: this.CloseDialog,
            onClickShadow: this.CloseDialog,
            onClickFooterBtn: this.CloseDialog,
        };
        this.dialogEx = {
            ...defaultDialogParam,
            msg: 'upper..',
            height: 200,
            width: 200,
            resizable: false,
            draggable: false,
            stickTo: '#ex-btn',
            align: 'stickTo',
            onClickHeaderClose: this.CloseDialogEx,
            onClickShadow: this.CloseDialogEx,
            onClickFooterBtn: this.CloseDialogEx,
        };
        this.dialogs = {
            common: {
                ...defaultDialogParam,
                header: 'text in header',
                msg: 'common simple dialog',
                mobile: { top: 30 },
            },

            table: {
                ...defaultDialogParam,
                header: 'table',
                msg: '|--|',
                resizable: true,
                mobile: 'large',
            },

            'with btns': {
                ...defaultDialogParam,
                // header: 'text in header',
                header: <CustomHead/>,
                msg: 'common simple dialog',
                footer: ['ok', 'cancel'],
                mobile: { bottom: 40 },
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
                mobile: { center: 30, width: 80 },
            },

            stickAndDrag: {
                ...defaultDialogParam,
                header: 'text in header',
                msg: 'common simple dialog',
                footer: ['ok', 'cancel'],
                align: 'stickTo',
                stickTo: '#dialog-btn-stickAndDrag',
                height: 150,
                width: 300,
                draggable: 'header', // by default true
                resizable: true,
                onShow() {
                    console.log('show dialog');
                },
            },
            stickToHoriz: {
                ...defaultDialogParam,
                header: 'stickTo-horiz',
                msg: 'stickTo-horiz',
                footer: ['ok', 'cancel'],
                align: 'stickTo',
                stickTo: '#dialog-btn-stickToHoriz',
                stickAlign: 'left',
                stickOffY: -20,
                stickOffX: 10,
                height: 150,
                width: 300,
                draggable: true, // by default true
                resizable: true,

            },
            extend: {
                ...defaultDialogParam,
                header: 'text in header',
                msg: 'common simple dialog',
                footer: {
                    add(o) {
                        // console.log('press add', o);
                        t.OpenDialogEx();
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
                stickTo: '#dialog-btn-extend',
                height: 400,
                width: 400,
                resizable: true,
                draggable: true,
            },
            custom: {
                ...defaultDialogParam,
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
                ...defaultDialogParam,
                align: 'center',
                msg: 'align center',
                // width: 200,
                // height: 200,
                resizable: false,
                draggable: false,
            },

        };
        this.state = {
            // theme: storage.get('theme-style', { default: 'dark' }),
            // size: storage.get('theme-size', { default: 'normal' }),
            // mobile: isMobile() ? 'mobile' : '',
            checked: 0,
            dialog: false, // 'table',
            dialogEx: false,
            modalShow: false,
            modalShow2: false,
            fields: table_long.fields,
            table: table_long.data,
            textValue: '',
            textValue2: '',
            customLeft: 100,
            customTop: 100,
            values: {

            },
            comboSelect: {

            },
            tableHeader: true,
            tableHeight: 200,
            tableFooter: 'end',
            tableSelect: [],
            tableSelectFixed: [],
            listSetup: {
                2: { expand: true, active: true },
            },
            navActive: 'item1',
            collapseExpand: false,
        };

        NavItem.global.onClick = this.navSelect;
    }

    OpenDialogEx() {
        this.setState({ dialogEx: true });
    }

    CloseDialogEx() {
        this.setState({ dialogEx: false });
    }

    OpenDialog(name) {
        this.setState({ dialog: name });
    }

    CloseDialog() {
        this.setState({ dialog: false });
    }

    setLightTheme() {
        storage.set('theme', 'light');
        theme.set('light');
    }

    setDarkTheme() {
        storage.set('theme', 'dark');
        theme.set('dark');
    }

    onTheme(o) {
        // storage.set('theme-style', o.currentTarget.id);
        // this.setState({ theme: o.currentTarget.id });
    }

    onSize(o) {
        // storage.set('theme-size', o.currentTarget.id);
        // this.setState({ size: o.currentTarget.id });
    }

    undefTheme(o) {
        storage.set('theme-style', o.currentTarget.id);
        storage.set('theme-size', o.currentTarget.id);
        this.setState({ theme: o.currentTarget.id, size: o.currentTarget.id });
    }

    onClickTable(o) {
        console.log(o);
        this.setState({ tableSelect: [o.row[o.aliasId]] });
    }

    onClickTableFixed(o) {
        console.log(o);
        this.setState({ tableSelectFixed: [o.row[o.aliasId]] });
    }

    onTableClear() {
        this.setState({ table: [] });
    }

    onTableFill() {
        this.setState({ table: table_long.data });
    }

    onChangeEx({ id, value }) {
        if (id) {
            this.setState((prev) => ({
                values: {
                    ...prev.values,
                    [id]: value,
                },
            }));
        }
    }

    onChangeCombo({ id, data }) {
        console.log('change combo', id, data);
        if (id) {
            this.setState((prev) => {
                const comboSelect = { ...prev.comboSelect };
                comboSelect[id] = data.id;
                return { ...prev, comboSelect };
            });
        }
    }

    navSelect(o) {
        console.log(o);
        this.setState({ navActive: o.id });
    }

    onBtnClick(o) {
        console.log(o);
    }

    componentDidMount() {
        // разовый вызов после первого рендеринга
        theme.set(storage.get('theme', { default: 'light' }));
    }

    render() {
        const {
            fields, table, textValue, textValue2, customLeft, customTop, values, comboSelect,
            tableHeader, tableHeight, tableFooter, tableSelect, listSetup, collapseExpand, navActive, tableSelectFixed,
        } = this.state;
        const dialogs = Object.keys(this.dialogs);
        const fontsName = Object.keys(fonts);
        const getItemClass = (data) => {
            if (data) {
                if ('id' in data && icons[data.id]) {
                    return icons[data.id];
                }
                return icons[0];
            }
            return '';
        };
        const nav = (id) => ({
            id,
            caption: id,
            ...id === navActive ? { active: true } : {},
        });

        const enabled = {
            Btn: true,
            BtnIcon: true,
            List: true,
            Dialog: true,
            Text: true,
            Table: true,
            TableFixed: true,
            Container: true,
            Collapse: false,
            ComboBox: true,
            Edit: true,
            Modal: true,
            CheckBox: true,
            Icon: true,
            Fonts: true,
            Group: true,
            Head: true,
        };
        return (
            <div>
                <div className="nav-container-large">

                    <NavBar Logo="demo" id="nav1">
                        <NavItem
                            caption="upper"
                            {...nav('upper')}
                            onClick={() => {
                                navbar('nav1').close();
                            }}
                        />
                        <div style={{ paddingTop: 5, paddingBottom: 5 }}>
                            <span>{'theme'} </span>
                            <Btn onClick={this.setLightTheme} >light</Btn>
                            <Btn onClick={this.setDarkTheme} >dark</Btn>
                        </div>

                        <NavItem caption="menu" open={true}>
                            <NavItem {...nav('item1')} />
                            <NavItem caption="menu 2">
                                <NavItem {...nav('item 2')}/>
                                <NavItem {...nav('item 3')}/>
                                <NavItem caption="menu 4">
                                    <NavItem {...nav('item 5')}/>
                                    <NavItem {...nav('item 6')}/>
                                </NavItem>
                            </NavItem>
                        </NavItem>
                        <NavItem caption="item 6"/>
                        <NavItem caption="menu 5">
                            <NavItem caption="item 7"/>
                            <NavItem caption="item 8"/>
                            <NavItem caption="item 9"/>
                            <NavItem caption="menu 6">
                                <NavItem caption="item 15"/>
                                <NavItem caption="menu 7">
                                    <NavItem caption="item 10"/>
                                    <NavItem caption="item 11"/>
                                    <NavItem caption="item 12"/>
                                    <NavItem caption="item 13">
                                        <NavItem caption="menu 8"/>
                                        <NavItem caption="item 14"/>
                                    </NavItem>
                                </NavItem>
                            </NavItem>
                        </NavItem>
                    </NavBar>

                    {/* <div className="wd-nav-left"> */}
                    {/*
                    <NavBar Logo={() => <NavLogo>logo</NavLogo>}>

                        <div>
                            <span>{'theme'} </span>
                            <Btn onClick={this.setLightTheme} >light</Btn>
                            <Btn onClick={this.setDarkTheme} >dark</Btn>
                        </div>

                        <Btn onClick={() => { collapseMenus(); }}>collapsing</Btn>
                        <Btn onClick={() => { collapse(); }}>collapse</Btn>

                        <Edit placeholder='search'/>
                        <NavItem caption="Item1"></NavItem>
                        <NavMenu caption="file" viewAs='list'>
                            <NavItem>save</NavItem>
                            <NavItem>save as</NavItem>

                        </NavMenu>
                        <NavItem addClass="wd-nav-item-stretch" />
                        <NavMenu caption="menu" viewAs='list/panel'>
                            <NavItem>item2</NavItem>
                            <NavMenu caption="sub-1" viewAs="list/popup" >
                                <NavItem>Item3</NavItem>
                                <Edit placeholder='search'/>
                                <div >Item4</div>
                                <div>Item5</div>
                            </NavMenu>
                            <NavItem>item5</NavItem>
                            <NavItem>item6</NavItem>
                            <NavItem>item7</NavItem>
                            <div >item8</div>
                            <NavItem>item9</NavItem>
                        </NavMenu>

                    </NavBar>
                    */}
                    <div className='nav-content wd-scrollbar'>
                        {/* <div className='content wd-scrollbar'> */}
                        {/*--------------------------------------------------------------------------------------------------*/}
                        {enabled.Container
                        && <Group caption="Container">
                            <Block>
                                <Container>
                                    <Btn>btn1</Btn>
                                    <Btn>btn2</Btn>
                                    <div>div3</div>
                                    <Edit>edit4</Edit>
                                    <Btn>btn5</Btn>
                                    <Btn>btn6</Btn>
                                    <Edit>edit7</Edit>

                                </Container>
                            </Block>
                        </Group>
                        }
                        {/*--------------------------------------------------------------------------------------------------*/}
                        {enabled.ComboBox
                        && <Group caption="ComboBoxEx">
                            <Block>
                                <Label id='cb1'>
                                    <ComboBoxEx
                                        id='cb1'
                                        onChange={this.onChangeCombo}
                                        list = {combo_list1}
                                        select={'cb1' in comboSelect ? comboSelect.cb1 : false}
                                        required={true}
                                    />
                                </Label>
                            </Block>
                            <Block>
                                <div className="block-horiz">
                                    <ComboBoxEx
                                        id='cb2'
                                        onChange={this.onChangeCombo}
                                        list = {combo_list3}
                                        select={'cb2' in comboSelect ? comboSelect.cb2 : false}
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
                                    onChange={this.onChangeCombo}
                                    list = {combo_list3}
                                    select={'cb3' in comboSelect ? comboSelect.cb3 : false}
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
                        }

                        {/*--------------------------------------------------------------------------------------------------*/}
                        {enabled.Edit
                        && <Group caption="Edit">
                            <Block>
                                <div className='wd-panel'>
                                    <Btn>Error</Btn>
                                </div>
                                <Edit id="tt" style={{ fontSize: '1.2em' }} onKeyPress={(o) => {
                                    console.log(o);
                                }}>text from child</Edit>
                            </Block>
                            <Block> <Edit type="password" placeholder="set password" style={{ height: 18, minHeight: 18 }}/></Block>
                            <Block> <Edit autoFocus value="text from value, and hint" title="title prop (hint deeprecated)"/></Block>

                            <Block> <Edit
                                id = 'edNeed'
                                value = {values.edNeed}
                                onChange = {this.onChangeEx}
                                hint="обязательный ввод"
                                placeholder="need text.."
                                required={true}
                                maxLength={10}
                                error={'need text<br/>hqwdg qwj'}
                            />
                            </Block>
                            <Block> <Edit value="readonly" readonly={1} error={'text for error'}/></Block>
                            <Block> <Edit value="disabled" disabled={1} visible={true}/></Block>
                            <Block> <Edit id="edph" placeholder="set text" value={values.edph} onChange={this.onChangeEx}/></Block>
                            <Block> <Label caption="label" id="myEdit100">
                                <Edit id="myEdit100" value={values.myEdit100} onChange={this.onChangeEx}/>
                            </Label></Block>
                            <Block> <Label caption="pass" id="pass"><Edit id="pass" type="password" value="set text" /></Label></Block>
                            <Block> <Label caption="readonly" id="ronl"><Edit id="ronl" value="readonly text in edit" dim={''} readonly={true}/></Label></Block>
                            <Block> <Label caption="range" id="rng" ><Edit id="rng" value={5} type='number' min={0} max={10} step={1}/></Label></Block>

                        </Group>
                        }

                        {/*--------------------------------------------------------------------------------------------------*/}
                        {enabled.Head
                        && <Group caption={<h4>Head</h4>} >
                            <Block>
                                <h1 className="mgtb">Header caption in size h1</h1>
                                <h2>Header caption in size h2</h2>
                                <h3>Header caption in size h3</h3>
                                <h4>Header caption in size h4</h4>
                                <h5>Header caption in size h5</h5>
                                <h6>Header caption in size h6</h6>
                                <div className='h1'>Div caption in size h1</div>
                            </Block>

                        </Group>
                        }

                        {/*--------------------------------------------------------------------------------------------------*/}
                        {enabled.BtnIcon
                        && <Group caption={'BtnIcon'}>
                            <Block>
                                <Btn>left</Btn>
                                <BtnIcon className="wd-primary wd-flat">button presed test</BtnIcon>
                                <BtnIcon
                                    hint = "icon"
                                    IconComponent={Icon}
                                    icon={iEdit}
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
                        }

                        {/*--------------------------------------------------------------------------------------------------*/}
                        {enabled.Btn
                        && <Group caption="Btn" >
                            <Block>
                                <Btn id="btn-test" disabled={true} onClick={this.onBtnClick}>disabled</Btn>
                                <Btn id="btn-test-2" onClick={this.onBtnClick}>button</Btn>
                                <Btn className="wd-primary">wd-primary</Btn>
                                <Btn className="wd-danger" hint="wd-danger hint">wd-danger</Btn>
                                <Btn className="wd-secondary">wd-secondary</Btn>
                                <Btn className="wd-success" hint="wd-danger hint">wd-success</Btn>
                                <Btn className="wd-warning">wd-warning</Btn>
                                <Btn className="wd-info">wd-info</Btn>
                                <Btn className="wd-light">wd-light</Btn>
                                <Btn className="wd-dark">wd-dark</Btn>
                                <br/><br/>
                                <Btn className="wd-flat">wd-flat</Btn>
                                <Btn className="wd-primary wd-flat">wd-primary</Btn>
                                <Btn className="wd-danger wd-flat" hint="wd-danger hint">wd-danger</Btn>
                                <Btn className="wd-secondary wd-flat">wd-secondary</Btn>
                                <Btn className="wd-success wd-flat" hint="wd-danger hint">wd-success</Btn>
                                <Btn className="wd-warning wd-flat no-border">wd-warning</Btn>
                                <Btn className="wd-info wd-flat">wd-info</Btn>
                                <Btn className="wd-light wd-flat">wd-light</Btn>
                                <Btn className="wd-dark wd-flat">wd-dark</Btn>
                                <br/><br/>
                            </Block>

                            <Block>
                                <div className="wd-panel" right='' style={{ }}>
                                    <Btn className="wd-primary only-text">wd-primary</Btn>
                                    <Btn className="wd-danger only-text" hint="wd-danger hint">wd-danger</Btn>
                                    <Btn className="wd-secondary-color">wd-secondary</Btn>
                                    <Btn className="wd-success-color" hint="wd-danger hint">wd-success</Btn>
                                    <Btn className="wd-warning-color">wd-warning</Btn>
                                    <Btn className="wd-info-color">wd-info</Btn>
                                    <Btn className="wd-light-color">wd-light</Btn>
                                    <Btn className="wd-dark-color">wd-dark</Btn>

                                    <Btn className="wd-transparent">wd-transparent</Btn>
                                    <Btn className="wd-primary pic-bag">pic</Btn>
                                </div>
                            </Block>
                            <Block>
                                <div className="wd-panel" filled='' style={{ border: '1px dashed red' }}>
                                    <div style={{ border: '1px dashed blue', width: 32 }}></div>
                                    <div style={{ border: '1px dashed white' }} stretch='' className="mg"></div>
                                    <div style={{ border: '1px dashed green', width: 32 }}></div>
                                </div>
                            </Block>
                        </Group>
                        }
                        {/*--------------------------------------------------------------------------------------------------*/}

                        {enabled.Table
                        && <Group caption = "Table" className="group-table">
                            <OnResize
                                debug = {false}
                                rules={[
                                    { width: 0, className: '' },
                                    { width: 350, className: 'c100' },
                                    { width: 700, className: 'c200' },
                                ]}
                            >
                                <Table
                                    id='tab33'
                                    fields={table_long3.fields}
                                    data={table_long3.data}
                                    onClick={this.onClickTable}
                                    onDoubleClick={(o) => { console.log('double', o); }}
                                    header={tableHeader}
                                    footer={tableFooter}
                                    select={tableSelect}
                                    style={{ width: '100%' }}
                                    onDraw={({ value, col }) => {
                                        if (col === 'AGE') return <div style={{ display: 'flex', alignItems: 'center' }}><div style={{ flex: '1 1 auto' }}>{value}</div><Btn id="btn-del">del</Btn></div>;
                                        return value;
                                    }}
                                />
                            </OnResize>
                        </Group>
                        }

                        {/*--------------------------------------------------------------------------------------------------*/}
                        {enabled.TableFixed
                        && <Group caption = "TableFixed">
                            <Block>
                                <Btn onClick={this.onTableClear}>clear</Btn>
                                <Btn onClick={this.onTableFill}>fill</Btn>
                                <Btn onClick={() => { this.setState({ tableHeader: false }); }}>header no</Btn>
                                <Btn onClick={() => { this.setState({ tableHeader: 'text' }); }}>header cap</Btn>
                                <Btn onClick={() => { this.setState({ tableHeader: true }); }}>header fields</Btn>
                                <Btn onClick={() => { this.setState({ tableHeight: 200 }); }}>H=200</Btn>
                                <Btn onClick={() => { this.setState({ tableHeight: 500 }); }}>H=500</Btn>
                                <Btn onClick={() => { this.setState((prev) => ({ tableFooter: (prev.tableFooter ? false : 'end') })); }}>footer</Btn>
                            </Block>

                            <Block addClass="container-for-table-fixed2" style={{ height: tableHeight }} hide={false} >
                                <TableFixed
                                    id='tab1'
                                    fields={fields}
                                    data={table}
                                    onClick={this.onClickTableFixed}
                                    header={tableHeader}
                                    footer={tableFooter}
                                    select={tableSelectFixed}
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
                            {/*
                        <Block addClass="container-for-table-fixed"style={{ height: 540 }}>
                            <TableFixed
                                id='tab2'
                                fields={table_long2.fields}
                                data={table_long2.data}
                                onClick={this.onClickTableFixed}
                            />
                        </Block>
                    */}
                        </Group>
                        }

                        {/*--------------------------------------------------------------------------------------------------*/}
                        {enabled.Text
                        && <Group caption="Text">
                            <Block>
                                <Label id='text-1'>
                                    <Text
                                        id='text-1'
                                        style={{ height: 70, width: '100%' }}
                                        placeholder="rows:4 cols:15 len:60"
                                        title="rows:4 cols:15 len:60"
                                        value={textValue2}
                                        onChange={(o) => { this.setState({ textValue2: o.value }); }}
                                        rows={4}
                                        cols={15}
                                    />
                                </Label>
                            </Block>
                            <Block>
                                <Text
                                    style={{ height: 30 }}
                                    maxLength={20}
                                    placeholder="set text, max 20 len.."
                                    title="set text, max 20 len.."

                                    onChange={(o) => { this.setState({ textValue: o.value }); }}
                                    required={true}
                                    value={textValue}
                                />
                            </Block>
                            <Block> <Label caption="label" id="myEdit100">
                                <Edit id="myEdit100" value={values.myEdit100} onChange={this.onChangeEx}>text</Edit>
                            </Label></Block>
                            <Block>
                                <Text
                                    readonly={true}
                                    title="readonly"
                                    value={'readonly'}
                                />
                            </Block>
                            <Block>
                                <StaticText className="mg" style={{ textAlign: 'center' }}>
                                    static text out
                                </StaticText>
                                <Text
                                    disabled={1}
                                    value="disabled"
                                    resize={true}
                                />
                            </Block>
                        </Group>
                        }

                        {/*--------------------------------------------------------------------------------------------------*/}

                        {enabled.Table
                        && <Group caption = "Table" className="group-table">
                            <OnResize
                                debug = {false}
                                rules={[
                                    { width: 0, className: '' },
                                    { width: 350, className: 'c100' },
                                    { width: 700, className: 'c200' },
                                ]}
                            >
                                <Table
                                    id='tab33'
                                    fields={table_long3.fields}
                                    data={table_long3.data}
                                    onClick={this.onClickTable}
                                    onDoubleClick={(o) => { console.log('double', o); }}
                                    header={tableHeader}
                                    footer={tableFooter}
                                    select={tableSelect}
                                    style={{ width: '100%' }}
                                    onDraw={({ value, col }) => {
                                        if (col === 'AGE') return <div style={{ display: 'flex', alignItems: 'center' }}><div style={{ flex: '1 1 auto' }}>{value}</div><Btn id="btn-del">del</Btn></div>;
                                        return value;
                                    }}
                                />
                            </OnResize>
                        </Group>
                        }

                        {/*--------------------------------------------------------------------------------------------------*/}
                        {enabled.Group
                        && <Group caption="group1">
                            <Block >
                                <Btn id="btn-test" >button</Btn>
                                <BtnIcon className='wd-flat'>button</BtnIcon>
                                <Btn id="btn-my-btn" className="wd-my-btn no-border">my-btn</Btn>
                                <Btn className="wd-primary wd-flat no-border">wd-primary</Btn>
                                <Btn className="wd-danger" hint="wd-danger hint">wd-danger</Btn>
                                <BtnIcon icon={faAddressCard} hint="no text" className="wd-flat no-border">icon</BtnIcon>
                                <BtnIcon icon={faAddressCard} hint="no text" className="wd-success">icon</BtnIcon>
                                <BtnIcon icon={faAdjust} hint="no text" className="wd-warning wd-flat">icon</BtnIcon>
                                <br/><br/>
                                <BtnIcon icon={faAddressCard} hint="no text" className="wd-primary-color" attr={{ disabled: true }} onClick={this.onBtnClick}>disabled</BtnIcon>
                                <BtnIcon icon={faAddressCard} hint="no text" className="wd-primary-color" onClick={this.onBtnClick}>icon</BtnIcon>
                                <BtnIcon icon={faAddressCard} hint="no text" className="wd-primary-color" onClick={this.onBtnClick}/>
                                <BtnIcon hint="no icon" className="wd-primary-color" onClick={this.onBtnClick}>text</BtnIcon>
                                <BtnIcon icon={faAddressCard} hint="no text" className="wd-success-color">icon</BtnIcon>
                                <BtnIcon icon={faAddressCard} hint="no text" className="wd-success-color" between={false}>noBetween</BtnIcon>
                                <BtnIcon icon={faAdjust} hint="no text" className="wd-warning only-text">icon</BtnIcon>
                                <BtnIcon icon={faTrashAlt} hint="no text" className="wd-danger-color">icon</BtnIcon>

                            </Block>
                        </Group>
                        }
                        {/*--------------------------------------------------------------------------------------------------*/}

                        {enabled.Dialog
                        && <Group caption="Dialog">
                            <Block>
                                {dialogs.map((name, key) => <Btn id={`dialog-btn-${name}`} key={key} onClick={() => { this.OpenDialog(name); }} value={name}/>)}
                            </Block>
                        </Group>
                        }

                        {/*--------------------------------------------------------------------------------------------------*/}
                        {enabled.List
                        && <Group caption="List">

                            <Block>
                                <List
                                    list={
                                        [
                                            { id: 1, caption: 'item-1' },
                                            {
                                                id: 2,
                                                caption: 'item-2',
                                                childs: [
                                                    { id: 21, caption: 'item-21' },
                                                    {
                                                        id: 22,
                                                        caption: 'item-22',
                                                        childs: [
                                                            { id: 221, caption: 'item-221' },
                                                            {
                                                                id: 222,
                                                                caption: 'item-222',
                                                                childs: [
                                                                    { id: 2221, caption: 'item-2221' },
                                                                    { id: 2222, caption: 'item-2222' },
                                                                    { id: 2223, caption: 'item-2223' },

                                                                ],
                                                            },
                                                            { id: 223, caption: 'item-223' },
                                                        ],
                                                    },
                                                    { id: 23, caption: 'item-23' },
                                                ],
                                            },
                                            { id: 3, caption: 'item-3' },
                                        ]}
                                    setup={listSetup}
                                    onClick={(o) => {
                                        this.setState({
                                            listSetup: {
                                                ...map(listSetup, (val) => ({ ...val, active: false })),
                                                [o.id]: { ...listSetup[o.id], active: true, expand: !(listSetup[o.id] && listSetup[o.id].expand) },
                                            },
                                        });
                                    }}
                                />
                            </Block>
                        </Group>
                        }

                        {/*--------------------------------------------------------------------------------------------------*/}
                        {enabled.NavBar
                        && <Group caption = "NavBar">
                            <Block>
                                <Btn onClick={() => {
                                    navbar('nav2').close();
                                }}>collapse</Btn>
                                <Btn onClick={() => {
                                    navbar('nav2').open();
                                }}>expand</Btn>
                            </Block>
                            <Block hide={false} >
                                <div className="nav-container">
                                    <NavBar style={{ border: '1px dashed #344050' }} id="nav2">
                                        <NavItem/>
                                        <NavItem caption="menu">
                                            <NavItem/>
                                            <NavItem/>
                                        </NavItem>
                                        <NavItem/>
                                    </NavBar>
                                </div>
                            </Block>
                        </Group>
                        }
                        {/*--------------------------------------------------------------------------------------------------*/}
                        {enabled.Collapse
                        && <Group caption="Collapse">
                            <Block>

                                <Btn style={{ marginBottom: 5 }}onClick={() => { this.setState({ collapseExpand: !collapseExpand }); }}>{collapseExpand ? 'expand=true' : 'expand=false'}</Btn>
                                <Collapse expand={collapseExpand}
                                    style={{
                                        border: '1px dashed gray',
                                        overflow: 'hidden',
                                        minHeight: 0,
                                        padding: 5,
                                    }} delay={500}
                                >
                                    <div>padding:5 дает фриз в начале и в конце</div>
                                    <div>item3</div>
                                    <div>item4</div>
                                    <div>item5</div>
                                </Collapse>
                            </Block>
                        </Group>
                        }
                        {/*--------------------------------------------------------------------------------------------------*/}
                        {/*--------------------------------------------------------------------------------------------------*/}
                        {enabled.Modal
                        && <Group caption="Modal">
                            <Block>
                                <Btn onClick={() => { this.setState({ modalShow: true }); }} >show1</Btn>
                                { <Modal
                                    id="test-modal1"
                                    visible={this.state.modalShow}
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
                                        <Btn onClick={() => { this.setState({ modalShow2: true }); }} >show2</Btn>

                                    </div>

                                </Modal>
                                }
                            </Block>
                            <Block>
                                <Btn onClick={() => { this.setState({ modalShow2: true }); }} >show2</Btn>
                                { <Modal
                                    id="test-modal2"
                                    visible={this.state.modalShow2}
                                    onClickShadow={() => {
                                        this.setState({ modalShow2: false });
                                    }}
                                >
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: 100,
                                            top: 100,
                                            width: 200,
                                            height: 200,
                                            border: '1px solid red',
                                            background: 'silver',
                                        }}>
                                        <Btn onClick={() => { this.setState({ modalShow: true }); }} >show1</Btn>

                                    </div>

                                </Modal>
                                }
                            </Block>
                        </Group>
                        }
                        {/*--------------------------------------------------------------------------------------------------*/}
                        {enabled.CheckBox
                        && <Group caption="CheckBox">
                            <Block> <CheckBox id="ch1" checked={values.ch1} onChange={this.onChangeEx}/></Block>
                            <Block> <Label id="ckb1" caption='check'><CheckBox id="ckb1" checked={values.ckb1} onChange={this.onChangeEx}/></Label></Block>
                            <Block> <Label caption='on change'><Btn onClick={() => { this.setState({ checked: 0 }); }} >on change false</Btn></Label></Block>
                            <Block> <Label caption='on change'><CheckBox checked={this.state.checked} onChange={() => { this.setState({ checked: 1 }); }}/></Label></Block>
                            <Block> <Label id="ckb-disabled" caption='disabled'><CheckBox id="ckb-disabled" checked={true} onChange={(o) => { console.log(o); }} disabled={true}/></Label></Block>
                        </Group>
                        }
                        {/*--------------------------------------------------------------------------------------------------*/}
                        {enabled.Icon
                        && <Group caption="Icon">
                            <Block>
                                <Icon icon={iEdit} className="icon-custom"/>
                                <Icon icon={iEdit16}/>
                                <Icon icon={'uncknown'} className="icon-custom"/>
                            </Block>
                        </Group>
                        }
                        {/*--------------------------------------------------------------------------------------------------*/}
                        {enabled.Fonts
                        && <Group caption="Fonts">
                            <Block>
                                {fontsName.map((name, key) => <div key={key} className="font-line"><div>{name}</div><div className={`font-${name}`}>Короткий текст для примера.</div></div>)}
                            </Block>
                        </Group>
                        }
                        {/*--------------------------------------------------------------------------------------------------*/}
                    </div>

                </div>

                {enabled.Dialog
                    && dialogs.map((name) => <ModalDialog
                        key={name}
                        id={name}
                        {...this.dialogs[name]}
                        {...(name === 'custom' ? { left: customLeft, top: customTop } : {})}
                        visible={(name === this.state.dialog)}
                    >
                        {name === 'table'
                        && <div className="test-place-table">
                            <div className="test-box1">box1</div>
                            <div className="test-box2">
                                <TableFixed id={'tab3'} {...table_long2} onClick={this.onClickTableFixed} select={tableSelectFixed}/>
                            </div>
                        </div>

                        }
                        {name !== 'table' && this.dialogs[name].msg}
                        {name === 'extend' && <Btn id="ex-btn" onClick={this.OpenDialogEx}>open</Btn>}
                        {name === 'custom' && <Btn id="ex-btn-2" onClick={() => { this.setState({ customLeft: 300, customTop: 300 }); }}>move</Btn>}
                    </ModalDialog>)
                }

                <div id="wd-modal" style={{ position: 'absolute', left: 0, top: 0 }}>
                </div>
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
