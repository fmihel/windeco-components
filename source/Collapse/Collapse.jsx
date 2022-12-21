import React, {
    useEffect, useRef, useState,
} from 'react';
import collapse from '../Utils/collapse';

function Collapse({
    className = Collapse.global.className,
    addClass = Collapse.global.addClass,
    style = Collapse.global.style,
    expand = true,
    delay = Collapse.global.delay,
    children,
}) {
    const dom = useRef(null);
    const [position, setPosition] = useState('fixed');
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (dom && dom.current) {
            if (expand) {
                collapse(dom.current, {
                    close: false,
                    onStart() {
                        setPosition(false);
                        setShow(true);
                    },
                    delay,
                });
            } else {
                collapse(dom.current, {
                    close: true,
                    onStop() {
                        setShow(false);
                        setPosition('fixed');
                    },
                });
            }
        }
    }, [expand, dom, delay]);

    return (
        <>{(expand || show)
            && <div
                ref={dom}
                className={`${className} ${addClass}`}
                style={{
                    ...Collapse.global.style,
                    ...style,
                    ...(position ? { position, opacity: 0 } : { position: 'static' }),
                }}
            >
                {children}
            </div>}
        </>
    );
}
Collapse.global = {
    className: '',
    addClass: '',
    style: {},
    delay: 200,

};

export default Collapse;
