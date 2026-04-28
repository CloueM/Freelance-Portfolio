import React, { useState, useEffect } from 'react';
import { playHoverSound, playSelectSound, playStartSound, playIntroSound } from '../utils/sound';
import './SplashScreen.css';

const lon2tile = (lon, zoom) => Math.floor((lon + 180) / 360 * Math.pow(2, zoom));

const lat2tile = (lat, zoom) => Math.floor(
    (1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI)
    / 2 * Math.pow(2, zoom)
);

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png';
const SUBDOMAINS = ['a', 'b', 'c', 'd'];

const prefetchRegion = (minLat, maxLat, minLon, maxLon, zoom) => {
    const xMin = lon2tile(minLon, zoom);
    const xMax = lon2tile(maxLon, zoom);
    const yMin = lat2tile(maxLat, zoom);
    const yMax = lat2tile(minLat, zoom);

    for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
            const s = SUBDOMAINS[(x + y) % SUBDOMAINS.length];
            const url = TILE_URL.replace('{s}', s).replace('{z}', zoom).replace('{x}', x).replace('{y}', y);
            const img = new Image();
            img.src = url;
        }
    }
};

const prefetchAllTiles = () => {

    prefetchRegion(48.9, 49.6, -123.6, -122.6, 10);

    prefetchRegion(49.0, 49.5, -123.4, -122.8, 11);

    prefetchRegion(4.0, 22.0, 114.0, 128.0, 6);

    prefetchRegion(15.5, 17.5, 120.0, 122.5, 9);
};

const SplashScreen = ({ onStart, onIntroEnd, onAudioInit }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const prefetchTimeout = setTimeout(prefetchAllTiles, 3500);

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
                setTimeout(() => {
                    setIsLoaded(true);
                }, 400);
            }
        };

        requestAnimationFrame(animateLoading);

        return () => clearTimeout(prefetchTimeout);
    }, []);

    const handleStartClick = () => {
        playStartSound();
        const introAudio = playIntroSound(onIntroEnd);
        if (onAudioInit) onAudioInit(introAudio);
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

                    <img src="/favicon.svg" alt="Cloue Mac Logo" fetchpriority="high" className={`splash-logo-morph ${isLoaded ? 'visible' : ''}`} />
                </div>

                <div className={`bottom-area ${isLoaded ? 'fade-in-slow' : ''}`}>
                    <div className="sound-reminder">
                        <svg className="sound-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                        </svg>
                        <span>Sound recommended for the best experience</span>
                    </div>
                    <button
                        className="start-button"
                        onClick={handleStartClick}
                        onMouseEnter={playHoverSound}
                        onFocus={playHoverSound}
                        onMouseDown={playSelectSound}
                    >
                        START EXPERIENCE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;

