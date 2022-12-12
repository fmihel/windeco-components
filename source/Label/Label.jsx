import React from 'react';

function Label({
    id,
    labelName,
    caption = 'label',
    className = Label.global.className,
    classNameFrame = Label.global.classNameFrame,
    addClass = Label.global.addClass,
    style = Label.global.style,
    styleFrame = Label.global.styleFrame,
    children,

}) {
    return (
        <div
            className={classNameFrame}
            style={{ ...Label.global.styleFrame, ...styleFrame }}
        >
            <label
                htmlFor={id || labelName}
                className={`${className} ${addClass}`}
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
    classNameFrame: 'wd-label-frame',
    classAdd: '',
    style: {},
    styleFrame: {},
};

export default Label;
