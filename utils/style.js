/** возвращает style как свойство для react только в том случае если буду каки-либо значения в нем
 * Ex:
 * <ReactXXX {...style({background,color})} />
 * аналогично
 * <ReactXXX {
 *      {... background || color ? { style: { ...background ? { background } : {}, ...color ? { color } : {} } } : {}}
 * } />
*/
export default (...objs) => {
    let style = {};
    objs.map((obj) => {
        style = { ...style, ...obj };
    });
    return Object.keys(style).length === 0 ? {} : { style };
};
