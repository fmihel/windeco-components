import React from 'react';

function Col({
    className = Col.global.className,
    addClass = Col.global.addClass,
    style = { ...Col.global.style },
    children,
}) {
    return (
        <div
            className={ `${className} ${addClass}`}
            style={{ ...Col.global.style, ...style }}
        >
            {children}
        </div>
    );
}

Col.global = {
    className: 'wd-col',
    addClass: '',
    style: {},
};
export default Col;
