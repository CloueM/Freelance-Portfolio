import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playHoverSound, playSelectSound } from '../utils/sound';
import '../styles/ScrollCTA.css';

const ScrollCTA = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 8500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleClick = () => {
    if (isScrolled) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const projectsSection = document.getElementById('home-projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="scroll-cta-container"
          initial={{ opacity: 0, y: 20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <button 
            className={`scroll-cta-btn ${isScrolled ? 'scrolled' : ''}`}
            onClick={handleClick}
            onMouseEnter={playHoverSound}
            onMouseDown={playSelectSound}
          >
            <span className="scroll-cta-text">
              {isScrolled ? 'BACK TO TOP' : 'SCROLL DOWN'}
            </span>
            <div className="scroll-cta-icon">
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={isScrolled ? 'rotate-180' : ''}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollCTA;
