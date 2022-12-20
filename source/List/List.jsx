import React from 'react';

function ListItem({
    id,
    caption,
    data,
    className = ListItem.global.className,
    addClass = ListItem.global.addClass,

}) {
    return (
        <div
            id={id}
            className={`${className} ${addClass}`}
        >
            {caption}
        </div>
    );
}

ListItem.global = {
    className: 'wd-list-item',
    addClass: '',
};

function List({
    id,
    className = List.global.className,
    addClass = List.global.addClass,
    list = [],
    ItemComponent = List.global.ItemComponent,

    aliasId = List.global.aliasId,
    aliasCaption = List.global.aliasCaption,
    aliasChilds = List.global.aliasChilds,
}) {
    return (
        <div
            {...(id ? { id } : {})}
            className={`${className} ${addClass}`}
        >
            {list.map((it) => (

                <ItemComponent
                    key={it[aliasId]}
                    id={it[aliasId]}
                    caption={it[aliasCaption]}
                    data={it}
                />))}
        </div>
    );
}
List.global = {
    className: 'wd-list',
    addClass: '',

    ItemComponent: ListItem,

    aliasId: 'id',
    aliasCaption: 'caption',
    aliasChild: 'childs',

};
export default List;
