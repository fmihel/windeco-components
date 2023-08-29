/** возвращает новый объект/массив перебрав все его элементы/свойства
 * поочередно передавая их в callback и используя результат для замены
*/
const map = (o, callback) => {
    if (Array.isArray(o)) {
        return o.map((val, index) => callback(val, index));
    } if (typeof o === 'object') {
        const keys = Object.keys(o);
        const out = {};
        keys.map((key) => {
            out[key] = callback(o[key], key);
        });
        return out;
    }
    throw Error('List.map(a,..) a is array or object');
};

export default map;
