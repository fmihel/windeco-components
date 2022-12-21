/* eslint-disable no-param-reassign */
import getsize from './size';

function collapse(dom, {
    close = true,
    delay = 100,
    onStart = undefined,
    onStop = undefined,

}) {
    const height = (setHeight = false) => {
        if (setHeight === false) {
            return parseInt(getsize(dom).height, 10);
        }
        if (setHeight === 'auto') {
            // delete dom.style.height;
            dom.style.height = 'auto';
        } else {
            dom.style.height = `${setHeight}px`;
            // dom.style.maxHeight = `${setHeight}px`;
        }
    };
    const startHeight = height();
    let count;
    const delayStep = 10;
    const move = (dH, ok) => {
        setTimeout(() => {
            height(height() + dH);
            count--;
            if (count > 0) {
                move(dH, ok);
            } else {
                height('auto');
                if (onStop) {
                    onStop();
                }
                ok();
            }
        }, delayStep);
    };

    return new Promise((ok, err) => {
        const delta = startHeight / (delay / delayStep);
        count = parseInt(startHeight / delta, 10);
        if (!close) {
            height(0);
        }
        if (onStart) onStart();
        move(close ? -delta : delta, ok);
    });
}

export default collapse;
