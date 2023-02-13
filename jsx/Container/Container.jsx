import React from 'react';

function Container({
    className = Container.global.className,
    addClass = Container.global.addClass,
    style = { ...Container.global.style },
    children,
}) {
    return (
        <div
            className={ `${className} ${addClass}`}
            style={{ ...Container.global.style, ...style }}
        >
            {children}
        </div>
    );
}

Container.global = {
    className: 'wd-container',
    addClass: '',
    style: {},
};
export default Container;
