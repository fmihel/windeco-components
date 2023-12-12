import React, { useState } from 'react';
import Group from '../../jsx/Group.jsx';
import Block from './Block.jsx';
import Label from '../../jsx/Label.jsx';
import Text from '../../jsx/Text.jsx';
import StaticText from '../../jsx/StaticText.jsx';
import Edit from '../../jsx/Edit.jsx';

export default ({}) => {
    const [values, setValues] = useState({});

    const doChange = (o) => {
        setValues({ ...values, [o.id]: o.value });
    };
    return <Group caption="Text">
        <Block>
            <Label id='text-1'>
                <Text
                    id='text1'
                    style={{ height: 70, width: '100%' }}
                    placeholder="rows:4 cols:15 len:60"
                    title="rows:4 cols:15 len:60"
                    value={values.text1 || ''}
                    onChange={doChange}
                    rows={4}
                    cols={15}
                />
            </Label>
        </Block>
        <Block>
            <Text
                id='text2'
                style={{ height: 30 }}
                maxLength={20}
                placeholder="set text, max 20 len.."
                title="set text, max 20 len.."

                onChange={doChange}
                required={true}
                value={values.text2 || ''}
            />
        </Block>
        <Block> <Label caption="label" id="myEdit100">
            <Edit id="myEdit100" value={values.myEdit100} onChange={doChange}>text</Edit>
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
    </Group>;
};
