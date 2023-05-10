import React from 'react';
import Collapse from '../Collapse.jsx';

export default function ListNode({

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
                        list-node = {''}
                        key={aid}
                        id={aid}
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
                            attr = {{ list: '' }}

                        >
                            <ListNode
                                list-node = {''}
                                level={level + 1}

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
};
