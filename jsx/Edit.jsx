import React, { useState } from 'react';

const definingCssClass = 'wd-edit';

function Edit({
    id,
    value,
    type = 'text',
    onChange = undefined,
    onKeyPress = undefined,
    onKeyUp = undefined,
    onKeyDown = undefined,

    className = Edit.global.className,
    style = Edit.global.style,

    placeholder = '',
    readonly = undefined,
    disabled = undefined,
    required = undefined,
    error = undefined, // true or text for show error text
    title = '',
    hint = '',
    visible = true,
    min = undefined, // for type = range or number
    max = undefined, // for type = range or number
    step = undefined, // for type = range or number
    minLength = 0,
    maxLength = 0,
    attr = {},
    children,
}) {
    const [focused, setFocused] = useState(false);

    const change = (o) => {
        if (onChange) {
            onChange({ id, value: o.target.value });
        } else {
            console.warn('Edit.onChange not set, define it..');
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
    const val = value || children || '';
    let _type = type;
    if (type === 'number') {
        _type = focused ? type : 'text';
    }
    return (
        <>
            <input
                type={_type}
                {...(id ? { id } : {})}
                className={`${definingCssClass}${(className ? ` ${className}` : '')}`}

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
                {...(placeholder ? { placeholder } : {})}
                {...(disabled ? { disabled: true } : {})}
                {...(readonly ? { readOnly: 'readonly' } : {})}
                {...((required && `${val}`.length === 0) ? { required: true } : {})}

                {...min !== undefined ? { min } : {}}
                {...max !== undefined ? { max } : {}}
                { ...step !== undefined ? { step } : {}}
                {...minLength > 0 ? { minLength } : {}}
                {...maxLength > 0 ? { maxLength } : {}}

                {...(title || hint ? { title: title || hint } : {})}
                {...attr}
                {...error ? { error: '' } : {}}
            />
            {(typeof error === 'string') && <div className="error-edit-msg" dangerouslySetInnerHTML = {{ __html: error }}></div>}
        </>
    );
}

Edit.global = {
    className: '',
    style: {},
};

export default Edit;
