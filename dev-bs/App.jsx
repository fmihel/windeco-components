/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
import React, { lazy, Suspense } from 'react';
import redux from 'REDUX';
// import { imports } from 'fmihel-lazy-load';
import Fallback from './components/Fallback/Fallback.jsx';
// import Modal, { modal } from './components/Modal';
import AsyncState from './common/AsyncState.js';

const Navbar = lazy(() => import(/* webpackChunkName: "Navbar" */'./components/Navbar/Navbar.jsx'));

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

        return (
            <>
                <div className={`app ${theme}`}>
                    <Suspense fallback={<Fallback/>}>
                        <Navbar src="./media/logo.png" menu={menu} addClass={theme === 'dark' ? 'navbar-dark bg-primary' : 'navbar-dark bg-dark text-bg-dark'}/>
                    </Suspense>
                    <div className="container-lg">
                        <div className="row">
                            <div className="col">
                                <label>
                                    <span>label</span>
                                    <input type='text' placeholder="edit" className="form-control"/>
                                </label>
                                <button className="btn  btn-secondary">press...</button>
                                <input className="btn btn-secondary"type='button' value="press..." />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">email</span>
                                    <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                                </div>
                            </div>
                        </div>

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
