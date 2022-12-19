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
            html.className = (clear ? ' ' : '') + theme;
        } else {
            html.className = clear;
        }
    }
}

export default new Theme();
