import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './Hero';
import Process from './Process';
import ProjectItem from './ProjectItem';
import Services from './Services';
import AboutMe from './AboutMe';
import FAQ from './FAQ';
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
            <main>
                <Hero />

                <div id="home-services" className="home-services-section">
                    <div className="section-header" data-index="01">
                        <h2>SERVICES</h2>
                    </div>
                    <Services />
                </div>

                <div id="home-projects" className="home-projects-section">
                    <div className="section-header" data-index="02">
                        <h2>PROJECTS</h2>
                    </div>
                    {projects.map((project, index) => (
                        <ProjectItem key={project.id} project={project} index={index} />
                    ))}
                </div>

                <div id="home-about" className="home-about-section">
                    <div className="section-header" data-index="03">
                        <h2>ABOUT ME</h2>
                    </div>
                    <AboutMe />
                </div>

                <Marquee />
                <FAQ />

                <CoffeeCTA />
            </main>
        </PageTransition>
    );
};

export default Home;
