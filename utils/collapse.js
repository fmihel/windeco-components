/* eslint-disable no-param-reassign */
import getsize from './size';
import timer from './timer';

function collapse({
    dom,
    close = true,
    delay = 100,
    step = 10,
    onStart = undefined,
    onStop = undefined,

}) {
    const height = (setHeight = false) => {
        if (setHeight === false) {
            return parseInt(getsize(dom).height, 10);
        }
        if (setHeight === 'auto') {
            dom.style.height = 'auto';
        } else {
            dom.style.height = `${setHeight}px`;
        }
    };
    const startHeight = height();

    return new Promise((ok, err) => {
        timer.step({
            onStart() {
                if (onStart) {
                    onStart();
                }
            },
            onStep(p) {
                height(p.height);
            },
            onStop(p) {
                height(p.height);
                if (p.height > 0) {
                    height('auto');
                }
                if (onStop) {
                    onStop();
                }
                ok();
            },
            timeMSec: delay,
            deltaMSec: step,
            changeParams: {
                height: {
                    from: (close ? startHeight : 0),
                    to: (close ? 0 : startHeight),
                },
            },
        });
    });
}

export default collapse;
