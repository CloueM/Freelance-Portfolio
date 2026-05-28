import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

const SmoothScroll = ({ children, isLocked = false }) => {
    const lenisRef = useRef(null);

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

        lenisRef.current = lenis;
        window.lenis = lenis;

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

        return () => {
            lenis.destroy();
            window.lenis = null;
            cancelAnimationFrame(rafId);
            anchors.forEach(anchor => anchor.removeEventListener('click', handleAnchorClick));
        };
    }, []);

    useEffect(() => {
        const lenis = lenisRef.current;
        if (!lenis) return;

        const preventDefault = (e) => {
            e.preventDefault();
        };

        const preventDefaultForScrollKeys = (e) => {
            const keys = { 32: 1, 33: 1, 34: 1, 35: 1, 36: 1, 37: 1, 38: 1, 39: 1, 40: 1 };
            if (keys[e.keyCode]) {
                e.preventDefault();
                return false;
            }
        };

        if (isLocked) {
            window.scrollTo(0, 0);
            lenis.scrollTo(0, { immediate: true });
            lenis.stop();

            window.addEventListener('wheel', preventDefault, { passive: false });
            window.addEventListener('touchmove', preventDefault, { passive: false });
            window.addEventListener('keydown', preventDefaultForScrollKeys, { passive: false });

            document.documentElement.classList.add('scroll-locked');
            document.body.classList.add('scroll-locked');
        } else {
            lenis.start();

            document.documentElement.classList.remove('scroll-locked');
            document.body.classList.remove('scroll-locked');
        }

        return () => {
            window.removeEventListener('wheel', preventDefault);
            window.removeEventListener('touchmove', preventDefault);
            window.removeEventListener('keydown', preventDefaultForScrollKeys);
        };
    }, [isLocked]);

    return <>{children}</>;
};

export default SmoothScroll;
