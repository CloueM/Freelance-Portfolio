import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';
import Logo from '../assets/favicon.svg';
import { playHoverSound, playSelectSound } from '../utils/sound';
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

        // Intersection Observer for active section highlighting
        const sectionIds = ['home-services', 'home-projects', 'home-about'];
        const observers = [];

        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px', // Trigger when section is in middle of screen
            threshold: 0
        };

        const handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);
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
        playSelectSound();
        scrollToSection('home-projects');
    };

    const handleServicesClick = (e) => {
        e.preventDefault();
        playSelectSound();
        scrollToSection('home-services');
    };

    const handleAboutClick = (e) => {
        e.preventDefault();
        playSelectSound();
        scrollToSection('home-about');
    };

    return (
        <section id="home" className="hero-section">
            <div className="hero-container">

                <div
                    className={`hero-logo-wrapper ${isScrolled ? 'fixed-logo' : ''}`}
                >
                    <a href="/" onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}>
                        <img src={Logo} alt="Logo" className="logo" />
                    </a>
                </div>

                <div className="hero-content">
                    <h1 className="sr-only">Cloue Macadangdang | Front End Web Developer &amp; Designer Portfolio</h1>

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
                            <a href="#home-services" className={`nav-link ${activeSection === 'home-services' ? 'active' : ''}`} onMouseEnter={playHoverSound} onClick={handleServicesClick}>Services</a>
                            <a href="#home-projects" className={`nav-link ${activeSection === 'home-projects' ? 'active' : ''}`} onMouseEnter={playHoverSound} onClick={handleProjectsClick}>Projects</a>
                            <a href="#home-about" className={`nav-link ${activeSection === 'home-about' ? 'active' : ''}`} onMouseEnter={playHoverSound} onClick={handleAboutClick}>About</a>
                        </div>
                    </nav>
                </div>

            </div>
        </section>
    );
};

export default Hero;
