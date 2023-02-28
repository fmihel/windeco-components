import React from 'react';

function TH({
    data = [],
    fieldName,
    caption,
    onClick,
}) {
    const click = () => {
        if (onClick) {
            onClick({
                fieldName, caption, data,
            });
        }
    };
    return (<th onClick={click}>{caption}</th>);
}

export default TH;
