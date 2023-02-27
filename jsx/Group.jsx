/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

function Group({
    id,
    className = Group.global.className,
    addClass = '',
    style = Group.global.style,
    caption = '',
    children,

}) {
    if (addClass!=='')
        console.warn(`Group.addClass is deprecated, use className = ${addClass}`);

    return (
        <div
            type='group'
            {...(id ? { id } : {})}
            {...(className || addClass ? {className:`${className} ${addClass}`}:{})}
            style={{ ...Group.global.style, ...style }}
        >
            { (caption) && <div><span>{caption}</span></div>}
            <div>{children}</div>
        </div>
    );
}

Group.global = {
    className: '',
    style: {},
};
export default Group;
