import React from 'react';

function Header({
    type,
    caption,
    fields,
    widths,

}) {
    return (
        <table>
            <tbody><tr>
                {fields.map((field) => (
                    <th
                        key={field.name}
                        style={{
                            ...(widths[field.name] ? { width: widths[field.name] } : {}),
                        }}
                    >
                        {field.caption}
                    </th>))}
            </tr></tbody>
        </table>
    );
}

export default Header;
