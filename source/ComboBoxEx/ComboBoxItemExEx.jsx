import React from 'react';

function ComboBoxItem({
    id,
    caption = '',
    className = 'wd-cb-item',
    addClass = '',
    style = {},
    onClick = undefined,
    data = undefined,
}) {
    const click = () => {
        if (onClick) onClick({ id, data });
    };
    return (
        <div
            className={`${className} ${addClass}`}
            id={id}
            onClick={click}
            title={caption}
            style={style}
        >
            {caption}
        </div>);
}

export default ComboBoxItem;
