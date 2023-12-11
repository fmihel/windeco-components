import React, { useState } from 'react';
import Group from '../../jsx/Group.jsx';
import Block from './Block.jsx';
import Btn from '../../jsx/Btn.jsx';
import Edit from '../../jsx/Edit.jsx';
import Label from '../../jsx/Label.jsx';

export default ({}) => {
    const [values, setValues] = useState({});
    const doChange = (o) => {
        setValues({ ...values, [o.id]: o.value });
    };
    const doKeyPress = (o) => {
        console.log(o);
    };
    return <Group caption='edits'>
        <Block>
            <Block>
                <div className='wd-panel'>
                    <Btn>Error</Btn>
                </div>
                <Edit id="tt" style={{ fontSize: '1.2em' }} onKeyPress={doKeyPress}>text from child</Edit>
            </Block>
            <Block> <Edit type="password" placeholder="set password" style={{ height: 18, minHeight: 18 }}/></Block>
            <Block> <Edit autoFocus value="text from value, and hint" title="title prop (hint deeprecated)"/></Block>

            <Block>
                <Edit
                    id = 'edNeed'
                    value = {values.edNeed}
                    onChange = {doChange}
                    hint="обязательный ввод"
                    placeholder="need text.."
                    required={true}
                    maxLength={10}
                />
            </Block>

            <Block> <Edit value="readonly" readonly={1} error={'need text<br/>hqwdg qwj'}/></Block>
            <Block> <Edit value="disabled" disabled={1} visible={true}/></Block>
            <Block> <Edit id="edph" placeholder="set text" value={values.edph} onChange={doChange}/></Block>

            <Block> <Label caption="label" id="myEdit100">
                <Edit id="myEdit100" value={values.myEdit100} onChange={doChange}/>
            </Label></Block>

            <Block> <Label caption="pass" id="pass"><Edit id="pass" type="password" value="set text" /></Label></Block>
            <Block> <Label caption="readonly" id="ronl"><Edit id="ronl" value="readonly text in edit" dim={''} readonly={true}/></Label></Block>
            <Block> <Label caption="range" id="rng" ><Edit id="rng" value={5} type='number' min={0} max={10} step={1}/></Label></Block>

        </Block>
    </Group>;
};
