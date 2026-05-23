import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { processData } from '../services/process';
import { playProcessChat, playProcessDesign, playProcessBuild, playProcessLaunch } from '../utils/sound';
import './Process.css';

const Process = () => {
    const lastPlayedRef = useRef(-1);

    // Variants for row elements to trigger scroll animations based on row index (custom)
    const rowVariants = {
        hidden: { 
            opacity: 0.15, 
            y: 40, 
            filter: "blur(6px)",
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        },
        visible: { 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const titleVariants = {
        hidden: { 
            color: "var(--color-neutral)", 
            x: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        },
        visible: (index) => ({ 
            color: "var(--color-off-white)", 
            x: index % 2 === 0 ? 10 : -10, // alternate translation direction
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        })
    };

    const ghostVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.95,
            x: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        },
        visible: (index) => ({ 
            opacity: 0.12, 
            scale: 1,
            x: index % 2 === 0 ? -15 : 15, // alternate ghost offsets
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        })
    };

    const descVariants = {
        hidden: { 
            opacity: 0, 
            y: 15,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        },
        visible: { 
            opacity: 0.85, 
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }
        }
    };

    return (
        <section className="process-wrapper">
            <div className="process-intro">
                <div className="process-intro-left">
                    <span className="process-eyebrow">The plan</span>
                    <h2 className="process-intro-title">
                        A clear process for <br />
                        <span className="title-italic">exceptional</span> results.
                    </h2>
                </div>
                <div className="process-intro-right">
                    <p className="process-intro-desc">
                        I manage your project through a structured, phase-by-phase approach. From our initial creative brief to the final deployment checks, you will have complete clarity on exactly where your project stands.
                    </p>
                </div>
            </div>

            <div className="process-container">
                {processData.map((step, index) => (
                    <motion.div
                        key={step.id}
                        className="process-row"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.4, margin: "-10% 0px -10% 0px" }}
                        variants={rowVariants}
                        onViewportEnter={() => {
                            if (lastPlayedRef.current !== index) {
                                lastPlayedRef.current = index;
                                if (index === 0) playProcessChat();
                                else if (index === 1) playProcessDesign();
                                else if (index === 2) playProcessBuild();
                                else if (index === 3) playProcessLaunch();
                            }
                        }}
                    >
                        <div className="process-row-left">
                            <div className="process-title-wrapper">
                                <span className="process-step-num">0{index + 1} //</span>
                                <motion.h3 
                                    className="process-title"
                                    variants={titleVariants}
                                    custom={index}
                                >
                                    {step.title}
                                </motion.h3>
                                <motion.span 
                                    className="process-title-ghost"
                                    variants={ghostVariants}
                                    custom={index}
                                >
                                    {step.title}
                                </motion.span>
                            </div>
                        </div>

                        <div className="process-row-right">
                            <motion.p 
                                className="process-description"
                                variants={descVariants}
                            >
                                {step.description}
                            </motion.p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Process;
