import React from 'react';

function BtnIcon({
    id,
    value,
    onClick = undefined,
    addClass = '',
    className = BtnIcon.global.className,
    iconClass = BtnIcon.global.iconClass,
    IconComponent = BtnIcon.global.IconComponent,
    icon,
    hint = '',
    title = '',
    style = {},
    children,
}) {
    if (addClass!=='')
        console.warn(`BtnIcon.addClass is deprecated, use className = "${addClass}"`);

    return (
        <div
            type="btn-icon"
            {...(id ? {id}:{})}
            {...(className || addClass ? {className:`${className} ${addClass}`}:{})}
            onClick={onClick}
            tabIndex={0}
            {...(title || hint ? {title:title || hint}:{})}
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
