import React, { useState, useEffect } from 'react';
import './Hero.css';
import Logo from '../assets/favicon.svg';
import { playNavHoverAbout, playNavHoverProjects, playNavHoverServices, playNavClickSwoosh, playSelectSound, playHoverSound } from '../utils/sound';
import { scrollToSection } from '../utils/scroll';

const Hero = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        const sectionIds = ['home', 'home-services', 'home-projects', 'home-about'];
        const observers = [];

        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px', 
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.target.id === 'home') {
                        setActiveSection('');
                    } else {
                        setActiveSection(entry.target.id);
                    }
                } else {
                    
                    setActiveSection(prev => prev === entry.target.id ? '' : prev);
                }
            });
        }, observerOptions);

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const handleProjectsClick = (e) => {
        e.preventDefault();
        playNavClickSwoosh();
        scrollToSection('home-projects');
    };

    const handleServicesClick = (e) => {
        e.preventDefault();
        playNavClickSwoosh();
        scrollToSection('home-services');
    };

    const handleAboutClick = (e) => {
        e.preventDefault();
        playNavClickSwoosh();
        scrollToSection('home-about');
    };

    return (
        <section id="home" className="hero-section">
            <div className="hero-container">

                <div
                    className={`hero-logo-wrapper ${isScrolled ? 'fixed-logo' : ''}`}
                >
                    <a href="/" className="logo-link" onMouseEnter={playHoverSound} onClick={(e) => { e.preventDefault(); playSelectSound(); window.location.href = '/'; }}>
                        <img src={Logo} alt="Logo" className="logo" />
                        <div className="availability-indicator">
                            <span className="indicator-dot"></span>
                        </div>
                    </a>
                    <div className="availability-status">
                        <span className="status-text">Available for work</span>
                    </div>
                </div>

                <div className="hero-content">
                    <h1 className="sr-only">Kurowii | Creative Developer &amp; UI/UX Designer — High-Performance Website Upgrades, Custom React Development, and Digital Solutions for Businesses &amp; Startups.</h1>

                    <div className="hero-left">
                        <div className="hero-web" data-text="WEB">WEB</div>
                    </div>
                    <div className="hero-right">
                        <div className="hero-designer" data-text="DESIGNER">DESIGNER</div>
                        <div className="hero-developer" data-text="DEVELOPER">DEVELOPER</div>
                    </div>
                </div>

                <div
                    className={`hero-nav-wrapper ${isScrolled ? 'fixed-nav' : ''}`}
                >
                    <nav className="site-nav">
                        <div className="nav-pill">
                            <a href="#home-services" className={`nav-link ${activeSection === 'home-services' ? 'active' : ''}`} onMouseEnter={playNavHoverServices} onClick={handleServicesClick}>
                                <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                                <span className="nav-text">Services</span>
                            </a>
                            <a href="#home-projects" className={`nav-link ${activeSection === 'home-projects' ? 'active' : ''}`} onMouseEnter={playNavHoverProjects} onClick={handleProjectsClick}>
                                <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                                </svg>
                                <span className="nav-text">Projects</span>
                            </a>
                            <a href="#home-about" className={`nav-link ${activeSection === 'home-about' ? 'active' : ''}`} onMouseEnter={playNavHoverAbout} onClick={handleAboutClick}>
                                <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                <span className="nav-text">About</span>
                            </a>
                        </div>
                    </nav>
                </div>

            </div>
        </section>
    );
};

export default Hero;

