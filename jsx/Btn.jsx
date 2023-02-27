/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

export default function Btn({
    id = undefined,
    value,
    onClick = undefined,
    className = Btn.global.className,
    addClass = '',// deprecated
    style = { ...Btn.global.style },
    hint = false,
    title = false,
    children,
}) {
    if (addClass!=='')
        console.warn(`Btn.addClass is deprecated, use className = ${addClass}`);
    return (
        <input
            type="button"
            {...(id ? {id}:{})}
            {...(className || addClass ? {className:`${className} ${addClass}`}:{})}
            value={value || children || ''}
            onClick={onClick}
            {...(title || hint ? {title:title || hint}:{})}
            style={{ ...Btn.global.style, ...style }}

        />
    );
}

Btn.global = {
    className: '',
    style: {},
};
