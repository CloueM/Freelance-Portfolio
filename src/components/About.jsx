import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';
import Logo from '../assets/favicon.svg';
import { Link } from 'react-router-dom';
import AboutMe from './AboutMe';
import FAQ from './FAQ';
import { playHoverSound, playSelectSound } from '../utils/sound';
import PageTransition from './PageTransition';

const About = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 150);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <PageTransition>
            <div>
                <section id="about" className="hero-section">
                    <div className="hero-container">
                        <div className={`hero-logo-wrapper ${isScrolled ? 'fixed-logo' : ''}`}>
                            <a href="/" onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}>
                                <img src={Logo} alt="Logo" className="logo" />
                            </a>
                        </div>

                        <div className="hero-content">
                            <div className="hero-left">
                                <h1 className="hero-web" data-text="HEY">HEY</h1>
                            </div>
                            <div className="hero-right">
                                <h1 className="hero-designer" data-text="I AM">I AM</h1>
                                <h1 className="hero-developer" data-text="CLOUE MAC">CLOUE MAC</h1>
                            </div>
                        </div>

                        <div className={`hero-nav-wrapper ${isScrolled ? 'fixed-nav' : ''}`}>
                            <nav className="site-nav">
                                <div className="nav-pill">
                                    <Link to="/" className="nav-link" onMouseEnter={playHoverSound} onMouseDown={playSelectSound}>Home</Link>
                                    <Link to="/projects" className="nav-link" onMouseEnter={playHoverSound} onMouseDown={playSelectSound}>Projects</Link>
                                    <Link to="/about" className="nav-link active" onMouseEnter={playHoverSound} onMouseDown={playSelectSound}>About</Link>
                                </div>
                            </nav>
                        </div>
                    </div>
                </section>

                <AboutMe />
                <FAQ />
            </div>
        </PageTransition>
    );
};

export default About;
