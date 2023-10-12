import React from 'react';

const definingCssClass = 'wd-label';

function Label({
    id,
    caption = 'label',
    className = Label.global.className,
    style = Label.global.style,
    attr = {},
    children,
}) {
    return (
        <div
            label=''
            style={{ ...Label.global.style, ...style }}
            className={`${definingCssClass}${(className ? ` ${className}` : '')}`}
            {...id ? { id: `label-${id}` } : {}}

        >
            <label
                htmlFor={id}
                {...attr}
            >
                {caption}
            </label>
            <div labeled=''>
                {children}
            </div>
        </div>
    );
}

Label.global = {
    className: '',
    style: {},
};

export default Label;
