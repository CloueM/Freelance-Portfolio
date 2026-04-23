import React, { useState, useEffect } from 'react';
import Logo from '../assets/favicon.svg';
import { playHoverSound, playSelectSound, playStartSound } from '../utils/sound';
import '../styles/SplashScreen.css';

// --- Tile Pre-fetcher ---
// Converts lat/lon to tile X coordinate
const lon2tile = (lon, zoom) => Math.floor((lon + 180) / 360 * Math.pow(2, zoom));
// Converts lat/lon to tile Y coordinate
const lat2tile = (lat, zoom) => Math.floor(
    (1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI)
    / 2 * Math.pow(2, zoom)
);

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png';
const SUBDOMAINS = ['a', 'b', 'c', 'd'];

// Pre-fetches all tiles within a bounding box at a given zoom level
const prefetchRegion = (minLat, maxLat, minLon, maxLon, zoom) => {
    const xMin = lon2tile(minLon, zoom);
    const xMax = lon2tile(maxLon, zoom);
    const yMin = lat2tile(maxLat, zoom); // Note: y is inverted
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
    // Vancouver region — zoom 10 (metro view, matching default zoom)
    prefetchRegion(48.9, 49.6, -123.6, -122.6, 10);
    // Vancouver region — zoom 11 (city-level for when user zooms in)
    prefetchRegion(49.0, 49.5, -123.4, -122.8, 11);

    // Philippines — zoom 6 (whole country view)
    prefetchRegion(4.0, 22.0, 114.0, 128.0, 6);
    // Nueva Vizcaya zoomed in — zoom 9
    prefetchRegion(15.5, 17.5, 120.0, 122.5, 9);
};

const SplashScreen = ({ onStart }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Start pre-fetching tiles immediately in the background
        prefetchAllTiles();

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
