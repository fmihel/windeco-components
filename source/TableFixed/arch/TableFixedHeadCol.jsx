import React from 'react';

export default class TableFixedHeadCol extends React.Component {
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
        const { name, caption, width } = this.props;
        return (
            <th className="wd-table-fixed-head-col" id={name} style={{ width, maxWidth: width }}>{caption || name}</th>
        );
    }
}
TableFixedHeadCol.defaultProps = {
    name: '',
    caption: '',
    width: 10,
};
