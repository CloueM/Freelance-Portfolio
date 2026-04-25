import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, useSpring } from 'framer-motion';
import { Icon } from '@iconify/react';
import { servicesIntro, websiteTypes, whatsIncluded, whyMe } from '../data/services';
import Process from './Process';
import '../styles/Services.css';

const Services = () => {
    const cardRefs = useRef([]);
    const includeRefs = useRef([]);
    const [isSlid, setIsSlid] = useState(false);
    const controls = useAnimation();
    const [visibleCards, setVisibleCards] = useState(new Set());
    const [visibleIncludes, setVisibleIncludes] = useState(new Set());
    const [activeHighlights, setActiveHighlights] = useState(new Set());

    useEffect(() => {
        
        const flatExamples = [];
        websiteTypes.forEach((card, cardIdx) => {
            card.examples.forEach((_, itemIdx) => {
                flatExamples.push({ cardIdx, itemIdx });
            });
        });

        let currentIdx = 0;
        const triggerHighlight = () => {
            const { cardIdx, itemIdx } = flatExamples[currentIdx];
            const key = `${cardIdx}-${itemIdx}`;

            setActiveHighlights(prev => new Set([...prev, key]));

            setTimeout(() => {
                setActiveHighlights(prev => {
                    const next = new Set(prev);
                    next.delete(key);
                    return next;
                });
            }, 5000); 

            currentIdx = (currentIdx + 1) % flatExamples.length;
        };

        
        triggerHighlight();
        const interval = setInterval(triggerHighlight, 2000); 

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const cardObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = parseInt(entry.target.dataset.idx);
                        setVisibleCards((prev) => new Set([...prev, idx]));
                    }
                });
            },
            { threshold: 0.12 }
        );

        cardRefs.current.forEach((el) => {
            if (el) cardObserver.observe(el);
        });

        const includeObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const idx = parseInt(entry.target.dataset.idx);
                    if (entry.isIntersecting) {
                        setVisibleIncludes((prev) => new Set([...prev, idx]));
                    } else {
                        setVisibleIncludes((prev) => {
                            const next = new Set(prev);
                            next.delete(idx);
                            return next;
                        });
                    }
                });
            },
            { threshold: 0.15 }
        );

        includeRefs.current.forEach((el) => {
            if (el) includeObserver.observe(el);
        });

        return () => {
            cardObserver.disconnect();
            includeObserver.disconnect();
        };
    }, []);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMagneticMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;
        x.set(distanceX * 0.35);
        y.set(distanceY * 0.35);
    };

    const handleMagneticReset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section className="services-section" id="home-services">
            {}
            <div className="services-intro">
                <div className="services-intro-left">
                    <p className="services-intro-text">{servicesIntro.description}</p>
                </div>
                <div className="services-intro-right">
                    <motion.button 
                        className="services-process-cta" 
                        onClick={() => document.getElementById('services-process').scrollIntoView({ behavior: 'smooth' })}
                        onMouseMove={handleMagneticMove}
                        onMouseLeave={handleMagneticReset}
                        style={{ x: mouseXSpring, y: mouseYSpring }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <span>SEE MY PROCESS</span>
                        <Icon icon="ph:arrow-down-light" />
                    </motion.button>
                </div>
            </div>

            {}
            <div className="services-types-grid">
                {websiteTypes.map((type, idx) => {
                    const handleMouseMove = (e) => {
                        const card = e.currentTarget;
                        const rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;

                        card.style.setProperty('--mouse-x', `${x}px`);
                        card.style.setProperty('--mouse-y', `${y}px`);
                    };

                    return (
                        <motion.div
                            key={type.id}
                            className={`service-card ${visibleCards.has(idx) ? 'visible' : ''}`}
                            ref={(el) => (cardRefs.current[idx] = el)}
                            data-idx={idx}
                            onMouseMove={handleMouseMove}
                            whileHover={{ 
                                scale: 1.01,
                                y: -5,
                                transition: { duration: 0.3 }
                            }}
                            style={{ 
                                transitionDelay: `${idx * 80}ms`
                            }}
                        >
                            <div className="service-card-top">
                                <span className="service-number">0{type.id}</span>
                            </div>
                            <h3 className="service-category">{type.category}</h3>
                            <p className="service-tagline">{type.tagline}</p>
                            <p className="service-desc">{type.description}</p>
                            <ul className="service-examples">
                                {type.examples.map((ex, i) => (
                                    <li 
                                        key={i} 
                                        className={`service-example-item ${activeHighlights.has(`${idx}-${i}`) ? 'highlighted' : ''}`}
                                        style={{ transitionDelay: `${(idx * 80) + (i * 50)}ms` }}
                                    >
                                        {ex}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    );
                })}
            </div>

            {}
            <div className="services-includes-wrapper">
                <div className="services-includes-header">
                    <span className="includes-eyebrow">Service details</span>
                    <h3 className="includes-title">Standards I bring to every single project.</h3>
                </div>
                <div className="services-includes-grid">
                    {whatsIncluded.map((item, idx) => {
                        const handleMouseMove = (e) => {
                            const card = e.currentTarget;
                            const rect = card.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;

                            card.style.setProperty('--mouse-x', `${x}px`);
                            card.style.setProperty('--mouse-y', `${y}px`);
                        };

                        return (
                            <div
                                key={item.id}
                                className={`include-card ${visibleIncludes.has(idx) ? 'visible' : ''}`}
                                ref={(el) => (includeRefs.current[idx] = el)}
                                data-idx={idx}
                                onMouseMove={handleMouseMove}
                                style={{ transitionDelay: `${idx * 60}ms` }}
                            >
                                <span className="include-number">0{item.id}</span>
                                <h4 className="include-title">{item.title}</h4>
                                <p className="include-desc">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {}
            <div className="services-why-wrapper">
                <div className="services-why-left">
                    <span className="why-eyebrow">Why work with me</span>
                    <h3 className="why-title">
                        I treat your project like it is my own.
                    </h3>
                    <p className="why-body">
                        I work directly with you from the first call to the final launch to ensure your website looks premium and functions perfectly. I prioritize clear communication and personal dedication to every detail of your project. I use modern frameworks to build efficient sites while focusing my energy on the custom features that actually grow your business.
                    </p>
                    <div className="why-cta-wrapper">
                        <div className="slide-track" style={{ background: isSlid ? 'rgba(255, 255, 255, 0.1)' : '' }}>
                            <motion.div 
                                className="slide-handle"
                                drag="x"
                                dragConstraints={{ left: 0, right: 215 }}
                                dragElastic={0}
                                onDragEnd={(e, info) => {
                                    if (info.offset.x >= 180) {
                                        setIsSlid(true);
                                        controls.start({ x: 215 });
                                        
                                        
                                        window.dispatchEvent(new CustomEvent('open-support-call'));
                                        
                                        setTimeout(() => {
                                            setIsSlid(false);
                                            controls.start({ x: 0 });
                                        }, 3000);
                                    } else {
                                        setTimeout(() => {
                                            controls.start({ x: 0 });
                                        }, 1000);
                                    }
                                }}
                                animate={controls}
                                initial={{ x: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Icon icon={isSlid ? "ph:check-bold" : "ph:arrow-right-bold"} />
                            </motion.div>
                            <span className="slide-text">
                                {isSlid ? "CONNECTING..." : "SLIDE TO TALK"}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="services-why-right">
                    {whyMe.map((item) => (
                        <div key={item.id} className="why-stat-card">
                            <span className="why-stat">{item.stat}</span>
                            <span className="why-label">{item.label}</span>
                            <span className="why-note">{item.note}</span>
                        </div>
                    ))}
                </div>
            </div>

            {}
            <div id="services-process">
                <Process />
            </div>
        </section>
    );
};

export default Services;

