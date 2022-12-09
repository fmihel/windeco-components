import React from 'react';

function Header({
    id,
    className,
    addClass,
    type, // 'fields' : 'caption'
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
                    {(type === 'fields') && fields.map((field, i) => (
                        <th
                            key={field.name}
                            style={{
                                ...(i < widths.length ? { width: widths[i], maxWidth: widths[i] } : {}),
                            }}
                        >
                            {field.caption}
                        </th>))
                    }
                    {(type === 'caption') && <th style={{ width: widths[0], maxWidth: widths[0] }}>{caption}</th>}
                </tr>
            </thead>
        </table>

    );
}

export default Header;
