/* eslint-disable array-callback-return */
import translate from './translate';

export default class timer {
    static startTime = (new Date()).getTime();

    static time() {
        return (new Date()).getTime();
    }

    // время в сек от начала сеанса
    static sec() {
        return timer.millisec() / 1000;
    }

    // время в мсек от начала сеанса
    static millisec() {
        return (timer.time() - timer.startTime);
    }

    /** вызывает onStep в течении timeMSec с интервалом
     * deltaMSec. параметры changesParams пересчитываются на каждом шаге,
     * с учетом прошедшего времени.
     *
    */
    static step({
        onStart = undefined,
        onStep = undefined,
        onStop = undefined,
        timeMSec = 1000,
        deltaMSec = 10,
        changeParams = {
            // len:{from:10,to:20} (10->20)
        },
    }) {
        const start = timer.millisec();
        const stop = start + timeMSec;
        let current = start;

        const params = {};
        const names = Object.keys(changeParams);
        names.map((name) => { params[name] = changeParams[name].from; });

        const _step = () => {
            names.map((name) => {
                params[name] = (current >= stop) ? changeParams[name].to : translate(current, start, stop, changeParams[name].from, changeParams[name].to);
            });
        };
        if (onStart) {
            onStart(params);
        }
        if (onStep) {
            onStep(params);
        }

        const interval = setInterval(() => {
            current = timer.millisec();
            _step();
            if (onStep) {
                onStep(params);
            }
            if (current >= stop) {
                if (onStop) {
                    onStop(params);
                }
                clearInterval(interval);
            }
        }, deltaMSec);
    }
}
