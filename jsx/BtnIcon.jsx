import React from 'react';

const definingCssClass = 'wd-btn-icon';
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
    disabled = false,
    between = true,
    attr = {},

    children,

}) {
    const doClick = (o) => {
        if (!disabled && !attr.disabled && onClick) {
            onClick(o);
        }
    };
    const doKeyDown = (o) => {
        if (o.key === 'Enter') {
            doClick(o);
        }
    };
    const showIcon = (iconClass || (IconComponent && icon));
    const showText = (value || children);
    return (
        <div
            type="btn-icon"
            {...(id ? { id } : {})}
            className={`${definingCssClass}${(className ? ` ${className}` : '')}`}
            onClick={doClick}
            onKeyDown={doKeyDown}
            {...(!disabled && !attr.disabled ? { tabIndex: 0 } : {})}
            {...(title || hint ? { title: title || hint } : {})}
            style={{ ...BtnIcon.global.style, ...style }}
            disabled = {disabled}
            {...attr}
        >
            {(showIcon)
                && <div icon='' {...(iconClass ? { className: iconClass } : {})}>
                    {IconComponent && icon && <IconComponent icon={icon}/>}
                </div>
            }
            {(between && showIcon && showText) && <div between=''></div>}
            {(showText)
                && <div value=''>{value || children}</div>
            }
        </div>
    );
}

BtnIcon.global = {
    IconComponent: undefined,
    style: {},
    className: '',
    iconClass: '',

};

export default BtnIcon;
