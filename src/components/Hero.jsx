import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';
import Logo from '../assets/favicon.svg';
import { Link } from 'react-router-dom';
import { playHoverSound, playSelectSound } from '../utils/sound';
import { scrollToSection } from '../utils/scroll';

const Hero = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 150);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
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
                <div className={`hero-logo-wrapper ${isScrolled ? 'fixed-logo' : ''}`}>
                    <a href="/" onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}>
                        <img src={Logo} alt="Logo" className="logo" />
                    </a>
                </div>

                <div className="hero-content">
                    <h1 className="sr-only">Cloue Macadangdang | Front End Web Developer & Designer Portfolio</h1>
                    
                    <div className="hero-left">
                        <div className="hero-web" data-text="WEB">WEB</div>
                    </div>
                    <div className="hero-right">
                        <div className="hero-designer" data-text="DESIGNER">DESIGNER</div>
                        <div className="hero-developer" data-text="DEVELOPER">DEVELOPER</div>
                    </div>
                </div>

                <div className={`hero-nav-wrapper ${isScrolled ? 'fixed-nav' : ''}`}>
                    <nav className="site-nav">
                        <div className="nav-pill"> 
                            <Link to="/" className="nav-link active" onMouseEnter={playHoverSound} onMouseDown={playSelectSound}>Home</Link>
                            <a href="#home-projects" className="nav-link" onMouseEnter={playHoverSound} onClick={handleProjectsClick}>Projects</a>
                            <a href="#home-services" className="nav-link" onMouseEnter={playHoverSound} onClick={handleServicesClick}>Services</a>
                            <a href="#home-about" className="nav-link" onMouseEnter={playHoverSound} onClick={handleAboutClick}>About</a>
                        </div>
                    </nav>
                </div>
            </div>
        </section>
    );
};

export default Hero;
