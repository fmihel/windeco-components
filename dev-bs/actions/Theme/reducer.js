import * as consts from './consts';

const is = (action) => Object.keys(consts).indexOf(action.type) >= 0;
const reducer = (state, action) => {
    if (action.type === consts.THEME) {
        return {
            ...state,
            ui: {
                ...state.ui,
                theme: action.payload.theme || (state.ui.theme === 'dark' ? 'light' : 'dark'),
            },
        };
    }

    return state;
};

export default { is, reducer };
