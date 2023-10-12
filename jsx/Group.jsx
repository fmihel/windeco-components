/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

const definingCssClass = 'wd-group';

function Group({
    id,
    className = Group.global.className,
    style = Group.global.style,
    caption = '',
    attr = {},
    children,
}) {
    return (
        <div
            group=''
            {...(id ? { id } : {})}
            className={`${definingCssClass}${(className ? ` ${className}` : '')}`}
            style={{ ...Group.global.style, ...style }}
            {...attr}
        >
            { (caption) && <div caption='' >{caption}</div>}
            <div content='' >{children}</div>
        </div>
    );
}

Group.global = {
    className: '',
    style: {},
};
export default Group;
