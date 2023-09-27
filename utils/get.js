export default function get(data, arrayOfName, defalt = false) {
    let obj = data;

    if (obj === undefined) {
        return defalt;
    }

    try {
        let nameOrIndex;
        if (arrayOfName.length) {
            for (let i = 0; i < arrayOfName.length; i++) {
                nameOrIndex = obj[arrayOfName[i]];
                if (nameOrIndex === undefined) {
                    return defalt;
                }
                obj = nameOrIndex;
            }
            return obj;
        }
    } catch (e) {
        return defalt;
    }
    return defalt;
}
