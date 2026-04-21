import React from 'react';
import catInMug from '../assets/cat-in-mug.png';
import '../styles/CoffeeCTA.css';
import { playHoverSound, playSelectSound } from '../utils/sound';
import { scrollToSection } from '../utils/scroll';

const CoffeeCTA = () => {
    const handleAboutClick = (e) => {
        e.preventDefault();
        playSelectSound();
        scrollToSection('home-about');
    };

    return (
        <section className="coffee-cta-section">
            <div className="coffee-cta-container">
                <div className="coffee-cta-header">
                    <div className="coffee-cta-image-wrapper">
                        <img src={catInMug} alt="Cat in a mug decoration" className="coffee-cta-image" />
                    </div>
                    <h2 className="coffee-cta-title">Thanks for Stopping By</h2>
                </div>
                <div className="coffee-cta-content">
                    <p className="coffee-cta-description">
                        I appreciate you taking the time to view my portfolio. There is more to see in my projects and about sections. If you have any questions or want to connect, my inbox is always open.
                    </p>
                    <a href="#home-about" className="coffee-cta-btn" onMouseEnter={playHoverSound} onClick={handleAboutClick}>
                        ABOUT ME
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CoffeeCTA;
