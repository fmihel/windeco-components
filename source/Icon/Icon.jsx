import React from 'react';
import _ from 'lodash';

export default function Icon({
    icon, addClass, onClick, style = {},
}) {
    const param = Icon._global.icons[icon];
    return (
        <img
            src={param ? param.path : ''}
            className={`${param ? param.addClass : ''} ${addClass || ''}`}
            onClick={onClick}
            style={{ ...style }}
        />
    );
}

Icon._global = {
    icons: {},
};

Icon.global = (params) => {
    const type = typeof params;
    if (type === 'string') {
        return Icon._global[params];
    }
    if (type === 'object') {
        Icon._global = _.defaultsDeep(params, Icon._global);
    }
    return { ...Icon._global };
};

Icon.icons = (params) => {
    const type = typeof params;
    if (type === 'string') {
        return Icon._global.icons[params];
    }

    if (type === 'object') {
        const icons = {};
        const keys = Object.keys(params);
        keys.map((key) => {
            if (typeof params[key] === 'string') {
                icons[key] = { path: params[key] };
            } else {
                icons[key] = params[key];
            }
        });
        Icon._global.icons = _.defaultsDeep(icons, Icon._global.icons);
    }

    return { ...Icon._global.icons };
};
