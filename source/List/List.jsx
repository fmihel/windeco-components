import React from 'react';

function ListItem({
    id,
    caption,
    data,
    className = ListItem.global.className,
    addClass = ListItem.global.addClass,
    active = false,
    expand = false,
    onClick = undefined,
    onChange = undefined,

}) {
    const click = () => {
        if (onClick) onClick({ id, data });
        // if (onActive) onActive({ id, active: !active, data });
        // if (onExpand) onExpand({ id, expand: !expand, data });
        if (onChange) {
            onChange({
                id, active: !active, expand: !expand, data,
            });
        }
    };
    return (
        <div
            className={`${className} ${addClass}`}
            onClick={click}
            {...(active ? { active: 'true' } : {})}
            {...(expand ? { expand: 'true' } : {})}
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
    const changed = (o) => {
        if (onChange) {
            onChange({ ...o, [aliasId]: o.id });
        }
    };
    return (
        <div
            {...(id ? { id } : {})}
            className={`${className} ${addClass}`}
            {...attr}
            style={{ ...List.global.style, ...style }}
        >
            {list.map((it) => {
                const childs = it[aliasChilds] || [];
                const aid = `${it[aliasId]}`;
                const active = (aid in setup) && setup[aid].active;
                const expand = (aid in setup) && setup[aid].expand;
                return (
                    <div key={aid} id={aid}>
                        <ItemComponent
                            id={aid}
                            caption={it[aliasCaption]}
                            data={it}
                            active={active}
                            expand={expand}
                            onClick={onClick}
                            onChange={changed}
                        />
                        {(childs.length > 0)
                        && <List
                            className = {className}
                            addClass = {addClass}
                            list = {childs}
                            ItemComponent ={ItemComponent}

                            aliasId = {aliasId}
                            aliasCaption = {aliasCaption}
                            aliasChilds = {aliasChilds}
                            setup={setup}
                            onClick={onClick}
                            onChange={onChange}
                            attr={{ ...(expand ? { expand: 'true' } : {}) }}
                            style={{
                                ...style,
                                // ...(!expand ? { height: 0 } : {}),
                                height: 0,
                            }}
                        />
                        }
                    </div>
                );
            })}
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
