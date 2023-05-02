import React from 'react';

function BtnIcon({
    id,
    value,
    onClick = undefined,
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
            type="btn-icon"
            {...(id ? { id } : {})}
            {...(className ? { className: `${className}` } : {})}
            onClick={onClick}
            tabIndex={0}
            {...(title || hint ? { title: title || hint } : {})}
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
    className: '',

};

export default BtnIcon;
