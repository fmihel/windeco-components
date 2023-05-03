import React from 'react';

function Label({
    id,
    labelName,
    caption = 'label',
    className = Label.global.className,
    style = Label.global.style,
    children,

}) {
    return (
        <div
            type='label'
            {...(className ? { className: `${className}` } : {})}
        >
            <label
                htmlFor={id || labelName}
                style={{ ...Label.global.style, ...style }}
            >
                {caption}
            </label>
            {children}
        </div>
    );
}

Label.global = {
    className: '',
    style: {},
};

export default Label;
