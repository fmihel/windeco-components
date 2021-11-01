const path = require('path');

const REMOTE_PATH_WINDECO = 'C:/work/windeco/';

module.exports = {
    PHP_ROUTER_ADDR: 'http://work/windeco/order/app/server/',
    REMOTE_PATH_WINDECO,
    REMOTE_ORDER_PATHS_BY_ARGS: {
        tooh: path.resolve(REMOTE_PATH_WINDECO, 'order-header/node_modules/fmihel-windeco-components/', 'dist'),
        took: path.resolve(REMOTE_PATH_WINDECO, 'order-karniz/node_modules/fmihel-windeco-components/', 'dist'),
        too: path.resolve(REMOTE_PATH_WINDECO, 'order/node_modules/fmihel-windeco-components/', 'dist'),
    },
};
