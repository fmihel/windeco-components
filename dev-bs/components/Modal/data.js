const modalData = {

    dialog: undefined,
    ok: undefined,
    err: undefined,
    close() {
        modalData.dialog.hide();
    },
};

export default modalData;
