import DOM from './DOM';

export default function childDOM(selector, startFromDOM = false) {
    if (typeof selector === 'string') {
        const dom = DOM(selector, startFromDOM);
        if (dom) {
            return dom.children;
        }
    } else {
        return selector.children;
    }
    return [];
}
