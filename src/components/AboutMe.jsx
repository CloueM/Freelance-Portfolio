import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { playHoverSound, playSelectSound, playPulseSfx, playUnhoverSound, playMapSwoosh } from '../utils/sound';
import '../styles/AboutMe.css';

const customIcon = new L.divIcon({
    className: 'custom-map-marker',
    html: `
    <div class="marker-base">
      <div class="marker-ping"></div>
      <div class="marker-icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M12.5 6a4.47 4.47 0 0 1-.883 2.677L8 13.5L4.383 8.677A4.5 4.5 0 1 1 12.5 6M14 6c0 1.34-.439 2.576-1.18 3.574L8.937 14.75L8 16l-.938-1.25L3.18 9.574A6 6 0 1 1 14 6M8 8a2 2 0 1 0 0-4a2 2 0 0 0 0 4" clip-rule="evenodd"/></svg>
      </div>
    </div>
  `,
    iconSize: [50, 50],
    iconAnchor: [25, 25]
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

const CanadaFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><path fill="#FFFFFF" d="M48 6.6C43.4 3.7 37.9 2 32 2S20.6 3.7 16 6.6v50.7c4.6 2.9 10.1 4.6 16 4.6s11.4-1.7 16-4.6z" /><path fill="#D80621" d="M48 6.6v50.7c8.4-5.2 14-14.8 14-25.4s-5.6-20-14-25.3m-32 0C7.6 11.9 2 21.5 2 32s5.6 20.1 14 25.4zm26.9 25c-.4-.2-.5-.6-.4-.8l1-3.6l-3.5.7c-.1 0-.5 0-.6-.7l-.3-1.2l-2.4 2.8s-1.6 1.7-1.1-.9l1-5.5l-1.9 1c-.1 0-.5.1-1-.9L32 19l-1.8 3.3c-.5 1-.9.9-1 .9l-1.9-1l1 5.5c.5 2.6-1.1.9-1.1.9l-2.4-2.8l-.3 1.2c-.2.7-.5.7-.6.7l-3.5-.7l1 3.6c0 .3 0 .6-.4.8l-1 .6s4 3.2 5.3 4.3c.3.2.9.8.7 1.5l-.5 1.4l5.5-.8c.3 0 .9 0 .8.9l-.3 5.7h1l-.3-5.7c0-.9.6-.9.8-.9l5.5.8l-.5-1.4c-.2-.7.4-1.3.7-1.5C40 35.2 44 32 44 32z" /></svg>
);

const PhilippinesFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><path fill="#BF0D3E" d="M33 32L11.3 53.7C16.7 58.8 24 62 32 62c16.6 0 30-13.4 30-30z" /><path fill="#0032A0" d="M62 32C62 15.4 48.6 2 32 2c-8 0-15.3 3.2-20.7 8.3L33 32z" /><path fill="#FFFFFF" d="M11.3 10.3C5.6 15.8 2 23.5 2 32s3.6 16.2 9.3 21.7L33 32z" /><g fill="#FED141"><path d="m13 13.6l-.8 1.4l1.1 1.1l-1.5-.2l-.8 1.4l-.2-1.5l-1.5-.2l1.4-.8l-.2-1.5l1.1 1.1zm.2 34.4l-1.1 1.2l.8 1.3l-1.4-.6l-1.1 1.2l.2-1.6l-1.5-.6l1.6-.3l.2-1.6l.8 1.4zm17.3-16l-1.5.5V34l-1-1.2l-1.5.4l1-1.2l-1-1.2l1.5.4l1-1.2v1.5zm-6.8-1.5l-.6-.5l-6.5 1.4h.1l6.1-1.6l-.8-.5l-5.2 2l4.3-3.6l-.1-.9l-4.5 4.6h-.1l4.5-5l-.1-.7l-.7.1l-4 5.2v-.1l3.7-5.3l-.9.1l-2.7 4.9l1-5.6l-.6-.6l-.6 6.5v.1l.2-6.8l-.5-.5l-.5.5l.2 6.8v-.1l-.5-6.4l-.6.6l1 5.6l-2.7-4.9l-.9-.1l3.7 5.3v.1l-4.1-5.4l-.7-.1l-.1.7l4.5 5h-.1l-4.5-4.6l-.1.9l4.3 3.6l-5.2-2l-.7.5l6.1 1.6h.1L8.3 30l-.6.4l.4.6l6.6.9h-.1l-6.3-.6l.5.7l5.6-.1L9.2 34l-.2.9l5.7-2.8h.1l-5.9 3.2l-.2.7l.7.2l5.7-3.6v.1l-5.2 3.7l.8.2l4.2-3.7l-2.9 4.9l.4.8l2.6-5.8l.1-.1l-2.5 6.3l.3.7l.7-.3l2.1-6.5v.1L14 39.2l.8-.4l.9-5.6l.9 5.6l.8.4l-1.7-6.2v-.1l2.1 6.5l.7.3l.3-.7l-2.5-6.3l.1.1l2.6 5.8l.4-.8l-2.8-4.9l4.2 3.7l.8-.2l-5.2-3.7v-.1l5.7 3.6l.7-.2l-.2-.7l-5.9-3.2h.1l5.7 2.8l-.3-.9l-5.3-1.9l5.6.1l.5-.7l-6.3.6h-.1l6.6-.9zm-7.2 1.6" /><circle cx="15.7" cy="32" r="4.5" /></g></svg>
);

