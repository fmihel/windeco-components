// offset client bounding
function size(dom, type = size.global.type) {
    if (type === 'bounding') {
        const bound = dom.getBoundingClientRect();
        return {
            width: bound.width,
            height: bound.height,
        };
    }
    if (type === 'offset') {
        return {
            width: dom.offsetWidth,
            height: dom.offsetHeight,
        };
    }
    return {
        width: dom.clientWidth,
        height: dom.clientHeight,
    };
}
size.global = {
    type: 'bounding', // offset client bounding
};
export default size;
