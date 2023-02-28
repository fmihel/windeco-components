import React from 'react';
import TH from './TH.jsx';

function THead({
    data = [],
    fields = [],
    onClick,
}) {
    return (
        <thead>
            <tr>
                {fields.map((field, i) => <TH
                    key = {`${field.name}-${i}`}
                    data = {data}
                    fieldName = {field.name}
                    caption = {field.caption}
                    onClick = {onClick}
                />)}
            </tr>
        </thead>
    );
}

export default THead;
