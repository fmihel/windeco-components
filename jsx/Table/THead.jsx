import React from 'react';
import TH from './TH.jsx';

function THead({
    data = [],
    fields = [],
    header,
    onClick,
}) {
    console.log(fields);
    return (
        <thead>
            <tr>

                {(header === true) && fields.map((field, i) => <TH
                    key = {`${field.name}-${i}`}
                    data = {data}
                    fieldName = {field.name}
                    caption = {field.caption}
                    title = {field.title}
                    onClick = {onClick}
                />)}

                {(typeof header === 'string')
                    && <th colSpan={fields.length}>{header}</th>
                }
            </tr>
        </thead>
    );
}

export default THead;
