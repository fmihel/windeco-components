import DOM from './DOM';

export default function childDOM(selector, startFromDOM = false) {
    const out = [];
    let childs = [];

    if (typeof selector === 'string') {
        const dom = DOM(selector, startFromDOM);
        if (dom) {
            childs = dom.children;
        }
    } else {
        childs = selector.children;
    }

    if (childs) {
        for (let i = 0; i < childs.length; i++) {
            out.push(childs[i]);
        }
    }
    return out;
}
