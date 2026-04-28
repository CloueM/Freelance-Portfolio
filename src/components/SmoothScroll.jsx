import React, { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScroll = ({ children, isLocked = false }) => {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        if (isLocked) {
            lenis.stop();
        } else {
            lenis.start();
        }

        let rafId;
        function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        const handleAnchorClick = (e) => {
            const href = e.currentTarget.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    e.preventDefault();
                    lenis.scrollTo(targetElement, {
                        offset: 0,
                        duration: 1.2,
                        easing: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
                    });
                }
            }
        };

        const anchors = document.querySelectorAll('a[href^="#"]');
        anchors.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));

        window.lenis = lenis;

        return () => {
            lenis.destroy();
            window.lenis = null;
            cancelAnimationFrame(rafId);
            anchors.forEach(anchor => anchor.removeEventListener('click', handleAnchorClick));
        };
    }, [isLocked]);

    return <>{children}</>;
};

export default SmoothScroll;
