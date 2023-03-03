import React, { useState } from 'react';
import Collapse from '../Collapse.jsx';

function NavItem({
    id,
    caption,
    children,
    active = false,
    onClick = NavItem.global.onClick,

}) {
    const [open, setOpen] = useState(false);
    const click = () => {
        let newOpen = open;
        if (children) {
            newOpen = !open;
            setOpen(newOpen);
        }
        if (onClick) {
            onClick({
                id, open: newOpen, caption, active,
            });
        }
    };

    return (
        <div
            nav-item=""
            {...(open ? { opened: '' } : {})}
            {...(active ? { active: '' } : {})}
        >
            <div caption="" onClick={click}>
                <div text="" >{caption || 'item'}</div>
                {(children) && <div img=""/>}
            </div>
            {(children) && <Collapse expand={open} attr={{ childs: '' }}>
                {children}
            </Collapse>
            }
        </div>
    );
}

// NavItem._className='NavItem';
NavItem.global = {
    onClick: undefined,

};
export default NavItem;
