import React from 'react';
import ListItem from './ListItem.jsx';
import ListNode from './ListNode.jsx';

function List({
    id = undefined,
    className = List.global.className,
    addClass = List.global.addClass,
    style = List.global.style,

    classNameNode = ListNode.global.className,
    addClassNode = ListNode.global.addClass,
    styleNode = ListNode.global.style,

    list = [],
    ItemComponent = List.global.ItemComponent,

    aliasId = List.global.aliasId,
    aliasCaption = List.global.aliasCaption,
    aliasChilds = List.global.aliasChilds,

    setup = {},
    onClick = undefined,
    onDoubleClick = undefined,
}) {
    return (
        <div
            {...(id ? { id } : {})}
            className={`${className} ${addClass}`}
            style={{
                ...List.global.style,
                ...style,
            }}
        >
            <ListNode
                className = {classNameNode}
                addClass = {addClassNode}
                style = {styleNode}

                classNameList = {className}
                addClassList = {addClass}
                styleList={{
                    ...List.global.style,
                    ...style,
                }}

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
    className: 'wd-list',
    addClass: '',
    style: {},

    ItemComponent: ListItem,

    aliasId: 'id',
    aliasCaption: 'caption',
    aliasChilds: 'childs',

};

export default List;
