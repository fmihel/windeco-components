/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
import React, { lazy, Suspense } from 'react';
import redux from 'REDUX';
// import { imports } from 'fmihel-lazy-load';
import $ from 'jquery';
import Fallback from './components/Fallback/Fallback.jsx';
// import Modal, { modal } from './components/Modal';
import AsyncState from './common/AsyncState.js';
import Btn from '../source/Btn/Btn.jsx';
import Edit from '../source/Edit/Edit.jsx';
import Label from '../source/Label/Label.jsx';
import Group from '../source/Group/Group.jsx';
import ComboBox from '../source/ComboBoxEx/ComboBoxEx.jsx';
import {
    table_long2, table_long,
    combo_list1, combo_list2, combo_list3, listClasses3, fonts, listClasses4, combo_list4, combo_list5,
    icons,
} from './data.js';

const Navbar = lazy(() => import(/* webpackChunkName: "Navbar" */'./components/Navbar/Navbar.jsx'));
Group.global = {
    ...Group.global,
    style: { ...Group.global.style },
};
class App extends React.Component {
    constructor(p) {
        super(p);
        this.onTheme = this.onTheme.bind(this);
        this.onDialog = this.onDialog.bind(this);
        this.state = {
            menu: [
                {
                    id: 'theme', caption: 'theme', onClick: this.onTheme, active: true,
                },
                { id: 'dialog', caption: 'dialog', onClick: this.onDialog },
                { id: 'item-3', caption: 'first' },
            ],
            Modal: undefined,
        };
        this.asyncState = new AsyncState(this);
    }

    setStateAsync(state, param) {
        return this.asyncState.set(state, param);
    }

    onTheme() {
        redux.actions.Theme();
    }

    onDialog() {
        import('./components/Modal')
            .then(({ default: Modal, modal }) => this.setStateAsync({ Modal }, modal))
            .then((modal) => {
                modal('my-dialog').then((o) => {
                    console.log(o);
                });
            });
    }
    // componentDidMount() {
    // разовый вызов после первого рендеринга
    // }

    // componentWillUnmount() {
    // разовый после последнего рендеринга
    // }

    componentDidUpdate(prevProps, prevState, prevContext) {
        // каждый раз после рендеринга (кроме первого раза !)
        this.asyncState.response();
    }

    render() {
        // const { LazyLoadA, LazyLoadB, LazyLoadD } = this.state;
        const { theme } = this.props;
        const { menu, Modal } = this.state;
        const prs = ['simple', 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'];
        return (
            <>
                <div className={'app'}>
                    <Suspense fallback={<Fallback/>}>
                        <Navbar
                            src="./media/logo.png"
                            menu={menu}
                            addClass={theme === 'dark' ? 'navbar-dark wd-secondary' : 'navbar-dark wd-dark '}
                        />
                    </Suspense>

                    <div className="container-lg">
                        {/** Edit ------------------------------------------------------------------------  */}
                        <div className="row">
                            <div className="col">
                                <Group style={{ marginTop: 10 }} caption="input">
                                    <label>
                                        <span>label</span>
                                        <input type='text' placeholder="edit" className="form-control"/>
                                    </label>
                                    <div className="mb-3 row"></div>
                                    <label className="col-sm-2 col-form-label" htmlFor="staticEmail">Email</label>
                                    <div className="col-sm-10">
                                        <input className="form-control-plaintext outline-none" id="staticEmail" type="text" readOnly="" defaultValue="email@example.com" ></input>
                                    </div>
                                </Group>
                            </div>
                            <div className="col">
                                <Group style={{ marginTop: 10 }} caption ="Edit">
                                    <Label id="edit1">
                                        <Edit id="edit1" value="edit" />
                                    </Label>
                                    <Label id="edit2">
                                        <Edit id="edit2" value="email@example.com" readonly={true}/>
                                    </Label>
                                </Group>
                            </div>
                        </div>

                        {/** Btn ------------------------------------------------------------------------  */}
                        <div className="row">
                            <div className="col">
                                <Group style={{ marginTop: 10 }} caption="button">
                                    {prs.map((it) => (<button key={it} className={`btn btn-${it}`}>{it}</button>))}
                                </Group>
                            </div>
                            <div className="col">
                                <Group style={{ marginTop: 10 }} caption ="Btn">
                                    {prs.map((it) => (<Btn key={it} addClass={`wd-btn-${it}`}>{it}</Btn>))}
                                </Group>
                            </div>
                        </div>

                        {/** combo ------------------------------------------------------------------------  */}
                        <div className="row">
                            <div className="col">
                                <Group style={{ marginTop: 10 }} caption="select">
                                    <select className="form-select" aria-label="Default select example" defaultValue={'1'}>
                                        <option value="0">Open this select menu</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </Group>
                            </div>
                            <div className="col">
                                <Group style={{ marginTop: 10 }} caption ="ComboBoxEx">
                                    <ComboBox
                                        id='cb1'
                                        // onChange={this.onChangeCombo}
                                        list = {combo_list1}
                                        select={1}
                                        required={true}
                                    />
                                </Group>
                            </div>
                        </div>

                        {/** ------------------------------------------------------------------------  */}
                    </div>
                </div>
                {(Modal)
                && <Modal
                    id='my-dialog'
                    caption = 'message'
                    buttons={ {
                        cancel: { caption: 'отмена' },
                        ok: { caption: 'ok', addClass: 'btn-primary' },
                    }}
                >Hello!</Modal>
                }
            </>
        );
    }
}
App.defaultProps = {
};

const mapStateToProps = (state) => ({
    theme: state.ui.theme,
});

export default redux.connect(mapStateToProps)(App);
