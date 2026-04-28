import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './Hero';
import Process from './Process';
import ProjectItem from './ProjectItem';
const Services = React.lazy(() => import('./Services'));
const AboutMe = React.lazy(() => import('./AboutMe'));
const FAQ = React.lazy(() => import('./FAQ'));
import CoffeeCTA from './CoffeeCTA';
import Marquee from './Marquee';
import PageTransition from './PageTransition';
import { projectsData } from '../data/projects';
import { scrollToSection } from '../utils/scroll';

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash === '#home-process') {
            setTimeout(() => {
                scrollToSection('services-process');
            }, 100);
        } else if (location.hash === '#home-projects') {
            setTimeout(() => {
                scrollToSection('home-projects');
            }, 100);
        } else if (location.hash === '#home-services') {
            setTimeout(() => {
                scrollToSection('home-services');
            }, 100);
        } else if (location.hash === '#home-about') {
            setTimeout(() => {
                scrollToSection('home-about');
            }, 100);
        }
    }, [location]);

    const projects = projectsData;

    return (
        <PageTransition>
            <main style={{ position: 'relative' }}>
                <Hero />

                <div id="home-services" className="home-services-section">
                    <div className="section-header" data-index="01">
                        <h2>Services</h2>
                    </div>
                    <React.Suspense fallback={<div style={{ height: '500px' }} />}>
                        <Services />
                    </React.Suspense>
                </div>

                <div id="home-projects" className="home-projects-section">
                    <div className="section-header" data-index="02">
                        <h2>Projects</h2>
                    </div>
                    {projects.map((project, index) => (
                        <ProjectItem key={project.id} project={project} index={index} />
                    ))}
                </div>

                <div id="home-about" className="home-about-section">
                    <div className="section-header" data-index="03">
                        <h2>About me</h2>
                    </div>
                    <React.Suspense fallback={<div style={{ height: '400px' }} />}>
                        <AboutMe />
                    </React.Suspense>
                </div>

                <Marquee />
                <React.Suspense fallback={null}>
                    <FAQ />
                </React.Suspense>

                <CoffeeCTA />
            </main>
        </PageTransition>
    );
};

export default Home;

