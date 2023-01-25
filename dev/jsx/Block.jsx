import React from 'react';
import './Block.scss';

export default function Block({
    addClass = '', style = {}, children,
}) {
    return (
        <div className={`block ${addClass}`} style={style}>
            <div></div>
            <div>
                {children}
            </div>
            <div></div>
        </div>
    );
}
