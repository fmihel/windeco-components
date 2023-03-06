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
    return (<th id={fieldName} onClick={click} {...(title ? { title } : {})}>{caption}</th>);
}

export default TH;
