import React from 'react';
import './Block.scss';

export default function Block({ addClass = '', children }) {
    return (
        <div className={`block ${addClass}`}>
            <div></div>
            <div>{children}</div>
            <div></div>
        </div>
    );
}
