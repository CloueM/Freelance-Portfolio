import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Hero from './Hero';
import ProjectItem from './ProjectItem';
import AboutMe from './AboutMe';
import CoffeeCTA from './CoffeeCTA';
import PageTransition from './PageTransition';
import { projectsData } from '../data/projects';
import { playHoverSound, playSelectSound } from '../utils/sound';
import { scrollToSection } from '../utils/scroll';

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash === '#home-projects') {
            setTimeout(() => {
                scrollToSection('home-projects');
            }, 100);
        } else if (location.hash === '#home-about') {
            setTimeout(() => {
                scrollToSection('home-about');
            }, 100);
        }
    }, [location]);

    // Display all projects
    const projects = projectsData;

    return (
        <PageTransition>
            <main>
                <Hero />
                
                <div id="home-projects" className="home-projects-section">
                    <div className="section-header" style={{ padding: '4rem var(--layout-margin) 2rem', backgroundColor: 'var(--color-charcoal)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h2 style={{ color: 'var(--color-off-white)', margin: 0, fontSize: 'var(--text-h2)', textAlign: 'center' }}>PROJECTS</h2>
                    </div>
                    {projects.map(project => (
                        <ProjectItem key={project.id} project={project} />
                    ))}
                </div>

                <div id="home-about">
                    <AboutMe />
                </div>

                <CoffeeCTA />
            </main>
        </PageTransition>
    );
};

export default Home;
