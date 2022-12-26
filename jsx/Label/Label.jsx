import React from 'react';

function Label({
    id,
    labelName,
    caption = 'label',
    className = Label.global.className,
    addClass = Label.global.addClass,
    style = Label.global.style,
    children,

}) {
    return (
        <div
            className={`${className} ${addClass}`}
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
    className: 'wd-label',
    addClass: '',
    style: {},
};

export default Label;
