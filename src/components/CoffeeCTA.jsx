import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import catInMug from '../assets/cat-in-mug.png';
import '../styles/CoffeeCTA.css';
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

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    const handleAboutClick = (e) => {
        e.preventDefault();
        playSelectSound();
        scrollToSection('home-about');
    };

    const handleCardClick = () => {
        setCardRotation(prev => prev + 360);
        playSelectSound();
    };

    return (
        <section className="coffee-cta-section" ref={containerRef}>
            <div className="coffee-cta-background">
                <div className="coffee-cta-glow" />
            </div>

            <div className="coffee-cta-container">
                <div className="coffee-cta-visual">
                    <motion.div 
                        className="coffee-cta-image-wrapper"
                        style={{ 
                            y: useTransform(scrollYProgress, [0, 1], [0, -100]), 
                            rotate: useTransform(scrollYProgress, [0, 1], [0, 15]), 
                            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]),
                            transformStyle: "preserve-3d"
                        }}
                        onClick={handleCardClick}
                        animate={{ rotateY: cardRotation }}
                        transition={{ 
                            rotateY: { duration: 0.8, ease: "backOut" }
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img src={catInMug} alt="Coffee cat" className="coffee-cta-image" />
                    </motion.div>
                </div>

                <div className="coffee-cta-text">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="coffee-cta-eyebrow">THANKS FOR VISITING</span>
                        <h2 className="coffee-cta-title">Let's build<br />something great.</h2>
                        <p className="coffee-cta-description">
                            I appreciate you taking the time to explore my work. If you're looking for a dedicated developer to bring your vision to life, I'm just a message away.
                        </p>

                        <div className="coffee-cta-footer">
                            <motion.a 
                                href="#home-about" 
                                className="coffee-cta-btn" 
                                onMouseEnter={playHoverSound} 
                                onClick={handleAboutClick}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>TELL ME MORE</span>
                                <Icon icon="ph:arrow-right-light" />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CoffeeCTA;

