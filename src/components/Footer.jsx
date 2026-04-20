import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/favicon.svg';
import '../styles/Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

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
                            <Link to="/about" className="footer-link">About</Link>
                            <Link to="/projects" className="footer-link">Projects</Link>
                        </div>
                        <div className="footer-nav-group">
                            <h3 className="footer-label">Connect</h3>
                            <a href="https://www.linkedin.com/in/cloue-macadangdang" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
                            <a href="https://github.com/CloueM" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
                            <a href="mailto:hello@kurowii.com" target="_blank" rel="noopener noreferrer" className="footer-link">Email</a>
                        </div>
                    </nav>
                </div>
                <div className="footer-bottom">
                    <div className="footer-info">
                        <p className="copyright">
                            © {currentYear} CLOUE MACADANGDANG
                        </p>
                        <p className="music-credit">
                            MUSIC: <a href="https://www.youtube.com/watch?v=laZusNy8QiY" target="_blank" rel="noopener noreferrer">HAGGSTROM BY C418</a>
                        </p>
                    </div>
                    <div className="footer-tagline">
                        THANK YOU FOR VISITING
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
