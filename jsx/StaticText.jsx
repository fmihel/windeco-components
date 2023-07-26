import React from 'react';

const definingCssClass = 'wd-static-text';

function StaticText({
    value = '',
    className = StaticText.global.className,
    style = StaticText.global.className,
    attr = {},
    children,
}) {
    return (
        <div
            className={`${definingCssClass}${(className ? ` ${className}` : '')}`}
            style={{
                ...StaticText.global.style,
                ...style,
            }}
            {...attr}
        >
            {value || children}
        </div>
    );
}

StaticText.global = {
    className: '',
    style: {},
};
export default StaticText;
