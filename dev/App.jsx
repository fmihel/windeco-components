/* eslint-disable import/no-extraneous-dependencies */
import {
    binds,
} from 'fmihel-browser-lib';
import { connect } from 'react-redux';
import redux from 'REDUX';
import React from 'react';
import Edit from '../source/Edit/Edit.jsx';
import Btn from '../source/Btn/Btn.jsx';

import Head from './jsx/Head.jsx';
import Block from './jsx/Block.jsx';

class App extends React.Component {
    constructor(p) {
        super(p);
        binds(this, 'onTheme', 'onSize');
        this.state = {
            theme: 'dark',
            size: 'normal',
        };
    }

    onTheme(o) {
        this.setState({ theme: o.currentTarget.id });
    }

    onSize(o) {
        this.setState({ size: o.currentTarget.id });
    }

    render() {
        return (
            <>
                <div className="panel">
                    <span>{`${this.state.theme}/${this.state.size}`} </span>
                    <input id="light" type="button" value="light" onClick={this.onTheme}/>
                    <input id="dark" type="button" value="dark" onClick={this.onTheme}/>
                    <input id="small" type="button" value="small" onClick={this.onSize}/>
                    <input id="normal" type="button" value="normal" onClick={this.onSize}/>
                </div>
                <div className={`content ${this.state.theme} ${this.state.size}`}>
                    <Head>Edit</Head>
                    <Block> <Edit value="text"/></Block>
                    <Block> <Edit/></Block>
                    <Head>Btn</Head>
                    <Block> <Btn>button</Btn></Block>
                </div>
            </>
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
