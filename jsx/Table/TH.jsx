import React from 'react';

function TH({
    data = [],
    fieldName,
    caption,
    title,
    onClick,
    attrs = false,
}) {
    const click = () => {
        if (onClick) {
            onClick({
                fieldName, caption, data,
            });
        }
    };
    return (<th id={fieldName} onClick={click} {...(title ? { title } : {})} {...(attrs ? { ...attrs } : {})}>{caption}</th>);
}

export default TH;
