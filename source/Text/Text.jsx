/* eslint-disable camelcase */
import React from 'react';

function str_chunck(str, len) {
    return str.match(new RegExp(`.{1,${len}}`, 'g'));
}

export default class Text extends React.Component {
    constructor(p) {
        super(p);
        this.onChange = this.onChange.bind(this);
        this.refTextarea = React.createRef();
        this.cursorPosition = false;
    }

    onChange(o) {
        if (this.props.onChange) {
            this.props.onChange({ id: this.props.id, value: this.prepare(o.currentTarget.value), sender: this });
        }
    }

    prepare(aText) {
        if (this.props.rows > 0 && aText.length > 0 && this.props.cols > 0) {
            this.cursorPosition = $(this.refTextarea.current).prop('selectionStart');

            const text = aText.substring(0, this.props.rows * (this.props.cols + 1));

            const match = text.split('\n');
            let prev = '';
            let i = 0;
            let len = 0;
            while (i < match.length) {
                match[i] = prev + match[i];
                if (match[i].length > this.props.cols) {
                    prev = match[i].substring(this.props.cols);
                    match[i] = match[i].substring(0, this.props.cols);
                } else {
                    prev = '';
                }

                len += match[i].length + 1;
                if (len == this.cursorPosition) { // случай, если курсор стоял на последнем символе в строке, исимвол перешел на след строку
                    this.cursorPosition++;
                }
                i++;
            }
            if (prev.length) match.push(prev);

            if (match.length - 1 >= this.props.rows) {
                match.splice(this.props.rows);
            }
            return match.join('\n');
        }
        return aText;
    }

    componentDidMount() {
        // разовый вызов после первого рендеринга
    }

    componentWillUnmount() {
        // разовый после последнего рендеринга
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        // каждый раз после рендеринга (кроме первого раза !)
        if (this.cursorPosition) {
            $(this.refTextarea.current).prop('selectionStart', this.cursorPosition);
            $(this.refTextarea.current).prop('selectionEnd', this.cursorPosition);
            this.cursorPosition = false;
        }
    }

    render() {
        const {
            value, style, addClass, placeholder, hint, disabled, resize, readonly, maxLength, required, id,
        } = this.props;
        const _style = { ...style, resize: resize ? '' : 'none' };
        const prop = {};
        if (maxLength > 0) prop.maxLength = maxLength;
        let _class = `wd-text ${disabled ? 'wd-text-disabled ' : ''}${readonly ? 'wd-text-readonly ' : ''}${addClass || ''}`;
        const _value = value || this.props.children || '';
        if (required && (`${_value}`).length === 0) _class += ' wd-text-require ';
        if (readonly) prop.readOnly = 'readonly';
        if (id) prop.id = id;
        return (
            <textarea
                ref = {this.refTextarea}
                value={_value}
                style={_style}
                className={_class}
                placeholder={placeholder}
                title={hint}
                disabled={disabled}
                onChange={this.onChange}
                {...prop}
            />
        );
    }
}
Text.defaultProps = {
    id: undefined,
    disabled: 0,
    onChange: undefined,
    value: undefined,
    placeholder: '',
    readonly: false,
    style: {},
    addClass: '',
    hint: '',
    resize: false,
    maxLength: 0,
    required: false,
    rows: 0,
    cols: 0,
};
