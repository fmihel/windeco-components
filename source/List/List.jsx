import React from 'react';
import ListItem from './ListItem.jsx';
import ListNode from './ListNode.jsx';

function List({
    id = undefined,
    className = List.global.className,
    addClass = List.global.addClass,
    list = [],
    ItemComponent = List.global.ItemComponent,

    aliasId = List.global.aliasId,
    aliasCaption = List.global.aliasCaption,
    aliasChilds = List.global.aliasChilds,

    setup = {},
    onClick = undefined,
    onChange = undefined,
    attr = {},
    style = List.global.style,
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
            {...attr}
            style={{
                ...List.global.style,
                ...style,
            }}
        >
            <ListNode
                className = {className}
                addClass = {addClass}
                style = {style}
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

    ItemComponent: ListItem,

    aliasId: 'id',
    aliasCaption: 'caption',
    aliasChilds: 'childs',
    style: {},

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
