import React, { useState } from 'react';
import Logo from '../assets/favicon.svg';
import { playHoverSound, playSelectSound, playStartSound } from '../utils/sound';
import '../styles/SplashScreen.css';

const SplashScreen = ({ onStart }) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleStartClick = () => {
        playStartSound();
        setIsClosing(true);
        setTimeout(() => {
            onStart();
        }, 1000);
    };

    return (
        <div className={`splash-screen ${isClosing ? 'fade-out' : ''}`}>
            <div className="splash-content">
                <img src={Logo} alt="Cloue Mac Logo" className="splash-logo" />
                <button 
                    className="start-button" 
                    onClick={handleStartClick}
                    onMouseEnter={playHoverSound}
                    onFocus={playHoverSound}
                    onMouseDown={playSelectSound}
                >
                    START
                </button>
            </div>
        </div>
    );
};

export default SplashScreen;
