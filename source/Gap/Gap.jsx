import React from 'react';

function Gap({
    count,
    className = Gap.global.className,
    addClass = Gap.global.addClass,
    style = Gap.global.style,
    attr = {},
    onClick = undefined,
    onDoubleClick = undefined,
    children,

}) {
    // console.log('level', count, Array(count).fill('').map(() => 's'));
    return (
        <div
            className={`${className} ${addClass}`}
            style={{
                ...Gap.global.style,
                ...style,
            }}
            {...attr}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
        >
            {Array(count).fill('').map((it, i) => <div key={i} gap={'gap'}></div>)}
            {children}
        </div>);
}

Gap.global = {
    className: 'wd-gap',
    addClass: '',
    style: {},

};
export default Gap;
