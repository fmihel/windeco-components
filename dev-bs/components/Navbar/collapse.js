import bootstrap from 'bootstrap/dist/js/bootstrap';

function collapse(param = {}) {
    const p = {
        ...collapse.global,
        ...param,
    };
    if (p.need === true || (typeof p.need === 'function' && p.need())) { // only for large container :(
        const dom = document.getElementById(p.id);
        const def = new bootstrap.Collapse(dom, { toggle: true });
    }
}
// if (JX.screen().w < 992)

collapse.global = {
    id: 'navbarSupportedContent',
    need() { return window.innerWidth < 992; }, // can be a function
};

export default collapse;
