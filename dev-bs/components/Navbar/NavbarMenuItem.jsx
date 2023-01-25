import React from 'react';
import collapse from './collapse';

export default ({
    id, caption, active, onClick,
}) => {
    const click = () => {
        collapse();
        if (onClick) onClick({ id, caption, active });
    };

    return (
        <li
            id={id}
            className={'nav-item' }
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
        >
            <a className={`nav-link${active ? ' active' : ''}` } href="#" onClick = {click}>{caption}</a>
        </li>
    );
};
