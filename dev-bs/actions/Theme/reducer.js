import $ from 'jquery';
import * as consts from './consts';

const is = (action) => Object.keys(consts).indexOf(action.type) >= 0;
const reducer = (state, action) => {
    if (action.type === consts.THEME) {
        const theme = action.payload.theme || (state.ui.theme === 'dark' ? 'light' : 'dark');
        const html = $('html').removeClass('light').removeClass('dark');
        html.addClass(theme);

        console.log('html', html);

        return {
            ...state,
            ui: {
                ...state.ui,
                theme,
            },
        };
    }

    return state;
};

export default { is, reducer };
