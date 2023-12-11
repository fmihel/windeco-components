import React from 'react';
import Group from '../../jsx/Group.jsx';
import Block from './Block.jsx';

export default ({}) => (
    <Group caption={<h4>Head</h4>} >
        <Block>
            <h1 className="mgtb">Header caption in size h1</h1>
            <div h2=''>Header caption in size h2</div>
            <div className="h3">Header caption in size h3</div>
            <h4>Header caption in size h4</h4>
            <h5>Header caption in size h5</h5>
            <h6>Header caption in size h6</h6>
            <div className='h1'>Div caption in size h1</div>
        </Block>

    </Group>
);
