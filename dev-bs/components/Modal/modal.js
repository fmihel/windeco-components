import bootstrap from 'bootstrap/dist/js/bootstrap';
import modalData from './data';

const modal = (id, options = {}) => new Promise((ok, err) => {
    const dom = document.getElementById(id);
    modalData.id = id;
    modalData.dialog = new bootstrap.Modal(dom, options);
    modalData.ok = ok;
    modalData.err = err;
    modalData.dialog.show();
});

export default modal;
