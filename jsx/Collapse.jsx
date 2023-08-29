import React, {
    useEffect, useRef, useState,
} from 'react';
import collapse from '../utils/collapse';

export default function Collapse({
    className = Collapse.global.className,
    style = Collapse.global.style,
    expand = true,
    delay = Collapse.global.delay,
    attr = {},
    children,
}) {
    const dom = useRef(null);
    const [position, setPosition] = useState('fixed');
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (dom && dom.current) {
            if (expand) {
                collapse({
                    dom: dom.current,
                    close: false,
                    onStart() {
                        setPosition(false);
                        setShow(true);
                    },
                    delay,
                });
            } else {
                collapse({
                    dom: dom.current,
                    close: true,
                    delay,
                    onStop() {
                        setShow(false);
                        setPosition('fixed');
                    },
                });
            }
        }
    }, [expand, dom, delay]);
    const css = `${className}`;

    return (
        <>{(expand || show)
            && <div
                ref={dom}
                {...(css ? { className: css } : {})}
                style={{
                    ...Collapse.global.style,
                    ...style,
                    ...(position ? { position, opacity: 0 } : { }),
                }}
                {...attr}
            >
                {children}
            </div>}
        </>
    );
}
Collapse.global = {
    className: '',
    style: {},
    delay: 100,

};
