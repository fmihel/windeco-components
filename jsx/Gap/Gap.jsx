import React from 'react';

function Gap({
    count,
    className = Gap.global.className,
    style = Gap.global.style,
    attr = {},
    onClick = undefined,
    onDoubleClick = undefined,
    children,

}) {
    return (
        <div
            gap=''
            {...(className ? { className: `${className}` } : {})}

            style={{
                ...Gap.global.style,
                ...style,
            }}
            {...attr}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
        >
            {Array(count).fill('').map((it, i) => <div key={i} gap='' ></div>)}
            {children}
        </div>);
}

Gap.global = {
    className: '',
    style: {},

};
export default Gap;
