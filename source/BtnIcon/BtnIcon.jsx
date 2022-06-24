import React from 'react';
import _ from 'lodash';

function BtnIcon({
    id, value, onClick, children,
    addClass = '',
    iconClass,
    IconComponent = undefined,
    icon, hint = '', style = {},
}) {
    const CIconComponent = IconComponent || BtnIcon._global.IconComponent;
    const CStyle = { ...BtnIcon._global.style, ...style };
    const CAddClass = [BtnIcon._global.addClass, addClass].join(' ').trim();
    return (
        <div
            id={id}
            onClick={onClick}
            className={`wd-btn-icon${CAddClass ? ` ${CAddClass}` : ''}`}
            tabIndex={0}
            title = {hint || ''}
            style={CStyle}
        >
            { (iconClass || (CIconComponent && icon))
            && <div className={`wd-bi-icon ${iconClass}`}>
                {CIconComponent && icon && <CIconComponent icon={icon}/>}
            </div>
            }
            {(value || children)
            && <div className={'wd-bi-value'}>{value || children}</div>
            }
        </div>
    );
}

BtnIcon._global = {
    IconComponent: undefined,
    style: {},
    addClass: '',
};

BtnIcon.global = (o) => {
    if (o) {
        const props = Object.keys(o);
        props.map((prop) => {
            if (prop === 'IconComponent') BtnIcon._global[prop] = o[prop];
            else BtnIcon._global[prop] = _.cloneDeep(o[prop]);
        });
    }
    return BtnIcon._global;
};

export default BtnIcon;
