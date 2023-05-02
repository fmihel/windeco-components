import React from 'react';

function Text({
    id,
    value = undefined,
    className = Text.global.className,
    addClass = '',
    attr = {},
    style = Text.global.style,
    placeholder = Text.global.placeholder,
    disabled = false,
    readonly = false,
    required = false,
    title = '',
    resize = false,
    maxLength = 0,
    rows = 0,
    cols = 0,
    onChange = undefined,
    children,

}) {
    if (addClass !== '') console.warn(`Text.addClass is deprecated, use className = ${addClass}`);

    const prepare = (aText, dom) => {
        if (rows > 0 && aText.length > 0 && cols > 0) {
            // console.log('at', { selectionStart: dom.selectionStart });
            let cursorPosition = dom.selectionStart;
            const txt = aText.substring(0, rows * (cols + 1));
            const match = txt.split('\n');
            let prev = '';
            let i = 0;
            let len = 0;
            while (i < match.length) {
                match[i] = prev + match[i];
                if (match[i].length > cols) {
                    prev = match[i].substring(cols);
                    match[i] = match[i].substring(0, cols);
                } else {
                    prev = '';
                }

                len += match[i].length + 1;
                if (len == cursorPosition) { // случай, если курсор стоял на последнем символе в строке, исимвол перешел на след строку
                    cursorPosition++;
                }
                i++;
            }
            if (prev.length) match.push(prev);

            if (match.length - 1 >= rows) {
                match.splice(rows);
            }
            return match.join('\n');
        }
        return aText;
    };
    const change = ({ currentTarget }) => {
        if (onChange) {
            onChange({ id, value: prepare(currentTarget.value, currentTarget) });
        } else {
            console.warn('Text.onChange not set, define it.');
        }
    };
    const val = value || children;
    return (
        <textarea
            {...(id ? { id } : {})}
            {...(className || addClass ? { className: `${className} ${addClass}` } : {})}
            style={{
                ...Text.global.style,
                ...(resize ? {} : { resize: 'none' }),
                ...style,
            }}
            value={val}
            {...(disabled ? { disabled: true } : { })}
            {...(readonly ? { readOnly: true } : { })}
            {...((required && `${val}`.length === 0) ? { required: true } : { })}
            {...(title ? { title } : { })}
            {...(maxLength > 0 ? { maxLength } : { })}
            {...(placeholder ? { placeholder } : {})}
            {...attr}
            onChange={change}
        />
    );
}

Text.global = {
    className: 'wd-scrollbar',
    style: {},
    placeholder: '',

};
export default Text;
