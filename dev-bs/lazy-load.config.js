import { loadCSS, imports } from 'fmihel-lazy-load';
// глобальные настройки для отложенной загрузки css
loadCSS.param = {
    ...loadCSS.param,
    hash: CSS_HASH,
    root: CSS_ROOT_PATH,
    enable: CSS_LAZY_LOAD_ENABLE,
};

// регистрация модулей к отложенной загрузке
imports.add({
    _() { return import('lodash').then((mod) => mod.default); },
    $() { return import('jquery').then((mod) => mod.default); },
});
