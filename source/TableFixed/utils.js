const getWidth = (dom) => dom.offsetWidth;
// dom.getBoundingClientRect().width;
// dom.clientWidth;

export const culcWidths = (tableDOM) => {
    const tds = tableDOM.childNodes[0].childNodes[0].childNodes;
    const widths = [];
    for (let i = 0; i < tds.length; i++) {
        widths.push(getWidth(tds[i]));
    }
    return widths;
};

export const eqWidths = (widths1, widths2) => {
    if (widths1.length !== widths2.length) return false;
    for (let i = 0; i < widths1.length; i++) if (widths1[i] !== widths2[i]) return false;
    return true;
};