const LOCATIONS = {
    vancouver: {
        pos: [49.246292, -123.116226],
        tz: 'America/Vancouver',
        label: 'Vancouver, BC',
        sub: 'Current base',
        Flag: CanadaFlag,
        zoom: 10
    },
    philippines: {
        pos: [16.3301, 121.1710],
        tz: 'Asia/Manila',
        label: 'Nueva Vizcaya, PH',
        sub: 'Origins',
        Flag: PhilippinesFlag,
        zoom: 6
    }
};

const DynamicMapController = ({ activeLoc }) => {
    const map = useMap();
    const timeoutRef = React.useRef(null);
    const activeLocRef = React.useRef(activeLoc);

    useEffect(() => {
        activeLocRef.current = activeLoc;
    }, [activeLoc]);

    const getInitialPosition = React.useCallback(() => {
        const loc = LOCATIONS[activeLocRef.current];
        const zoom = loc.zoom;
        const targetPoint = map.project(loc.pos, zoom);
        const size = map.getSize();

        const isDesktop = window.innerWidth >= 1024;
        const offsetX = isDesktop ? -size.x * 0.25 : 0;
        const offsetY = !isDesktop ? -size.y * 0.24 : 0;

        const finalPoint = L.point(
            Math.round(targetPoint.x + offsetX),
            Math.round(targetPoint.y + offsetY)
        );
        return { center: map.unproject(finalPoint, zoom), zoom };
    }, [map]);

    const handleResize = React.useCallback(() => {
        map.invalidateSize();
        const { center, zoom } = getInitialPosition();
        map.setView(center, zoom, { animate: false });
    }, [map, getInitialPosition]);

    const resetToInitial = React.useCallback(() => {
        const { center, zoom } = getInitialPosition();

        const currentCenter = map.getCenter();
        const dist = map.project(currentCenter, zoom).distanceTo(map.project(center, zoom));

        if (dist > 1) {
            map.flyTo(center, zoom, {
                duration: 2.5,
                easeLinearity: 0.25
            });
        }
    }, [map, getInitialPosition]);

    useEffect(() => {
        const { center, zoom } = getInitialPosition();
        map.flyTo(center, zoom, {
            duration: 2.5,
            easeLinearity: 0.25
        });
    }, [activeLoc, getInitialPosition]);

    useEffect(() => {
        const startTimer = () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(resetToInitial, 1000);
        };

        const onMoveStart = (e) => {

            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };

        const onMoveEnd = () => {
            startTimer();
        };

        map.on('movestart', onMoveStart);
        map.on('moveend', onMoveEnd);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            map.off('movestart', onMoveStart);
            map.off('moveend', onMoveEnd);
        };
    }, [map, resetToInitial]);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    return null;
};

