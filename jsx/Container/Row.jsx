import React from 'react';
import Cols from './Cols.jsx';

function Row({
    row,
    // first = false, last = false,
}) {
    return (
        <div
            // {...(first ? { first: '' } : {})}
            // {...(last ? { last: '' } : {})}
        >
            <Cols cols={row}/>
        </div>
    );
}

export default Row;
