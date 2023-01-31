import absPos from '../Utils/abs';
import screen from '../Utils/screen';
import DOM from '../Utils/DOM';
import isMobile from '../Utils/isMobile';
import global from '../global';

class ModalDialogAPI {
    static margin(margin) {
        const isObject = (typeof (margin) === 'object');
        return {
            left: isObject ? (margin.left || 0) : margin,
            right: isObject ? (margin.right || 0) : margin,
            top: isObject ? (margin.top || 0) : margin,
            bottom: isObject ? (margin.bottom || 0) : margin,
        };
    }

    static updatePos({
        first = false,
        pos = {
            left: 0, top: 0, width: 0, height: 0,
        },
        left, top, width, height,
        align = 'stretch',
        draggable = true,
        resizable = true,
        stickTo = undefined,
        stickOffX = 0,
        stickOffY = 0,
        stickAlign = 'bottom',
        margin = {
            left: 0, right: 0, top: 0, bottom: 0,
        },
    }) {
        const scr = screen();

        if (align === 'stretch') {
            const cmargin = ModalDialogAPI.margin(margin);

            return {
                left: cmargin.left,
                top: cmargin.top,
                width: scr.width - (cmargin.left + cmargin.right),
                height: scr.height - (cmargin.top + cmargin.bottom),
            };
        }
        if (align === 'custom') {
            let out = {
                left, top, width, height,
            };

            if (!first) {
                if (draggable || resizable) {
                    out = { ...out, ...pos };
                }
            }
            return out;
        }
        if (align === 'stickTo') {
            const dom = DOM(typeof stickTo === 'string' ? `#${stickTo}`.replace('##', '#') : stickTo);

            const out = { width, height };
            if (stickAlign === 'bottom') {
                const abs = absPos(dom);
                out.left = abs.x + abs.w / 2 - width / 2 + stickOffX;
                out.top = abs.y + abs.h + stickOffY;
                if (out.left + out.width > scr.width) out.left = scr.width - out.width;
                if (out.left < 0) out.left = 0;
                if (out.top + out.height > scr.height) out.top = abs.y - out.height - stickOffY;
                if (out.top < 0) out.top = 0;
            } else if (stickAlign === 'left') { // left
                const abs = absPos(dom);
                out.left = abs.x + abs.w + stickOffX;
                out.top = abs.y + stickOffY;
                if ((out.left + out.width) > scr.width) out.left = abs.x - out.width - stickOffX;
                if (out.left < 0) out.left = 0;
                if (out.top + out.height > scr.height) out.top = abs.y - out.height;
                if (out.top < 0) out.top = 0;
            } else if (stickAlign === 'popup') {
                const abs = absPos(dom);
                out.left = abs.x + abs.w + stickOffX;
                out.top = abs.y + stickOffY;
                if ((out.left + out.width) > scr.width) out.left = abs.x - out.width - stickOffX;
                if (out.left < 0) out.left = 0;
                if (out.top + out.height > scr.height) out.top = abs.y - out.height;

                if (out.top < 32) {
                    out.top = abs.y + abs.h + stickOffY;
                    out.left = abs.x + stickOffX;
                    if (out.left + out.width > scr.width) out.left = scr.width - out.width;
                }
            } else if (stickAlign === 'screen-right-all') {
                out.left = scr.width - width;
                out.width = width;
                out.top = stickOffY;
                out.height = scr.height - stickOffY;
            }

            return out;
        }

        return {
            left: 10, top: 10, width: 200, height: 200,
        };
    }

    /** преобразование многотипизированного параетра mobile в объект
     *  значения mobile
     *  large , middle , small, {top|center|bottom:INT,[width:INT]}
     *  @returns { {pos,size,width} }
     */
    static mobileToObject(mobile) {
        if (mobile === 'large') {
            return { pos: 'center', size: 100, width: 100 };
        } if (mobile === 'middle') {
            return { pos: 'center', size: 60, width: 100 };
        } if (mobile === 'small') {
            return { pos: 'center', size: 30, width: 80 };
        } if (mobile === false) {
            return { pos: false, size: false, width: false };
        }
        const pos = Object.keys(mobile).find((it) => ['center', 'top', 'bottom'].indexOf(it) !== -1);
        return {
            pos,
            size: mobile[pos],
            width: mobile.width || 100,
        };
    }

    static updatePosMobile(pos, size, width) {
        const out = {
            left: 0, top: 0, width: 0, height: 0,
        };

        const scr = screen();
        const margin = (scr.width * 1) / 100;

        if (width === 100 || isMobile() || scr.width < global.wd_min_mobile_width) {
            out.left = margin;
            out.width = scr.width - margin * 2 - 2;
        } else {
            out.width = (scr.width * width) / 100;
            out.left = (scr.width - out.width) / 2;
        }

        out.height = size === 100 ? (scr.height - 2 * margin - 2) : (scr.height * size) / 100;

        if (pos === 'center') {
            out.top = size === 100 ? margin : (scr.height - out.height) / 2;
        } else if (pos === 'top') {
            out.top = margin;
        } else if (pos === 'bottom') {
            out.top = scr.height - out.height - margin;
        }

        return out;
    }

    static getFooterParam(key, paramName, footer) {
        let param = {
            key,
            id: undefined,
            caption: key,
            onClick: undefined,
            addClass: '',
        };
        if (!Array.isArray(footer)) {
            if (typeof footer[key] === 'function') {
                param.onClick = footer[key];
            } else {
                param = { ...param, ...footer[key] };
            }
        }
        return param[paramName];
    }
}

export default ModalDialogAPI;
