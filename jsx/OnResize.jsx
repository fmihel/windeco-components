import React, { useEffect, useRef, useState } from 'react';
import abs from './Utils/abs';

function Debug({
    className,
    currentClass,
}) {
    const [width, setWidth] = useState(false);
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);

    const ref = useRef();
    useEffect(() => {
        const observ = new ResizeObserver(() => {
            if (ref.current) {
                const pos = abs(ref.current);
                setTop(pos.y);
                setLeft(pos.x);
                setWidth(ref.current.clientWidth);
            }
        });
        observ.observe(ref.current);
        return () => {
            observ.disconnect();
        };
    }, [ref]);
    const style = {
        fontSize: '0.8rem',
        color: 'white',
        backgroundColor: '#993d3c',
    };
    return (
        <>
            <div
                ref = {ref}
                style={{
                    ...style,
                    position: 'relative',
                    textAlign: 'center',
                    paddingTop: 3,
                    paddingBottom: 3,
                    borderRadius: 12,

                }}>
                w:{width} class:{` ${className} ${currentClass}`}
            </div>

            <div
                style={{
                    ...style,
                    padding: 10,
                    left: 10,
                    top: 10,
                    position: 'absolute',
                    zIndex: 1000,
                }}
            >
                <div>w:{width}</div>
                <div>class:{` ${className} ${currentClass}`}</div>
            </div>
        </>
    );
}
function OnResize({
    id = false,
    className = '',
    rules = [], // [{width,className}] [{width:0,className:'def1'},{width:100,className:'def2}] || (({width})=> { return 'className'} )
    debug = false,
    children,
}) {
    const ref = useRef();
    const [currentClass, setCurrentClass] = useState('');
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const observ = new ResizeObserver(() => {
            if (ref.current) {
                const width = ref.current.clientWidth;
                // setWidth(ref.current.clientWidth);
                let findClass = false;

                if (typeof rules === 'function') {
                    findClass = rules({ width });
                } else {
                    for (let i = 0; i < rules.length; i++) {
                        const current = rules[i];
                        const next = i < rules.length - 1 ? rules[i + 1] : false;
                        if (current.width <= width && (!next || width < next.width)) {
                            findClass = current.className;
                            break;
                        }
                    }
                }
                if (findClass !== false && currentClass !== findClass) {
                    // console.log('currentClass', currentClass, 'find', findClass);
                    setCurrentClass(findClass);
                }
                setOpacity(1);
            }
        });
        observ.observe(ref.current);
        return () => {
            observ.disconnect();
        };
    }, [ref]);
    return (
        <div
            {...id ? { id } : {}}
            ref = {ref}
            { ...(className || currentClass) ? { className: `${className} ${currentClass}` } : ''}
            // {...debug ? { style: { border: '1px dashed #993d3c' } } : {}}
            style={{ opacity, ...(debug ? { border: '1px dashed #993d3c' } : {}) } }
        >
            {debug ? <Debug currentClass={currentClass} className={className}/> : undefined}
            {children}
        </div>
    );
}

export default OnResize;
