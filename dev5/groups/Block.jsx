import React from 'react';

export default ({ style = {}, children }) => (
    <div className='block' style={{ ...style }}>
        {children}
    </div>
);
