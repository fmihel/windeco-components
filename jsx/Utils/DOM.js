export default function DOM(selectorOrDOM, startFromDOM = false) {
    if (typeof selectorOrDOM === 'string') {
        if (selectorOrDOM[0] === '#') {
            return document.getElementById(selectorOrDOM.substring(1));
        } if (selectorOrDOM[0] === '.') {
            return (startFromDOM || document).getElementsByClassName(selectorOrDOM.substring(1))[0];
        }
        return (startFromDOM || document).getElementsByTagName(selectorOrDOM)[0];
    }
    return selectorOrDOM;
}
