import React from 'react';

function TH({
    data = [],
    fieldName,
    caption,
    title,
    onClick,
}) {
    const click = () => {
        if (onClick) {
            onClick({
                fieldName, caption, data,
            });
        }
    };
    return (<th onClick={click} {...(title ? { title } : {})}>{caption}</th>);
}

export default TH;
