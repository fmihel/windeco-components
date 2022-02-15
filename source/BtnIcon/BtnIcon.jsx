import React from 'react';

export default function BtnIcon({
    id, value, onClick, children,
    addClass,
    iconClass, IconComponent, icon, hint,
}) {
    return (
        <div
            id={id}
            onClick={onClick}
            className={`wd-btn-icon${addClass ? ` ${addClass}` : ''}`}
            tabIndex={0}
            title = {hint || ''}
        >
            { (iconClass || (IconComponent && icon))
            && <div className={`wd-bi-icon ${iconClass}`}>
                {IconComponent && icon
                && <IconComponent icon={icon}/>}
            </div>
            }
            <div className={'wd-bi-value'}>{value || children}</div>

        </div>
    );
}
