import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';
import Logo from '../assets/favicon.svg';
import { Link } from 'react-router-dom';
import { playHoverSound, playSelectSound } from '../utils/sound';

const Hero = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Stick to top after scrolling 150px down
            setIsScrolled(window.scrollY > 150);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initialize on mount

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="home" className="hero-section">
            <div className="hero-container">
                <div className={`hero-logo-wrapper ${isScrolled ? 'fixed-logo' : ''}`}>
                    <a href="/" onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}>
                        <img src={Logo} alt="Logo" className="logo" />
                    </a>
                </div>

                <div className="hero-content">
                    {/* Hidden H1 for SEO optimization */}
                    <h1 className="sr-only">Cloue Macadangdang | Front End Web Developer & Designer Portfolio</h1>
                    
                    <div className="hero-left">
                        <div className="hero-web">WEB</div>
                    </div>
                    <div className="hero-right">
                        <div className="hero-designer">DESIGNER</div>
                        <div className="hero-developer">DEVELOPER</div>
                    </div>
                </div>

                <div className={`hero-nav-wrapper ${isScrolled ? 'fixed-nav' : ''}`}>
                    <nav className="site-nav">
                        <div className="nav-pill"> 
                            <Link to="/" className="nav-link active" onMouseEnter={playHoverSound} onMouseDown={playSelectSound}>Home</Link>
                            <Link to="/projects" className="nav-link" onMouseEnter={playHoverSound} onMouseDown={playSelectSound}>Projects</Link>
                            <Link to="/about" className="nav-link" onMouseEnter={playHoverSound} onMouseDown={playSelectSound}>About</Link>
                        </div>
                    </nav>
                </div>
            </div>
        </section>
    );
};

export default Hero;
