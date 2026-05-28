import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import './CatchyBanner.css';

const CatchyBanner = () => {
    const containerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse positions relative to the viewport (fixed overlay)
    const mouseX = useMotionValue(-200);
    const mouseY = useMotionValue(-200);

    // Spring physics for smooth organic mouse follower tracking
    const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    // Toggle global custom cursor visibility
    useEffect(() => {
        if (isHovered && window.innerWidth > 768) {
            document.body.classList.add('hide-global-cursor');
        } else {
            document.body.classList.remove('hide-global-cursor');
        }
        return () => {
            document.body.classList.remove('hide-global-cursor');
        };
    }, [isHovered]);

    return (
        <section 
            ref={containerRef}
            className="catchy-banner-section"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                mouseX.set(-200);
                mouseY.set(-200);
            }}
        >
            <div className="catchy-banner-container">
                <h2 className="catchy-banner-text">
                    MAKING GOOD SHIT <br />
                    <span className="text-stroke">SINCE 2022</span>
                </h2>
            </div>

            <AnimatePresence>
                {isHovered && window.innerWidth > 768 && (
                    <motion.div
                        className="banner-custom-cursor"
                        style={{
                            left: cursorX,
                            top: cursorY,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                        <div className="cursor-content">
                            <span>HIDING BAD SHIT</span>
                            <span className="cursor-small">SINCE 2022</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default CatchyBanner;
