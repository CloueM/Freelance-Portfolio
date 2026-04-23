import React from 'react';
import '../styles/Marquee.css';

const Marquee = () => {
    const text = "LET'S TALK — LET'S COLLABORATE — SAY HELLO — WORK WITH ME — ";
    
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
