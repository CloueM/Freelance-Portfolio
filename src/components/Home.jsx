import React from 'react';
import Hero from './Hero';
import FeaturedProjects from './FeaturedProjects';
import CoffeeCTA from './CoffeeCTA';
import PageTransition from './PageTransition';

const Home = () => {
    return (
        <PageTransition>
            <main>
                <Hero />
                <FeaturedProjects />
                <CoffeeCTA />
            </main>
        </PageTransition>
    );
};

export default Home;
