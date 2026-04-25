import React, { useState, useEffect } from 'react';
import '../styles/ScrollCTA.css';
import { playHoverSound, playSelectSound } from '../utils/sound';

function ScrollCTA() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScrollEvent() {
      if (window.scrollY > 300) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScrollEvent);
    return function() {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  function handleClickScroll() {
    if (isScrolled === true) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const section = document.getElementById('home-projects');
      if (section) {
        section.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  }

  let scrollButtonClass = "scroll-cta-btn";
  if (isScrolled === true) {
    scrollButtonClass = "scroll-cta-btn scrolled";
  }

  return (
    <div className="scroll-cta-container">
      <button className={scrollButtonClass} onClick={handleClickScroll} onMouseEnter={playHoverSound} onMouseDown={playSelectSound} aria-label={isScrolled ? "Scroll to top" : "Scroll down"}>
        {isScrolled === false ? (
          <>
            <span className="scroll-cta-text">SCROLL DOWN</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </>
        ) : (
          <>
            <span className="scroll-cta-text">BACK TO TOP</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </>
        )}
      </button>
    </div>
  );
}

export default ScrollCTA;

