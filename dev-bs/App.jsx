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
                        <Navbar src="./media/logo.png" menu={menu} addClass={theme === 'dark' ? 'navbar-dark bg-primary' : 'navbar-dark bg-dark text-bg-dark'}/>
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
                                </Group>
                            </div>
                            <div className="col">
                                <Group style={{ marginTop: 10 }} caption ="Edit">
                                    <Label id="edit1">
                                        <Edit id="edit1" value="edit" />
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
                                    {prs.map((it) => (<Btn key={it} addClass={`wd-${it}`}>{it}</Btn>))}
                                </Group>
                            </div>
                        </div>

                        {/** Btn ------------------------------------------------------------------------  */}
                        <div className="row">
                            <div className="col">
                                <Group style={{ marginTop: 10 }} caption="test">
                                    <div className="test"></div>
                                </Group>
                            </div>
                            <div className="col">
                                <Group style={{ marginTop: 10 }} caption ="">
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