const AboutMe = () => {
    const [activeLoc, setActiveLoc] = useState('vancouver');
    const [time, setTime] = useState(new Date());
    const [sectionVisible, setSectionVisible] = useState(false);
    const sectionRef = React.useRef(null);
    const pulseIntervalRef = React.useRef(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setSectionVisible(true);
            } else {
                setSectionVisible(false);
            }
        }, { threshold: 0.05 });

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
            clearInterval(timer);
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    // Synchronize pulse sound with both visibility and location switching
    useEffect(() => {
        if (sectionVisible) {
            // Play immediately on scroll-in or location toggle
            playPulseSfx();

            if (pulseIntervalRef.current) clearInterval(pulseIntervalRef.current);
            pulseIntervalRef.current = setInterval(() => {
                playPulseSfx();
            }, 2500);
        } else {
            if (pulseIntervalRef.current) clearInterval(pulseIntervalRef.current);
        }

        return () => {
            if (pulseIntervalRef.current) clearInterval(pulseIntervalRef.current);
        };
    }, [sectionVisible, activeLoc]);

    const localTime = new Intl.DateTimeFormat('en-US', {
        timeZone: LOCATIONS[activeLoc].tz,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    }).format(time);

    const localDayDate = new Intl.DateTimeFormat('en-US', {
        timeZone: LOCATIONS[activeLoc].tz,
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    }).format(time);

    return (
        <section
            ref={sectionRef}
            className={`about-me-section ${sectionVisible ? 'section-visible' : ''}`}
        >
            <div className="about-me-immersive-container">

                { }
                <div className="about-map-bg">
                    <MapContainer
                        center={LOCATIONS['vancouver'].pos}
                        zoom={10}
                        minZoom={4}
                        maxBounds={[[-85, -180], [85, 180]]}
                        maxBoundsViscosity={1.0}
                        scrollWheelZoom={false}
                        touchZoom={true}
                        zoomControl={false}
                        attributionControl={false}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                            className="dark-map-tiles"
                            keepBuffer={8}
                            updateWhenIdle={false}
                            updateWhenZooming={false}
                        />
                        <Marker
                            key={`${activeLoc}-${sectionVisible}`}
                            position={LOCATIONS[activeLoc].pos}
                            icon={customIcon}
                        />
                        <DynamicMapController activeLoc={activeLoc} />
                        <CtrlScrollZoom />
                    </MapContainer>
                </div>

                { }
                <div className="about-content-overlay">
                    <div className="about-content-inner">
                        <div className="about-intro-block">
                            <h2 className="about-greeting">Hi, I'm Cloue.</h2>
                            <p className="about-main-desc">
                                I'm a designer and developer based in Vancouver. I build websites that look great and actually work. My focus is on making sure your site is fast, easy to use, and helps your business get noticed.
                            </p>
                        </div>

                        <div className="about-details-stack">
                            <div className="about-detail-item">
                                <span className="detail-label">My approach</span>
                                <p>A good website should be as reliable as it is beautiful. Because I have a background in technical systems, I build sites that don't just look good on the surface. They are stable, fast, and ready for whatever comes next.</p>
                            </div>

                            <div className="about-detail-item">
                                <span className="detail-label">The technical side</span>
                                <p>I understand the web from the inside out. I don't just design the surface; I make sure everything behind the scenes is secure and built on a solid foundation that lasts.</p>
                            </div>

                            <div className="about-detail-item">
                                <span className="detail-label">Education</span>
                                <div className="edu-list">
                                    <div className="edu-row" onMouseEnter={playHoverSound}>
                                        <div className="edu-logo-wrapper">
                                            <img src="/images/BCIT-Logo.webp" alt="BCIT" className="edu-logo" />
                                        </div>
                                        <div className="edu-content">
                                            <div className="edu-header">
                                                <span className="edu-year">2025</span>
                                                <p>Front End Web Development, BCIT</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="edu-row" onMouseEnter={playHoverSound}>
                                        <div className="edu-logo-wrapper">
                                            <img src="/images/BCIT-Logo.webp" alt="BCIT" className="edu-logo" />
                                        </div>
                                        <div className="edu-content">
                                            <div className="edu-header">
                                                <span className="edu-year">2022</span>
                                                <p>Computer Information Technology, BCIT</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="about-footer">
                            <div className="social-links-minimal">
                                <a href="https://www.linkedin.com/in/cloue-macadangdang" target="_blank" rel="noopener noreferrer" onMouseEnter={playHoverSound} onMouseLeave={playUnhoverSound} aria-label="LinkedIn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" /></svg>
                                </a>
                                <a href="mailto:hello@kurowii.com" onMouseEnter={playHoverSound} onMouseLeave={playUnhoverSound} aria-label="Email">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                { }
                <div className="map-location-card-floating">
                    <div className="location-card-header">
                        <div className="location-toggle-group">
                            <button
                                className={`location-toggle-btn ${activeLoc === 'vancouver' ? 'active' : ''}`}
                                onClick={() => { setActiveLoc('vancouver'); playMapSwoosh(); }}
                                onMouseEnter={playHoverSound}
                            >
                                Base
                            </button>
                            <button
                                className={`location-toggle-btn ${activeLoc === 'philippines' ? 'active' : ''}`}
                                onClick={() => { setActiveLoc('philippines'); playMapSwoosh(); }}
                                onMouseEnter={playHoverSound}
                            >
                                Origins
                            </button>
                        </div>
                        <div className="header-flag-wrapper">
                            {React.createElement(LOCATIONS[activeLoc].Flag)}
                        </div>
                    </div>

                    <div className="location-card-body">
                        <div className="location-time-section">
                            <div className="time-live-indicator">
                                <span className="live-dot"></span>
                                Live
                            </div>
                            <span className="time-value">{localTime}</span>
                        </div>

                        <div className="location-meta">
                            <span className="location-tag">{LOCATIONS[activeLoc].label}</span>
                            <span className="location-subtext">{LOCATIONS[activeLoc].sub}</span>
                            <span className="time-date-label">{localDayDate}</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutMe;
