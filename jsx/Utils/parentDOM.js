/**
 * Возвращает объект родительский DOM с использованием селектора
 * @param {string|DOM} selector - строка запроса '#xxx'  '.xxx'  'xxx' , или объект DOM от которого ищем родителя
 * @param {DOM|false} parentDOM - родительский элемент в котором будет поиск
 * @return DOM or null
 */
export default function parentDOM(selector, _parentDOM = false) {
    try {
        if (typeof selector === 'string') {
            const dom = DOM(selector, _parentDOM);
            if (dom) {
                return dom.parentNode;
            }
        } else {
            return selector.parentNode;
        }
    } catch (e) {
        console.error('parentDOM', e);
    }
    return null;
}
