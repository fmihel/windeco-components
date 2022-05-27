import React from 'react';
import './Head.scss';

export default function Head({ caption, children }) {
    return (

        <div className="block-head">
            <div className="b-caption">{caption}</div>
            <div className="b-child">
                {children}
            </div>
        </div>
    );
}
