import React from 'react';
import '../styles/Marquee.css';

const Marquee = () => {
    const text = "Let's talk · Let's collaborate · Say hello · Work with me · ";
    
    return (
        <div className="marquee-wrapper">
            <div className="marquee-content">
                <span>{text}{text}{text}{text}</span>
                <span>{text}{text}{text}{text}</span>
            </div>
        </div>
    );
};

export default Marquee;

