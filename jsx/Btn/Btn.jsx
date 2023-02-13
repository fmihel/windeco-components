/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

export default function Btn({
    id = undefined,
    value,
    onClick = undefined,
    className = Btn.global.className,
    addClass = Btn.global.addClass,
    style = { ...Btn.global.style },
    hint = false,
    title = false,
    children,
}) {
    return (
        <input
            type="button"
            id={id}
            value={value || children}
            onClick={onClick}
            className={ `${className} ${addClass}`}
            title={title || hint || ''}
            style={{ ...Btn.global.style, ...style }}
        />
    );
}

Btn.global = {
    className: 'wd-btn',
    addClass: '',
    style: {},
};
