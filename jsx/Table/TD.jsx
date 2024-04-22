import React from 'react';

function TD({
    data = [],
    row = {},
    fieldName,
    value,
    onClick,
    onDoubleClick,
    onMouseUp,
    onDraw,
    aliasId,
    attrs,
    width,
    disableContextMenu,
}) {
    const click = () => {
        if (onClick) {
            onClick({
                col: fieldName, value, row, data, aliasId,
            });
        }
    };
    const doubleClick = () => {
        if (onDoubleClick) {
            onDoubleClick({
                col: fieldName, value, row, data, aliasId,
            });
        }
    };
    const mouseUp = (event) => {
        if (onMouseUp) {
            onMouseUp({
                col: fieldName, value, row, data, aliasId, event,
            });
        }
    };
    const contextMenu = (e) => {
        e.preventDefault();
        return false;
    };
    return (
        <td
            onClick={click}
            onMouseUp = {mouseUp}
            onDoubleClick= {doubleClick}
            id={fieldName}
            {...(attrs ? { ...attrs } : {})}
            {...(width ? { style: { width } } : {})}
            onContextMenu={disableContextMenu ? contextMenu : undefined}
        >
            {onDraw ? onDraw({
                sender: 'td',
                col: fieldName,
                value,
                row,
                data,
                aliasId,
            }) : value}
        </td>
    );
}

export default TD;
