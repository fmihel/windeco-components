import absPos from '../Utils/abs';
import screen from '../Utils/screen';
import DOM from '../Utils/DOM';

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
            const dom = DOM(`#${stickTo}`.replace('##', '#'));
            const abs = absPos(dom);
            console.log('dom', stickTo, abs);
            const out = { width, height };
            if (stickAlign === 'bottom') {
                out.left = abs.x + abs.w / 2 - width / 2 + stickOffX;
                out.top = abs.y + abs.h + stickOffY;
                if (out.left + out.width > scr.w) out.left = scr.w - out.width;
                if (out.left < 0) out.left = 0;
                if (out.top + out.height > scr.h) out.top = abs.y - out.height - stickOffY;
                if (out.top < 0) out.top = 0;
            } else { // left
                out.left = abs.x + abs.w + stickOffX;
                out.top = abs.y + stickOffY;
                if (out.left + out.width > scr.w) out.left = abs.x - out.width - stickOffX;
                if (out.left < 0) out.left = 0;
                if (out.top + out.height > scr.h) out.top = abs.y - out.height;
                if (out.top < 0) out.top = 0;
            }

            return out;
        }

        return {
            left: 10, top: 10, width: 200, height: 200,
        };
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
