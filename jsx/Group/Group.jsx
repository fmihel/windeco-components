/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

function Group({
    id,
    className = Group.global.className,
    addClass = Group.global.addClass,
    style = Group.global.style,
    caption = '',
    children,

}) {
    return (
        <div
            {...(id ? { id } : {})}
            className={`${className} ${addClass}`}
            style={{ ...Group.global.style, ...style }}
        >
            { (caption) && <div><span>{caption}</span></div>}
            <div>{children}</div>
        </div>
    );
}

Group.global = {
    className: 'wd-group',
    addClass: '',
    style: {},
};
export default Group;
