import { useRef } from "react";

export default function TapHandler({
    children,
    classes,
    onDoubleTap,
    onDoubleClick = null,
}) {
    const lastTapRef = useRef(0);
    const timeoutRef = useRef(null);

    const handleTap = () => {
        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;

        if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
            clearTimeout(timeoutRef.current);
            onDoubleTap();
        } /*  else {
            // POTENCIÁLIS SINGLE TAP
            timeoutRef.current = setTimeout(() => {
                alert("Egyszeri kattintás történt!");
            }, DOUBLE_TAP_DELAY);
        } */

        lastTapRef.current = now;
    };

    return (
        <>
            {!onDoubleClick ? (
                <div onTouchEnd={handleTap} className={classes}>
                    {children}
                </div>
            ) : (
                <div onDoubleClick={onDoubleClick} onTouchEnd={handleTap} className={classes}>
                    {children}
                </div>
            )}
        </>
    );
}
