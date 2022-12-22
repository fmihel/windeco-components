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
    onChange = undefined,
}) {
    const change = (o) => {
        if (onChange) {
            onChange({ ...o, [aliasId]: o.id });
        }
    };
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
                onChange = {change}
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

List.map = (o, callback) => {
    if (Array.isArray(o)) {
        return o.map((val, index) => callback(val, index));
    } if (typeof o === 'object') {
        const keys = Object.keys(o);
        const out = {};
        keys.map((key) => {
            out[key] = callback(o[key], key);
        });
        return out;
    }
    throw Error('List.map(a,..) a is array or object');
};
List.filter = (o, callback) => {
    if (Array.isArray(o)) {
        return o.filter((p, i) => callback(p, i));
    } if (typeof o === 'object') {
        const keys = Object.keys(o);
        const out = {};
        keys.map((key) => {
            const res = callback(o[key], key);
            if (res) out[key] = res;
        });
        return out;
    }
    throw Error('List.map(a,..) a is array or object');
};
export default List;
