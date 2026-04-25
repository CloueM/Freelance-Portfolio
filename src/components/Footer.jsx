import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/favicon.svg';
import '../styles/Footer.css';
import { scrollToSection } from '../utils/scroll';
import { playSelectSound } from '../utils/sound';

const Footer = () => {
    const currentYear = new Date().getFullYear();

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
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <img src={logo} alt="Logo" className="footer-logo" />
                    </div>
                    <nav className="footer-nav">
                        <div className="footer-nav-group">
                            <h3 className="footer-label">Navigation</h3>
                            <Link to="/" className="footer-link">Home</Link>
                            <a href="#home-about" className="footer-link" onClick={handleAboutClick}>About</a>
                            <a href="#home-projects" className="footer-link" onClick={handleProjectsClick}>Projects</a>
                            <a href="#home-services" className="footer-link" onClick={handleServicesClick}>Services</a>
                        </div>
                        <div className="footer-nav-group">
                            <h3 className="footer-label">Connect</h3>
                            <a href="https://www.linkedin.com/in/cloue-macadangdang" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
                            <a href="mailto:hello@kurowii.com" target="_blank" rel="noopener noreferrer" className="footer-link">Email</a>
                        </div>
                    </nav>
                </div>
                <div className="footer-bottom">
                    <div className="footer-info">
                        <p className="copyright">
                            © {currentYear} Cloue Macadangdang
                        </p>
                        <p className="music-credit">
                            Music: <a href="https://www.youtube.com/watch?v=laZusNy8QiY" target="_blank" rel="noopener noreferrer">Haggstrom by C418</a>
                        </p>
                    </div>
                    <div className="footer-tagline">
                        Thank you for visiting
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

