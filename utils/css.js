/* eslint-disable no-param-reassign */

class Css {
    /** добавить несколько классов в DOM */
    addClass(dom, ...classNames) {
        let all = dom.className.trim();
        const classes = all.split(' ');
        // eslint-disable-next-line array-callback-return
        classNames.map((cls) => {
            if (classes.indexOf(cls) === -1) {
                all = `${all} ${cls}`;
                classes.push(cls);
            }
        });
        dom.className = all.trim();
    }

    /** удалить класс DOM */
    removeClass(dom, ...classNames) {
        dom.className = dom.className.split(' ').filter((it) => (classNames.indexOf(it) === -1)).join(' ').trim();
    }

    /** признак, что клас установлен */
    haveClass(dom, className) {
        return dom.className.split(' ').indexOf(className) >= 0;
    }

    /** добавляет если нет и удаляет если есть */
    toggleClass(dom, className) {
        if (this.haveClass(dom, className)) {
            this.removeClass(dom, className);
        } else {
            this.addClass(dom, className);
        }
    }

    /** если bool == true добаляет список классов classesOnTrue и удаляет classesOnFalse
     *  если bool == false добаляет список классов classesOnFalse и удаляет classesOnTrue
     */
    switchClass(dom, bool, classesOnTrue, classesOnFalse = []) {
        if (bool) {
            this.removeClass(dom, ...classesOnFalse);
            this.addClass(dom, ...classesOnTrue);
        } else {
            this.removeClass(dom, ...classesOnTrue);
            this.addClass(dom, ...classesOnFalse);
        }
    }

    /** список классов как массив */
    classes(dom) {
        return dom.className.split(' ');
    }
}

export default new Css();
