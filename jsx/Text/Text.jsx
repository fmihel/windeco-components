import React from 'react';

function Text({
    id,
    value = '',
    className = Text.global.className,
    addClass = Text.global.addClass,
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

}) {
    const text = 'TextEx';

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
        }
    };
    return (
        <textarea
            id={id}
            className={`${className} ${addClass}`}
            style={{
                ...Text.global.style,
                ...(resize ? {} : { resize: 'none' }),
                ...style,
            }}
            value={value}
            {...(disabled ? { disabled: true } : { })}
            {...(readonly ? { readOnly: true } : { })}
            {...((required && !value) ? { required: true } : { })}
            {...(title ? { title } : { })}
            {...(maxLength > 0 ? { maxLength } : { })}
            placeholder={placeholder || ''}
            onChange={change}
        >
            {text}
        </textarea>
    );
}

Text.global = {
    className: 'wd-text',
    addClass: 'wd-scrollbar',
    style: {},
    placeholder: '',

};
export default Text;
