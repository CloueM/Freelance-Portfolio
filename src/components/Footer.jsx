import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/favicon.svg';
import '../styles/Footer.css';
import { scrollToSection } from '../utils/scroll';
import { playSelectSound, playHoverSound } from '../utils/sound';
import { Icon } from '@iconify/react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const handleLinkClick = (e, sectionId) => {
        e.preventDefault();
        playSelectSound();
        scrollToSection(sectionId);
    };

    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <img src={logo} alt="Logo" className="footer-logo" />
                        <div className="footer-status">
                            <span className="status-dot"></span>
                            <span>AVAILABLE FOR PROJECTS</span>
                        </div>
                    </div>
                    
                    <div className="footer-main-content">
                        <div className="footer-nav">
                            <div className="footer-nav-group">
                                <h3 className="footer-label">SITEMAP</h3>
                                <a href="#home-about" className="footer-link" onMouseEnter={playHoverSound} onClick={(e) => handleLinkClick(e, 'home-about')}>ABOUT</a>
                                <a href="#home-projects" className="footer-link" onMouseEnter={playHoverSound} onClick={(e) => handleLinkClick(e, 'home-projects')}>PROJECTS</a>
                                <a href="#home-services" className="footer-link" onMouseEnter={playHoverSound} onClick={(e) => handleLinkClick(e, 'home-services')}>SERVICES</a>
                            </div>
                            
                            <div className="footer-nav-group">
                                <h3 className="footer-label">SOCIALS</h3>
                                <a href="https://www.linkedin.com/in/cloue-macadangdang" target="_blank" rel="noopener noreferrer" className="footer-link" onMouseEnter={playHoverSound} onMouseDown={playSelectSound}>LINKEDIN</a>
                                <a href="https://github.com/CloueM" target="_blank" rel="noopener noreferrer" className="footer-link" onMouseEnter={playHoverSound} onMouseDown={playSelectSound}>GITHUB</a>
                                <a href="https://www.instagram.com/clo.mcz/" target="_blank" rel="noopener noreferrer" className="footer-link" onMouseEnter={playHoverSound} onMouseDown={playSelectSound}>INSTAGRAM</a>
                            </div>

                            <div className="footer-nav-group">
                                <h3 className="footer-label">CONTACT</h3>
                                <a href="mailto:hello@kurowii.com" className="footer-link" onMouseEnter={playHoverSound} onMouseDown={playSelectSound}>HELLO@KUROWII.COM</a>
                                <span className="footer-location">VANCOUVER, BC</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-left">
                        <p className="copyright">© {currentYear} @ CLOUE MACADANGDANG</p>
                        <p className="music-credit">
                            MUSIC: <a href="https://www.youtube.com/watch?v=laZusNy8QiY" target="_blank" rel="noopener noreferrer">HAGGSTROM BY C418</a>
                        </p>
                    </div>
                    <div className="footer-bottom-right">
                        <span className="footer-time">LOCAL TIME: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                        <div className="footer-designer-credit">DESIGNED & BUILT BY CLOUE</div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

