import React from 'react';
import Group from '../../jsx/Group.jsx';
import Block from './Block.jsx';

const fonts = {
    arial: 'Arial, sans-serif',
    'arial-black': 'Arial Black, sans-serif',
    comic: 'Comic Sans MS, cursive',
    courier: 'Courier New, monospace',
    franklin: 'Franklin Gothic Medium, sans-serif',
    gothic: 'Franklin Gothic Medium, sans-serif',
    georgia: 'Georgia, serif',
    impact: 'Impact, sans-serif',
    lucida: 'Lucida Console, monospace',
    console: 'Lucida Console, monospace',
    ms: 'Microsoft Sans Serif, sans-serif',
    palatino: 'Palatino Linotype, serif',
    sylfaen: 'Sylfaen, serif',
    tahoma: 'Tahoma, sans-serif',
    times: 'Times New Roman, serif',
    trebuchet: 'Trebuchet MS, sans-serif',
    verdana: 'Verdana, sans-serif',
    roboto: 'Roboto, sans-serif',
};

export default ({}) => (
    <Group caption="Fonts">
        <Block>
            { Object.keys(fonts).map((name, key) => <div key={key} className="font-line"><div>{name}</div><div className={`font-${name}`}>Короткий текст для примера.</div></div>)}
        </Block>
    </Group>
);
