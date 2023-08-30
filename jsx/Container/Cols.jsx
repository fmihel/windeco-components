import React from 'react';

function Cols({ cols = [] }) {
    return (
        <>
            {cols.map((col, key) => <React.Fragment key={key}>{col}</React.Fragment>)}
        </>
    );
}

export default Cols;
