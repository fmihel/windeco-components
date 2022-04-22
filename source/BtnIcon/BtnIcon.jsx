import React from 'react';

export default function BtnIcon({
    id, value, onClick, children,
    addClass,
    iconClass, IconComponent, icon, hint, style,
}) {
    return (
        <div
            id={id}
            onClick={onClick}
            className={`wd-btn-icon${addClass ? ` ${addClass}` : ''}`}
            tabIndex={0}
            title = {hint || ''}
            style={{ ...style }}
        >
            { (iconClass || (IconComponent && icon))
            && <div className={`wd-bi-icon ${iconClass}`}>
                {IconComponent && icon
                && <IconComponent icon={icon}/>}
            </div>
            }
            {(value || children)
            && <div className={'wd-bi-value'}>{value || children}</div>
            }
        </div>
    );
}
