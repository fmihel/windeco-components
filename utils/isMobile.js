import MobileDetected from 'mobile-detect';

let detect;
let isMobile = false;
export default () => {
    // const agents = [/Android/i, /BlackBerry/i, /iPhone/i, /iPad/i, /iPod/i, /Opera Mini/i, /IEMobile/i];
    // return !!agents.find((agent) => navigator.userAgent.match(agent));
    if (detect === undefined) {
        detect = new MobileDetected(window.navigator.userAgent);
        isMobile = (!!detect.mobile()) && (!detect.tablet());
    }

    return isMobile;
};
