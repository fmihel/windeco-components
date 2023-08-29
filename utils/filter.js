/** возвращает новый объект/массив отфильтровав его значения или свойства
 * с помощью callback
 * */
const filter = (o, callback) => {
    if (Array.isArray(o)) {
        return o.filter((p, i) => callback(p, i));
    } if (typeof o === 'object') {
        const keys = Object.keys(o);
        const out = {};
        keys.map((key) => {
            const res = callback(o[key], key);
            if (res) out[key] = res;
        });
        return out;
    }
    throw Error('List.map(a,..) a is array or object');
};

export default filter;
