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
            style={{ style }}
        >
            { (caption)
            && <div style={{ position: 'absolute' }}>
                <span
                    style={{
                        position: 'relative',
                        left: '5px',
                        top: '-1.2rem',
                        fontSize: '0.8rem',
                    }}
                >{caption}</span>
            </div>
            }
            {children}
        </div>
    );
}

Group.global = {
    className: 'wd-group',
    addClass: '',
    style: {},
};
export default Group;
