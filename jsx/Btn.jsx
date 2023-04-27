/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

export default function Btn({
    id = undefined,
    value,
    onClick = undefined,
    className = Btn.global.className,
    style = { ...Btn.global.style },
    hint = false,
    title = false,
    children,
}) {
    return (
        <input
            type="button"
            {...(id ? { id } : {})}
            {...(className ? { className: `${className}` } : {})}
            value={value || children || ''}
            onClick={onClick}
            {...(title || hint ? { title: title || hint } : {})}
            style={{ ...Btn.global.style, ...style }}

        />
    );
}

Btn.global = {
    className: '',
    style: {},
};
