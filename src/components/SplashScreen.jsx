import React, { useState, useEffect } from 'react';
import Logo from '../assets/favicon.svg';
import { playHoverSound, playSelectSound, playStartSound } from '../utils/sound';
import '../styles/SplashScreen.css';

const SplashScreen = ({ onStart }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let startTime = null;
        const duration = 2500;

        const animateLoading = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const runtime = timestamp - startTime;
            
            const rawProgress = Math.min((runtime / duration) * 100, 100);
            
            const easedProgress = rawProgress === 100 ? 100 : 100 * (1 - Math.pow(1 - rawProgress / 100, 3));

            setProgress(Math.round(easedProgress));

            if (runtime < duration) {
                requestAnimationFrame(animateLoading);
            } else {
                setTimeout(() => setIsLoaded(true), 400);
            }
        };

        requestAnimationFrame(animateLoading);
    }, []);

    const handleStartClick = () => {
        playStartSound();
        setIsClosing(true);
        setTimeout(() => {
            onStart();
        }, 1000);
    };

    const circumference = 2 * Math.PI * 50;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className={`splash-screen ${isClosing ? 'fade-out' : ''}`}>
            <div className="splash-content-unified">
                <div className={`top-area ${isLoaded ? 'fade-out-slow' : ''}`}>
                    <div className="loading-text">{progress}%</div>
                </div>

                <div className="center-area">
                    <svg className={`loading-circle-svg ${isLoaded ? 'morph-out' : ''}`} width="140" height="140" viewBox="0 0 140 140">
                        <circle 
                            className="loading-circle-bg" 
                            cx="70" cy="70" r="50" 
                        />
                        <circle 
                            className="loading-circle-progress" 
                            cx="70" cy="70" r="50"
                            style={{ strokeDashoffset, strokeDasharray: circumference }}
                        />
                    </svg>
                    
                    <img src={Logo} alt="Cloue Mac Logo" className={`splash-logo-morph ${isLoaded ? 'visible' : ''}`} />
                </div>

                <div className={`bottom-area ${isLoaded ? 'fade-in-slow' : ''}`}>
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
        </div>
    );
};

export default SplashScreen;
