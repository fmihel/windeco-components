import React from 'react';

export default class TableFixedCol extends React.Component {
    constructor(p) {
        super(p);
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
        const { value, width } = this.props;
        const style = {};
        if (width) style.width = `${width}px`;
        return (
            <td className="wd-table-fixed-col" style={style}>{value}</td>
        );
    }
}
TableFixedCol.defaultProps = {

    value: '',
    width: undefined,
};
