export default function DOM(selectorOrDOM, startFromDOM = false) {
    const own = startFromDOM || document;
    if (typeof selectorOrDOM === 'string') {
        if (selectorOrDOM[0] === '#') {
            console.log(own.getElementById(selectorOrDOM.substring(1)));
            return own.getElementById(selectorOrDOM.substring(1));
        } if (selectorOrDOM[0] === '.') {
            return own.getElementsByClassName(selectorOrDOM.substring(1))[0];
        }
        return own.getElementsByTagName(selectorOrDOM)[0];
    }
    return selectorOrDOM;
}
