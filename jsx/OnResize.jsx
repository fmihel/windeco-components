import React, { useEffect, useRef, useState } from 'react';

function Debug({
    className,
    currentClass,
}) {
    const [width, setWidth] = useState(false);
    const ref = useRef();
    useEffect(() => {
        const observ = new ResizeObserver(() => {
            if (ref.current) {
                setWidth(ref.current.clientWidth);
            }
        });
        observ.observe(ref.current);
        return () => {
            observ.disconnect();
        };
    }, [ref]);

    return (
        <div
            ref = {ref}
            style={{
                position: 'relative',
                fontSize: '0.8rem',
                textAlign: 'center',
                top: -10,
                paddingTop: 3,
                paddingBottom: 3,
                borderRadius: 12,
                color: 'white',
                backgroundColor: '#993d3c',
            }}>
            w:{width} class:{` ${className} ${currentClass}`}
        </div>
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
            {...debug ? { style: { border: '1px dashed #993d3c' } } : {}}
        >
            {debug ? <Debug currentClass={currentClass} className={className}/> : undefined}
            {children}
        </div>
    );
}

export default OnResize;
