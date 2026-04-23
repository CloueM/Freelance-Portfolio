import React, { useState } from 'react';
import { processData } from '../data/process';
import '../styles/Process.css';

const Process = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section className="process-wrapper">
            <div className="process-intro">
                <span className="process-eyebrow">WORKFLOW</span>
                <h2 className="process-intro-title">From concept to completion.</h2>
                <p className="process-intro-desc">
                    A structured, transparent approach designed to ensure every project is delivered with precision, speed, and a focus on your business goals.
                </p>
            </div>
            <div className="process-container">
                {processData.map((step, index) => (
                    <div
                        key={step.id}
                        className={`process-row ${hoveredIndex === index ? 'hovered' : ''} ${hoveredIndex !== null && hoveredIndex !== index ? 'dimmed' : ''}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="process-row-left">
                            <span className="process-number">{step.id}</span>
                            <div className="process-title-wrapper">
                                <h3 className="process-title">{step.title}</h3>
                                <span className="process-title-ghost">{step.title}</span>
                            </div>
                        </div>

                        <div className="process-row-right">
                            <p className="process-description">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Process;
