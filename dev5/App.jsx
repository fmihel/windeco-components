/* eslint-disable no-return-assign */
import React, {
    useEffect, useState, Suspense, lazy,
} from 'react';
import { storage } from 'fmihel-browser-lib';
import theme from '../utils/theme';
import ErrorBound from './groups/ErrorBound.jsx';

theme.set(storage.get('theme', { default: 'light' }));
const Fallback = () => (<div className="suspense">&#8987;</div>);
const groups = [
    { id: 'Butttons', C: lazy(() => import('./groups/Buttons.jsx')) },
    { id: 'Combos', C: lazy(() => import('./groups/Combos.jsx')) },
    { id: 'Edits', C: lazy(() => import('./groups/Edits.jsx')) },
];

function App({}) {
    const [view, setView] = useState('none');
    useEffect(() => {
        const sel = storage.get('select', { default: 'none' });
        setView(sel);
    }, []);
    const doChangeTheme = () => {
        theme.toggle();
        const current = theme.get();
        storage.set('theme', current);
    };
    const doSelect = (o) => {
        setView(o.target.value);
        storage.set('select', o.target.value);
    };
    return (
        <div frame=''>
            <div panel=''>
                <button onClick={doChangeTheme} >theme</button>
                <select name="groups" onChange={doSelect} value={view}>
                    {[{ id: 'none' }, { id: 'all' }, ...groups].map((it) => <option
                        key={it.id}
                        value={it.id}
                    >
                        {it.id}
                    </option>)
                    }
                </select>
            </div>
            <div content=''>
                {groups.map((it) => (('C' in it && (view === 'all' || view === it.id)) ? <Suspense
                    key={it.id}
                    fallback={<Fallback/>
                    }>
                    <ErrorBound caption={it.id}><it.C/></ErrorBound>

                </Suspense> : undefined))}
            </div>
        </div>
    );
}

// const mapStateToProps = (state) => ({

// });

// export default redux.connect(mapStateToProps)(App);
export default App;
