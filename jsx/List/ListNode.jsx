import React from 'react';
import Collapse from '../Collapse/Collapse.jsx';

export default function ListNode({
    className = ListNode.global.className,
    addClass = ListNode.global.addClass,
    style = ListNode.global.style,

    classNameList,
    addClassList,
    styleList,

    list,
    aliasChilds,
    aliasId,
    aliasCaption,
    setup,
    ItemComponent,
    onClick,
    onDoubleClick,
    level = 0,

}) {
    return (
        <>
            {list.map((it) => {
                const childs = it[aliasChilds] || [];
                const aid = `${it[aliasId]}`;
                const active = !!(((aid in setup) && setup[aid].active));
                const expand = !!(((aid in setup) && setup[aid].expand));

                return (
                    <div
                        key={aid}
                        id={aid}
                        className={`${className} ${addClass}`}
                        style={{
                            ...ListNode.global.style,
                            ...style,
                        }}
                    >
                        <ItemComponent
                            id={aid}
                            caption={it[aliasCaption]}
                            level={level}
                            data={it}
                            childs={it[aliasChilds]}
                            active={active}
                            expand={expand}
                            onClick={onClick ? () => { onClick(it); } : undefined}
                            onDoubleClick={onDoubleClick ? () => { onDoubleClick(it); } : undefined}
                        />
                        {(childs.length > 0)
                        && <Collapse
                            expand = {expand}
                            className = {classNameList}
                            addClass = {addClassList}
                            style={styleList}

                        >
                            <ListNode
                                level={level + 1}
                                className = {className}
                                addClass = {addClass}
                                style={style}

                                classNameList = {classNameList}
                                addClassList = {addClassList}
                                styleList={styleList}

                                list = {childs}
                                ItemComponent ={ItemComponent}

                                aliasId = {aliasId}
                                aliasCaption = {aliasCaption}
                                aliasChilds = {aliasChilds}
                                setup={setup}
                                onClick={onClick}
                                onDoubleClick={onDoubleClick}

                            />
                        </Collapse>
                        }
                    </div>
                );
            })}
        </>
    );
}

ListNode.global = {
    className: 'wd-node',
    addClass: '',
    style: {},
};
