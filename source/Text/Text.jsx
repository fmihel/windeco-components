import React from 'react';

export default class Text extends React.Component {
    constructor(p) {
        super(p);
        this.onChange = this.onChange.bind(this);
    }

    onChange(o) {
        if (this.props.onChange) {
            this.props.onChange({ id: this.props.id, value: o.currentTarget.value, sender: this });
        }
    }

    componentDidMount() {
        // разовый вызов после первого рендеринга
    }

    componentWillUnmount() {
        // разовый после последнего рендеринга
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        // каждый раз после рендеринга (кроме первого раза !)
    }

    render() {
        const {
            value, style, addClass, placeholder, hint, disabled, resize, readonly, maxLength, required,
        } = this.props;
        const _style = { ...style, resize: resize ? '' : 'none' };
        const prop = {};
        if (maxLength > 0) prop.maxLength = maxLength;
        let _class = `wd-text ${disabled ? 'wd-text-disabled ' : ''}${readonly ? 'wd-text-readonly ' : ''}${addClass || ''}`;
        const _value = value || this.props.children || '';
        if (required && (`${_value}`).length === 0) _class += ' wd-text-require ';

        return (
            <textarea
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
    required: true,
};
