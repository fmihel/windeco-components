import size from '../Utils/size';

export const culcWidths = (tableDOM, sizeTable, param = {}) => {
    const tds = tableDOM.childNodes[0].childNodes[0].childNodes;
    const widths = [];
    let sum = 0;
    for (let i = 0; i < tds.length; i++) {
        const area = size(tds[i], 'bounding');
        sum += area.width;
        widths.push(area.width);
    }
    // коррекция последней ячейки
    const off = sizeTable.width - sum - tds.length + 2;
    console.log();
    if (tds.length > 0 && off > 0) {
        widths[widths.length - 1] += off;
    }
    return widths;
};

export const eqWidths = (widths1, widths2) => {
    if (widths1.length !== widths2.length) return false;
    for (let i = 0; i < widths1.length; i++) if (widths1[i] !== widths2[i]) return false;
    return true;
};

export const isWidthsEmpty = (widths) => {
    for (let i = 0; i < widths.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (widths[i] != 0) return false;
    }
    return true;
};

export const haveScrollBar = (tableDom, frameTableDom) => {
    const sizeTable = size(tableDom);
    const sizeFrame = size(frameTableDom);
    return (sizeTable.height > sizeFrame.height);
};
