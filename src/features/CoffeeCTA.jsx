import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import catInMug from '../assets/cat-in-mug.png';
import './CoffeeCTA.css';
import { playHoverSound, playSelectSound } from '../utils/sound';
import { scrollToSection } from '../utils/scroll';
import { Icon } from '@iconify/react';

const CoffeeCTA = () => {
    const containerRef = useRef(null);
    const [cardRotation, setCardRotation] = React.useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const rotate = useTransform(scrollYProgress, [0, 1], [-5, 10]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);

    const handleContactClick = (e) => {
        e.preventDefault();
        playSelectSound();
        window.dispatchEvent(new Event('open-assistant'));
    };

    const handleCardClick = () => {
        setCardRotation(prev => prev + 360);
        playSelectSound();
    };

    return (
        <section className="coffee-cta-section" ref={containerRef}>
            <div className="coffee-cta-background">
                <div className="coffee-cta-glow-primary" />
                <div className="coffee-cta-glow-secondary" />
            </div>

            <div className="coffee-cta-container">
                <div className="coffee-cta-visual">
                    <motion.div
                        className="coffee-cta-image-wrapper"
                        style={{ y, rotate, scale, transformStyle: "preserve-3d" }}
                        onClick={handleCardClick}
                        animate={{ rotateY: cardRotation }}
                        transition={{ rotateY: { duration: 0.8, ease: "backOut" } }}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.94 }}
                        title="Click me!"
                    >
                        <img src={catInMug} alt="A cozy cat in a coffee mug" className="coffee-cta-image" />
                        <div className="coffee-cta-image-hint">
                            <Icon icon="ph:hand-tap-light" width="16" />
                            <span>Click me</span>
                        </div>
                    </motion.div>
                </div>

                <div className="coffee-cta-text">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-80px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="coffee-cta-eyebrow">Thanks for stopping by</span>
                        <h2 className="coffee-cta-title">Let's work<br /><span className="coffee-cta-title-accent">together.</span></h2>
                        <p className="coffee-cta-description">
                            I am currently open to freelance projects and contract work. If you have a project in mind, need a developer to bring your designs to life, or just want to discuss custom web solutions, I would love to hear from you.
                        </p>

                        <div className="coffee-cta-actions">
                            <motion.a
                                href="mailto:hello@kurowii.com"
                                className="coffee-cta-btn coffee-cta-btn-primary"
                                onMouseEnter={playHoverSound}
                                onClick={playSelectSound}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Icon icon="ph:envelope-simple-light" width="18" />
                                <span>Say hello</span>
                            </motion.a>

                            <motion.button
                                className="coffee-cta-btn coffee-cta-btn-secondary"
                                onMouseEnter={playHoverSound}
                                onClick={handleContactClick}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Icon icon="ph:chat-circle-dots-light" width="18" />
                                <span>Ask the AI</span>
                            </motion.button>
                        </div>

                        <div className="coffee-cta-note">
                            <Icon icon="ph:map-pin-light" width="14" />
                            <span>Based in Vancouver, BC · Open to remote & hybrid</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CoffeeCTA;
