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

import Head from './jsx/Head.jsx';
import Block from './jsx/Block.jsx';

class App extends React.Component {
    constructor(p) {
        super(p);
        binds(this, 'onTheme', 'onSize');
        this.state = {
            theme: storage.get('theme-style', { default: 'dark' }),
            size: storage.get('theme-size', { default: 'normal' }),
        };
    }

    onTheme(o) {
        storage.set('theme-style', o.currentTarget.id);
        this.setState({ theme: o.currentTarget.id });
    }

    onSize(o) {
        storage.set('theme-size', o.currentTarget.id);
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
                    <Block> <Edit value="disabled" disabled={1} /></Block>
                    <Block> <Edit placeholder="set text" disable={{ dim: true }}/></Block>
                    <Block> <Label caption="label"><Edit value="set text" disable={{ dim: true }}/></Label></Block>
                    <Head>Btn</Head>
                    <Block> <Btn>button</Btn></Block>
                    <Head>ComboBox</Head>
                    <Block> <ComboBox/></Block>
                    <Block> <Label caption="combobox"><ComboBox disable={{ dim: false }}/></Label></Block>
                    <Head>CheckBox</Head>
                    <Block> <CheckBox/></Block>
                    <Block> <Label caption='check'><CheckBox /></Label></Block>

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
