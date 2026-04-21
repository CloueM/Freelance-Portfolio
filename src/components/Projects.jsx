import React, { useState, useEffect } from 'react';
import '../styles/Projects.css';
import Logo from '../assets/favicon.svg';
import { Link } from 'react-router-dom';
import ProjectItem from './ProjectItem';
import { projectsData } from '../data/projects';
import CoffeeCTA from './CoffeeCTA';
import { playHoverSound, playSelectSound } from '../utils/sound';

const Projects = () => {
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
        <div className="projects-page">
            <section id="projects" className="projects-section">
                <div className="projects-container">
                    <div className={`projects-logo-wrapper ${isScrolled ? 'fixed-logo' : ''}`}>
                        <a href="/" onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}>
                            <img src={Logo} alt="Logo" className="logo" />
                        </a>
                    </div>

                    <div className="projects-content">
                        <h1 className="projects-title" data-text="PROJECTS">PROJECTS</h1>
                    </div>

                    <div className={`projects-nav-wrapper ${isScrolled ? 'fixed-nav' : ''}`}>
                        <nav className="site-nav">
                            <div className="nav-pill">
                                <Link to="/" className="nav-link" onMouseEnter={playHoverSound} onMouseDown={playSelectSound}>Home</Link>
                                <Link to="/projects" className="nav-link active" onMouseEnter={playHoverSound} onMouseDown={playSelectSound}>Projects</Link>
                                <Link to="/about" className="nav-link" onMouseEnter={playHoverSound} onMouseDown={playSelectSound}>About</Link>
                            </div>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Projects List Section */}
            <div className="projects-list-container">
                {projectsData.map((project) => (
                    <ProjectItem key={project.id} project={project} />
                ))}
            </div>

            <CoffeeCTA />
        </div>
    );
};

export default Projects;
