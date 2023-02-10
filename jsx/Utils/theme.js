class Theme {
    constructor() {
        this.themes = ['dark', 'light'];
        this.default = 'light';
    }

    get() {
        let out = this.default;

        const html = document.documentElement;

        const { themes } = this;

        html.className.split(' ').find((name) => {
            const idx = themes.indexOf(name);

            if (idx >= 0) {
                out = themes[idx];
                return true;
            }

            return false;
        });

        return out;
    }

    toggle(defalt = 'light') {
        const current = this.get();

        let theme = defalt;

        if (current) {
            let index = this.themes.indexOf(current);

            if (index >= 0) {
                index += 1;

                if (index >= this.themes.length) index = 0;

                theme = this.thems[index];
            }
        }

        this.set(theme);
    }

    set(theme) {
        const html = document.documentElement;

        const { themes } = this;

        const clear = html.className.split(' ').filter((name) => (!(themes.indexOf(name) >= 0))).join(' ').trim();
        if (theme !== this.default) {
            html.className = clear + (clear ? ' ' : '') + theme;
        } else {
            html.className = clear;
        }
    }

    addClass(name) {
        const html = document.documentElement;
        if (html.className.split(' ').indexOf(name) === -1) {
            html.className = `${html.className.trim()} ${name}`;
        }
    }

    removeClass(name) {
        const html = document.documentElement;
        html.className = html.className.split(' ').filter((it) => (it !== name)).join(' ').trim();
    }

    haveClass(name) {
        const html = document.documentElement;
        return html.className.split(' ').indexOf(name) >= 0;
    }
}

export default new Theme();
