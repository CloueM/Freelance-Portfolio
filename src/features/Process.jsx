import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { Icon } from '@iconify/react';
import { processData } from '../services/process';
import { playProcessChat, playProcessDesign, playProcessBuild, playProcessLaunch } from '../utils/sound';
import './Process.css';

const Process = () => {
    const [activeStep, setActiveStep] = useState(-1);
    const [lineOffsets, setLineOffsets] = useState({ top: 0, bottom: 0 });
    const containerRef = useRef(null);
    const firstRowRef = useRef(null);
    const lastRowRef = useRef(null);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 60%", "end 60%"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const stepCount = processData.length;

        if (latest <= 0 || latest >= 1) {
            setActiveStep(-1);
            return;
        }

        const currentStep = Math.min(
            Math.floor(latest * stepCount),
            stepCount - 1
        );
        
        if (currentStep !== activeStep) {
            
            if (currentStep === 0) playProcessChat();
            else if (currentStep === 1) playProcessDesign();
            else if (currentStep === 2) playProcessBuild();
            else if (currentStep === 3) playProcessLaunch();
        }
        setActiveStep(currentStep);
    });

    useEffect(() => {
        const updateOffsets = () => {
            if (firstRowRef.current && lastRowRef.current) {
                setLineOffsets({
                    top: firstRowRef.current.offsetTop + (firstRowRef.current.offsetHeight / 2),
                    bottom: (containerRef.current.offsetHeight - (lastRowRef.current.offsetTop + (lastRowRef.current.offsetHeight / 2)))
                });
            }
        };

        updateOffsets();
        window.addEventListener('resize', updateOffsets);
        return () => window.removeEventListener('resize', updateOffsets);
    }, []);

    const scaleYTarget = activeStep === -1 ? 0 : activeStep / (processData.length - 1);

    return (
        <section className="process-wrapper">
            <div className="process-intro">
                <span className="process-eyebrow">The plan</span>
                <h2 className="process-intro-title">How I build your site.</h2>
                <p className="process-intro-desc">
                    I keep things simple and transparent. No corporate jargon or hidden steps. Just a clear path from our first call to your new website being live.
                </p>
            </div>
            <div className="process-container" ref={containerRef} style={{ position: 'relative' }}>
                <div 
                    className="process-progress-line"
                    style={{ 
                        top: `${lineOffsets.top}px`, 
                        bottom: `${lineOffsets.bottom}px` 
                    }}
                >
                    <motion.div 
                        className="progress-fill" 
                        animate={{ scaleY: scaleYTarget }}
                        style={{ transformOrigin: "top" }}
                        transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    />
                </div>
                {processData.map((step, index) => (
                    <div
                        key={step.id}
                        ref={index === 0 ? firstRowRef : (index === processData.length - 1 ? lastRowRef : null)}
                        className={`process-row ${activeStep >= index ? 'active' : ''}`}
                    >
                        <div 
                            className={`process-checkpoint ${activeStep >= index ? 'active' : ''}`}
                        >
                            <Icon icon={step.icon} />
                        </div>
                        <div className="process-row-left">
                            <div className="process-title-wrapper">
                                <h3 className="process-title">{step.title}</h3>
                                <span className="process-title-ghost">{step.title}</span>
                            </div>
                        </div>

                        <div className="process-row-right">
                            <motion.p 
                                className="process-description"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ 
                                    opacity: activeStep >= index ? 1 : 0,
                                    y: activeStep >= index ? 0 : 10
                                }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            >
                                {step.description}
                            </motion.p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Process;

