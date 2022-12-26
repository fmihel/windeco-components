import React from 'react';
import ComboItem from './ComboItem.jsx';

function ComboItemIcon({ children, ...props }) {
    return (
        <ComboItem {...props}>
            <div/>
            <div>{children}</div>
        </ComboItem>
    );
}

export default ComboItemIcon;
