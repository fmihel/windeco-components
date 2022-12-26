import React from 'react';

function CheckBox({
    id,
    checked = false,
    className = CheckBox.global.className,
    addClass = CheckBox.global.addClass,
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
            id={id}
            className={`${className} ${addClass}`}
            type="checkbox"
            onChange = {change}
            checked = {checked}
            style={{
                ...CheckBox.global.style,
                ...style,
                ...(visible ? {} : { display: 'none' }),
            }}
            title={title || hint || ''}
        />
    );
}

CheckBox.global = {
    className: 'wd-checkbox',
    addClass: '',
    style: {},
};

export default CheckBox;
