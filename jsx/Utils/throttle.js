export default function throttle(callee, timeout) {
    let timer = null;

    return function wrap(...args) {
        if (timer) return;

        timer = setTimeout(() => {
            try {
                callee(...args);
            } catch (e) {
                console.log(e);
            }

            clearTimeout(timer);
            timer = null;
        }, timeout);
    };
}
