import React, { useEffect, useRef, useState } from 'react';
import Collapse from '../Collapse/Collapse.jsx';

export default function ListNode({
    className,
    addClass,
    style,
    list,
    aliasChilds,
    aliasId,
    aliasCaption,
    setup,
    ItemComponent,
    onClick,
    onChange,

}) {
    return (
        <>
            {list.map((it) => {
                const childs = it[aliasChilds] || [];
                const aid = `${it[aliasId]}`;
                const active = (aid in setup) && setup[aid].active;
                const expand = (aid in setup) && setup[aid].expand;
                return (
                    <div key={aid} id={aid} className='wd-node'>
                        <ItemComponent
                            id={aid}
                            caption={it[aliasCaption]}
                            data={it}
                            active={active}
                            expand={expand}
                            onClick={onClick}
                            onChange={onChange}
                        />
                        {(childs.length > 0)
                        && <Collapse
                            expand = {expand}
                            className = {className}
                            addClass = {addClass}
                        >
                            <ListNode
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
                                }}
                            />
                        </Collapse>
                        }
                    </div>
                );
            })}
        </>
    );
}
