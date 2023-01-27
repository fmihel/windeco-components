import abs from './abs';
import childDOM from './childDOM';
/** возвращает размер необходимый, чтобы вместить все дочерние компоненты */
export default function (DOM) {
    const out = { width: 0, height: 0 };

    const childs = childDOM(DOM);
    let minX = 0; let minY = 0; let maxX = 0; let maxY = 0;
    childs.map((it, i) => {
        const size = abs(it);
        if (i === 0) {
            minX = size.x;
            minY = size.y;
            maxX = size.x + size.w;
            maxY = size.y + size.h;
        } else {
            minX = Math.min(minX, size.x);
            minY = Math.min(minY, size.y);
            maxX = Math.max(maxX, size.x + size.w);
            maxY = Math.max(maxY, size.y + size.h);
        }
    });
    out.width = maxX - minX;
    out.height = maxY - minY;
    return out;
}
