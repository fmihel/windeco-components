/* eslint-disable no-return-assign */
import React, {
    useEffect, useState, Suspense, useRef, lazy,
} from 'react';
import { storage } from 'fmihel-browser-lib';
import theme from '../utils/theme';

theme.set(storage.get('theme', { default: 'light' }));
const Fallback = () => (<div className="suspense">&#8987;</div>);

const groups = [
    { id: 'butttons', C: lazy(() => import('./groups/Buttons.jsx')) },
    { id: 'combos', C: lazy(() => import('./groups/Combos.jsx')) },
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
                {groups.map((it) => (('C' in it && (view === 'all' || view === it.id)) ? <Suspense key={it.id} fallback={<Fallback/>}><it.C/></Suspense> : undefined))}
            </div>
        </div>
    );
}

// const mapStateToProps = (state) => ({

// });

// export default redux.connect(mapStateToProps)(App);
export default App;
