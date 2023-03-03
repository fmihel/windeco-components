import React, { useState } from 'react';
import Collapse from '../Collapse.jsx';

function NavItem({
    id,
    caption,
    children,
    onClick,
}) {
    const [open, setOpen] = useState(false);
    const click = () => {
        if (children) {
            const newOpen = !open;
            setOpen(newOpen);
            if (onClick) onClick({ id, open: newOpen, caption });
        }
    };

    return (
        <div nav-item="" {...(open ? { opened: '' } : {})}>
            <div caption="" onClick={click}>{caption || 'item'}</div>
            {(children) && <Collapse expand={open} attr={{ childs: '' }}>
                {children}
            </Collapse>
            }
        </div>
    );
}

// NavItem._className='NavItem';

export default NavItem;
