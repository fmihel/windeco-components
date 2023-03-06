import React, { useState } from 'react';
import Collapse from '../Collapse.jsx';

function NavItem({
    id,
    caption,
    children,
    active = false,
    open = false,
    style = { ...NavItem.global.style },
    className = NavItem.global.className,
    onClick = NavItem.global.onClick,

}) {
    const [opened, setOpened] = useState(open);
    const click = () => {
        let current = opened;
        if (children) {
            current = !opened;
            setOpened(current);
        }
        if (onClick) {
            onClick({
                id, open: current, caption, active,
            });
        }
    };

    return (
        <div
            {...className ? { className } : {}}
            style = {{ ...NavItem.global.style, ...style }}
            nav-item=""
            {...(opened ? { opened: '' } : {})}
            {...(active ? { active: '' } : {})}
        >
            <div caption="" onClick={click}>
                <div text="" >{caption || 'item'}</div>
                {(children) && <div img=""/>}
            </div>
            {(children) && <Collapse expand={opened} attr={{ childs: '' }}>
                {children}
            </Collapse>
            }
        </div>
    );
}

// NavItem._className='NavItem';
NavItem.global = {
    onClick: undefined,
    className: '',
    style: {},

};
export default NavItem;
