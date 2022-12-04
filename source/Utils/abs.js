export default function abs(dom) {
    const w = dom.getBoundingClientRect();
    return {
        x: w.left + window.pageXOffset,
        y: w.top + window.pageYOffset,
        w: w.width,
        h: w.height,
    };
}
