import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { playHoverSound, playSelectSound } from '../utils/sound';
import '../styles/AboutMe.css';

const customIcon = new L.divIcon({
    className: 'custom-map-marker',
    html: `
    <div class="marker-content">
      <div class="marker-dot-container">
        <div class="marker-ping"></div>
        <div class="marker-dot"></div>
      </div>
      <span class="marker-label">Vancouver</span>
    </div>
  `,
    iconSize: [140, 40],
    iconAnchor: [70, 20]
});

const CtrlScrollZoom = () => {
    const map = useMap();
    useEffect(() => {
        const container = map.getContainer();
        const handleWheel = (e) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                if (!map.scrollWheelZoom.enabled()) {
                    map.scrollWheelZoom.enable();
                }
            } else {
                if (map.scrollWheelZoom.enabled()) {
                    map.scrollWheelZoom.disable();
                }
            }
        };
        container.addEventListener('wheel', handleWheel, { passive: false, capture: true });
        return () => container.removeEventListener('wheel', handleWheel, { capture: true });
    }, [map]);
    return null;
};

const DynamicMapController = () => {
    const map = useMap();
    const timeoutRef = React.useRef(null);

    const getInitialPosition = React.useCallback(() => {
        const vancouver = [49.246292, -123.116226];
        const zoom = 11;
        const vancouverPoint = map.project(vancouver, zoom);
        const size = map.getSize();
        
        const offsetX = window.innerWidth >= 769 ? -size.x * 0.25 : 0;
        const offsetY = window.innerWidth < 769 ? size.y * 0.25 : 0;
        
        const targetPoint = vancouverPoint.add([offsetX, offsetY]);
        return map.unproject(targetPoint, zoom);
    }, [map]);

    const handleResize = React.useCallback(() => {
        map.invalidateSize();
        const target = getInitialPosition();
        map.setView(target, 11, { animate: false });
    }, [map, getInitialPosition]);

    const resetToInitial = React.useCallback(() => {
        const target = getInitialPosition();
        map.flyTo(target, 11, {
            duration: 2,
            easeLinearity: 0.25
        });
    }, [map, getInitialPosition]);

    useEffect(() => {
        const startTimer = () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(resetToInitial, 3000);
        };

        const onMoveStart = () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };

        const onMoveEnd = () => {
            startTimer();
        };

        map.on('movestart', onMoveStart);
        map.on('moveend', onMoveEnd);

        // Initial setup
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            map.off('movestart', onMoveStart);
            map.off('moveend', onMoveEnd);
            window.removeEventListener('resize', handleResize);
        };
    }, [map, handleResize, resetToInitial]);

    return null;
};

const AboutMe = () => {
    return (
        <section className="about-me-section">

            <div className="about-me-map-bg">
                <MapContainer
                    center={[49.246292, -123.116226]}
                    zoom={11}
                    minZoom={11}
                    maxBounds={[[-90, -180], [90, 180]]}
                    maxBoundsViscosity={1.0}
                    scrollWheelZoom={false}
                    zoomControl={false}
                    attributionControl={false}
                    style={{ height: '100%', width: '100%' }}
                >
                    <CtrlScrollZoom />
                    <DynamicMapController />
                    <TileLayer
                        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                        className="dark-map-tiles"
                    />
                    <Marker position={[49.246292, -123.116226]} icon={customIcon} />
                </MapContainer>
            </div>

            <div className="about-me-container">

                <div className="about-me-left">
                    <h2 className="about-me-greeting">Hello, I'm Cloue</h2>
                    <div className="about-me-description">
                        <p>
                            I’m a front-end developer and web designer, but my foundation is actually in IT infrastructure.
                        </p>
                        <p>
                            From 2022 to 2024, I completed the Computer Information Technology (CIT) diploma at BCIT. It was a heavy, hands-on program focused on the backend of tech. I spent two years working directly with Linux servers, enterprise networking, databases, and Python. It taught me exactly how systems communicate under the hood.
                        </p>
                        <p>
                            However, I realized I really wanted to build the things people actually see and interact with. To make that switch, I completed the Front-End Web Developer Certificate, also at BCIT. That program allowed me to focus purely on the user-facing side of the web, spending my time strictly on React, JavaScript, advanced CSS, and modern web platforms like WordPress and Shopify.
                        </p>
                        <p>
                            Having both of these backgrounds completely changes how I work. Because of my IT diploma, I care just as much about how a codebase is organized, optimized, and deployed as I do about how a button feels on hover.
                        </p>
                        <p>
                            Today, my focus is on the front-end, designing clean UI in Figma, shipping production ready React apps, and developing high-performance web solutions, built with an understanding of how they run from the server to the screen.
                        </p>
                    </div>

                    <div className="about-me-socials">
                        <p className="socials-title">Social Links</p>
                        <div className="socials-row">
                            <a
                                href="https://www.linkedin.com/in/cloue-macadangdang"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label="LinkedIn"
                                onMouseEnter={playHoverSound}
                                onClick={playSelectSound}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" /></svg>
                                <span className="social-label">LinkedIn</span>
                            </a>
                            <a
                                href="mailto:hello@kurowii.com"
                                className="social-link"
                                aria-label="Email"
                                onMouseEnter={playHoverSound}
                                onClick={playSelectSound}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z" /></svg>
                                <span className="social-label">Email</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="about-me-right-empty"></div>

            </div>
        </section>
    );
};

export default AboutMe;
