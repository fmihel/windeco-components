import React from 'react';

function BtnIcon({
    id,
    value,
    onClick = undefined,
    addClass = BtnIcon.global.addClass,
    className = BtnIcon.global.className,
    iconClass = BtnIcon.global.iconClass,
    IconComponent = BtnIcon.global.IconComponent,
    icon,
    hint = '',
    title = '',
    style = {},
    children,
}) {
    return (
        <div
            id={id}
            onClick={onClick}
            className={`${className} ${addClass}`}
            tabIndex={0}
            title = {title || hint || ''}
            style={{ ...BtnIcon.global.style, ...style }}
        >

            <div style = {{ display: (iconClass || (IconComponent && icon)) ? 'block' : 'none' }}className={`${iconClass ? ` ${iconClass}` : ''}`}>
                {IconComponent && icon && <IconComponent icon={icon}/>}
            </div>

            <div style={{ display: (value || children) ? 'block' : 'none' }}>{value || children}</div>
        </div>
    );
}

BtnIcon.global = {
    IconComponent: undefined,
    style: {},
    addClass: '',
    className: 'wd-btn-icon',

};

export default BtnIcon;
