export default function (y, y1, y2, x1, x2) {
    if ((y2 - y1) === 0) {
        return 0;
    }
    return (x2 * (y - y1) + x1 * (y2 - y)) / (y2 - y1);
}
