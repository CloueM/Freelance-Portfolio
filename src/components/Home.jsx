import React from 'react';
import Hero from './Hero';
import FeaturedProjects from './FeaturedProjects';
import CoffeeCTA from './CoffeeCTA';

const Home = () => {
    return (
        <main>
            <Hero />
            <FeaturedProjects />
            <CoffeeCTA />
        </main>
    );
};

export default Home;
