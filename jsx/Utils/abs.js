export default function abs(dom) {
    const rect = dom.getBoundingClientRect();
    return {
        x: rect.left + window.pageXOffset,
        y: rect.top + window.pageYOffset,
        w: rect.width,
        h: rect.height,
    };
}
