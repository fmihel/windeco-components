import React from 'react';

function ComboItem({
    title = false,
    className = 'wd-combo-item',
    onClick = undefined,
    data = {},
    disabled = false,
    onGetItemClass = undefined,
    children,
}) {
    const click = () => {
        if (!disabled && onClick) {
            onClick(data);
        }
    };
    return (
        <div
            className={`${className} ${onGetItemClass ? onGetItemClass(data) : ''}`}
            onClick={click}
            title={title || ''}
            {...(disabled ? { disabled: true } : {})}
        >
            {children}
        </div>
    );
}

export default ComboItem;
