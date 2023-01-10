export default function onResizeScreen(callback) {
    window.addEventListener('resize', callback);

    return () => {
        window.removeEventListener('resize', callback);
    };
}
