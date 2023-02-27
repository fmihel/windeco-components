import React from 'react';

function Label({
    id,
    labelName,
    caption = 'label',
    className = Label.global.className,
    addClass = '',
    style = Label.global.style,
    children,

}) {
    if (addClass!=='')
        console.warn(`Label.addClass is deprecated, use className = ${addClass}`);

    return (
        <div
            type='label'
            {...(className || addClass ? {className:`${className} ${addClass}`}:{})}
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
