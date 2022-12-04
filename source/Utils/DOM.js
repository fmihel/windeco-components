export default function DOM(idOrDOM) {
    if (typeof idOrDOM === 'string') {
        return document.getElementById(idOrDOM.replace('#', ''));
    }
    return idOrDOM;
}
