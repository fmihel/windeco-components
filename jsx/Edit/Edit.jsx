import React, { useState } from 'react';

function Edit({
    id,
    value,
    type = 'text',
    onChange = undefined,
    onKeyPress = undefined,
    onKeyUp = undefined,
    onKeyDown = undefined,

    className = Edit.global.className,
    addClass = Edit.global.addClass,
    style = Edit.global.style,

    placeholder = '',
    readonly = undefined,
    disabled = undefined,
    required = undefined,
    title = '',
    hint = '',
    visible = true,
    min = undefined, // for type = range or number
    max = undefined, // for type = range or number
    step = undefined, // for type = range or number
    minLength = 0,
    maxLength = 0,

    children,
}) {
    const [focused, setFocused] = useState(false);

    const change = (o) => {
        console.log('change', value);
        if (onChange) {
            onChange({ id, value: o.target.value });
        }
    };
    const keyevent = (o, callback) => {
        if (callback) {
            callback({
                id,
                value: o.target.value,
                key: o.key,
                args: o,
            });
        }
    };
    const keyup = (o) => {
        keyevent(o, onKeyUp);
    };
    const keydn = (o) => {
        keyevent(o, onKeyDown);
        keyevent(o, onKeyPress);
    };
    const focus = () => {
        setFocused(true);
    };
    const unfocus = () => {
        setFocused(false);
    };
    // --------------------------------------------------------
    const props = {};
    if (min !== undefined) props.min = min;
    if (max !== undefined) props.max = max;
    if (step !== undefined) props.step = step;
    if (minLength > 0) props.minLength = minLength;
    if (maxLength > 0) props.maxLength = maxLength;
    // --------------------------------------------------------
    const val = value || children || '';
    let _type = type;
    if (type === 'number') {
        _type = focused ? type : 'text';
    }
    return (
        <input
            id={id}
            type={_type}
            value={val}
            onChange={change}
            onKeyUp={keyup}
            onKeyDown={keydn}
            // onKeyPress={keypress} deprected
            onFocus={focus}
            onBlur = {unfocus}
            style={{
                ...Edit.global.style,
                ...style,
                ...(visible ? {} : { display: 'none' }),
            }}
            className={`${className} ${addClass}`}
            placeholder={placeholder}
            {...(disabled ? { disabled: true } : {})}
            {...(readonly ? { readOnly: 'readonly' } : {})}
            {...((required && `${val}`.length === 0) ? { required: true } : {})}

            {...props}
            title = {title || hint || ''}

        />
    );
}

Edit.global = {
    className: 'wd-edit',
    addClass: '',
    style: {},
};

export default Edit;