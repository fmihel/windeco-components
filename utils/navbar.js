/* eslint-disable prefer-destructuring */

// данный список заполняется в NavBar.jsx
export const navbars = {};

class NavBar {
    constructor(id) {
        this.id = id;
    }

    close() {
        // console.log(this.menu);
        // this.menu.removeAttribute('expand');
        if (this.id in navbars) {
            navbars[this.id].setCollapse(true);
        }
    }

    open() {
        if (this.id in navbars) {
            navbars[this.id].setCollapse(false);
        }
    }
}

export default function navbar(id) {
    return new NavBar(id);
}
