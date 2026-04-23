import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { processData } from '../data/process';
import '../styles/Process.css';

const Process = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section className="process-wrapper">
            <div className="process-container">
                {processData.map((step, index) => (
                    <div
                        key={step.id}
                        className={`process-row ${hoveredIndex === index ? 'hovered' : ''} ${hoveredIndex !== null && hoveredIndex !== index ? 'dimmed' : ''}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        style={hoveredIndex === index ? { backgroundColor: step.hoverColor } : {}}
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
                            <Icon icon={step.icon} className="process-icon" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Process;
