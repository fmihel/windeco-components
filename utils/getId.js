let id = 0;
export default function getId(pref = 'id') {
    id++;
    const random = parseInt(Math.random() * 10000000, 10);
    return `${pref}-${random}-${id}`;
}
