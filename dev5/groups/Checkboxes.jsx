import React, { useState } from 'react';
import Group from '../../jsx/Group.jsx';
import Block from './Block.jsx';
import CheckBox from '../../jsx/CheckBox.jsx';
import Label from '../../jsx/Label.jsx';
import Btn from '../../jsx/Btn.jsx';

export default ({}) => {
    const [values, setValues] = useState({
        ch1: true,
    });
    const doChange = (o) => {
        setValues({ ...values, [o.id]: o.checked });
    };
    const doBtn1 = () => {
        setValues({ ...values, c3: !values.c3 });
    };
    return (
        <Group caption="CheckBox">
            <Block> <CheckBox id="c1" checked={values.c1} onChange={doChange}/></Block>
            <Block> <Label id="c2" caption='check'><CheckBox id="c2" checked={values.c2} onChange={doChange}/></Label></Block>
            <Block> <Label caption='on change'><Btn onClick={doBtn1} >on change false</Btn></Label></Block>
            <Block> <Label caption='on change' id='c3'><CheckBox id='c3' checked={values.c3} onChange={doChange}/></Label></Block>
            <Block> <Label id="c4" caption='disabled'><CheckBox id="c4" onChange={doChange} checked={true} disabled={true}/></Label></Block>
        </Group>
    );
};
