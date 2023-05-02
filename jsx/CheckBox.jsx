import React from 'react';

function CheckBox({
    id,
    checked = false,
    className = CheckBox.global.className,
    onChange = undefined,
    style = CheckBox.global.style,
    hint = false,
    title = false,
    disabled = false,
    visible = true,
}) {
    const change = ({ target }) => {
        if (!disabled) {
            if (onChange) {
                onChange({ id, checked: target.checked, value: target.checked });
            }
        }
    };
    return (
        <input
            type="checkbox"
            {...(id ? { id } : {})}
            {...(className ? { className: `${className}` } : {})}

            onChange = {change}
            checked = {checked}
            style={{
                ...CheckBox.global.style,
                ...style,
                ...(visible ? {} : { display: 'none' }),
            }}
            {...(title || hint ? { title: title || hint } : {})}
        />
    );
}

CheckBox.global = {
    className: '',
    style: {},
};

export default CheckBox;
