let x = 0;
let y = 0;

function mousemove(e) {
    x = e.clientX;
    y = e.clientY;
}

window.addEventListener('mousemove', mousemove);

export default function mouse() {
    return { x, y };
}
