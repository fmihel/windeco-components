export default function screen() {
    const w = [];
    const h = [];
    if (window.innerWidth) w.push(window.innerWidth);
    if (document.documentElement.clientWidth) w.push(document.documentElement.clientWidth);
    if (document.body.clientWidth) w.push(document.body.clientWidth);

    if (window.innerHeight) h.push(window.innerHeight);
    if (document.documentElement.clientHeight) h.push(document.documentElement.clientHeight);
    if (document.body.clientHeight) h.push(document.body.clientHeight);

    return {
        // width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        // height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        width: Math.min(...w),
        height: Math.min(...h),
    };
}
