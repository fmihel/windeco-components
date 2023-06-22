import React from 'react';
import ListItem from './List/ListItem.jsx';
import ListNode from './List/ListNode.jsx';

const definingCssClass = 'wd-list';

function List({
    id = undefined,
    className = List.global.className,
    style = List.global.style,

    list = [],
    ItemComponent = List.global.ItemComponent,

    aliasId = List.global.aliasId,
    aliasCaption = List.global.aliasCaption,
    aliasChilds = List.global.aliasChilds,
    attr = {},
    setup = {},
    onClick = undefined,
    onDoubleClick = undefined,
}) {
    return (
        <div
            {...(id ? { id } : {})}
            className={`${definingCssClass}${(className ? ` ${className}` : '')}`}
            style={{
                ...List.global.style,
                ...style,
            }}
            {...attr}
        >
            <ListNode
                list = {list}
                aliasChilds = {aliasChilds}
                aliasId = {aliasId}
                aliasCaption = {aliasCaption}
                setup = {setup}
                ItemComponent = {ItemComponent}
                onClick = {onClick}
                onDoubleClick = {onDoubleClick}
            />
        </div>

    );
}
List.global = {
    className: '',
    style: {},

    ItemComponent: ListItem,

    aliasId: 'id',
    aliasCaption: 'caption',
    aliasChilds: 'childs',

};

export default List;
