import React from 'react';

function Header({
    id,
    className,
    addClass,
    type,
    caption,
    fields,
    widths,

}) {
    return (
        <table
            id={`header-${id}`}
            className={`${className} ${addClass}`}
            header="true"
        >
            <thead>
                <tr>
                    {fields.map((field, i) => (
                        <th
                            key={field.name}
                            style={{
                                ...(i < widths.length ? { width: widths[i], minWidth: widths[i] } : {}),
                            }}
                        >
                            {field.caption}
                        </th>))}
                </tr>
            </thead>
        </table>
    );
}

export default Header;
