import { useState, useEffect, useRef } from 'react';

export const useDraggablePip = (containerRef) => {
    const [pipPos, setPipPos] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStartRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging || window.innerWidth > 768 || !containerRef.current) return;
            
            let rawX = e.clientX - dragStartRef.current.x;
            let rawY = e.clientY - dragStartRef.current.y;

            const areaRect = containerRef.current.getBoundingClientRect();
            const pipWidth = 120;
            const pipHeight = 160;

            const initialX = window.innerWidth - 15 - pipWidth;
            const initialY = 80;

            const currentViewportX = initialX + rawX;
            const currentViewportY = initialY + rawY;

            const clampedViewportX = Math.max(areaRect.left, Math.min(currentViewportX, areaRect.right - pipWidth));
            const clampedViewportY = Math.max(areaRect.top, Math.min(currentViewportY, areaRect.bottom - pipHeight));

            setPipPos({
                x: clampedViewportX - initialX,
                y: clampedViewportY - initialY
            });
        };

        const handleMouseUp = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, containerRef]);

    const handleTouchStart = (e) => {
        if (!containerRef.current) return;
        const touch = e.touches[0];
        setIsDragging(true);
        dragStartRef.current = {
            x: touch.clientX - pipPos.x,
            y: touch.clientY - pipPos.y
        };
    };

    const handleTouchMove = (e) => {
        if (!isDragging || !containerRef.current) return;
        const touch = e.touches[0];
        
        let rawX = touch.clientX - dragStartRef.current.x;
        let rawY = touch.clientY - dragStartRef.current.y;

        const areaRect = containerRef.current.getBoundingClientRect();
        const pipWidth = 120;
        const pipHeight = 160;

        const initialX = window.innerWidth - 15 - pipWidth;
        const initialY = 80;

        const currentViewportX = initialX + rawX;
        const currentViewportY = initialY + rawY;

        const clampedViewportX = Math.max(areaRect.left, Math.min(currentViewportX, areaRect.right - pipWidth));
        const clampedViewportY = Math.max(areaRect.top, Math.min(currentViewportY, areaRect.bottom - pipHeight));

        setPipPos({
            x: clampedViewportX - initialX,
            y: clampedViewportY - initialY
        });
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    return {
        pipPos,
        setPipPos,
        isDragging,
        dragHandlers: {
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd
        }
    };
};
