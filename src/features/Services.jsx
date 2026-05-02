import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, useSpring, AnimatePresence, useScroll } from 'framer-motion';
import { Icon } from '@iconify/react';
import { servicesIntro, websiteTypes, whatsIncluded, whyMe } from '../services/services';
import Process from './Process';
import { playSelectSound, playServiceHoverSfx, playButtonHoverSfx } from '../utils/sound';
import './Services.css';

const Services = () => {
    const cardRefs = useRef([]);
    const includeRefs = useRef([]);
    const parallaxRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: parallaxRef,
        offset: ["start start", "end end"]
    });

    const progressScaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const controls = useAnimation();
    const [visibleCards, setVisibleCards] = useState(new Set());
    const [visibleIncludes, setVisibleIncludes] = useState(new Set());

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
            <div className="services-intro">
                <div className="services-intro-left">
                    <div className="services-eyebrow-wrapper">
                        <span className="services-eyebrow-line"></span>
                        <span className="services-eyebrow">{servicesIntro.heading}</span>
                    </div>
                    <h2 className="services-intro-title">{servicesIntro.title}</h2>
                </div>
                <div className="services-intro-right">
                    <div className="services-desc-wrapper">
                        <p className="services-intro-desc">{servicesIntro.description}</p>
                    </div>
                </div>
            </div>

            <div className="services-list">
                {websiteTypes.map((type, idx) => {
                    const handleMouseMove = (e) => {
                        const row = e.currentTarget;
                        const rect = row.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;

                        row.style.setProperty('--mouse-x', `${x}px`);
                        row.style.setProperty('--mouse-y', `${y}px`);
                    };

                    return (
                        <motion.div
                            key={type.id}
                            className={`service-row ${visibleCards.has(idx) ? 'visible' : ''}`}
                            ref={(el) => (cardRefs.current[idx] = el)}
                            data-idx={idx}
                            onMouseMove={handleMouseMove}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                        >
                            <div className="service-row-number">
                                <span>0{type.id}</span>
                            </div>

                            <div className="service-row-title-area">
                                <h3 className="service-row-title">{type.category}</h3>
                                <div className="service-row-benefit">
                                    <span>{type.benefit}</span>
                                </div>
                            </div>

                            <div className="service-row-content-area">
                                <p className="service-row-desc">{type.description}</p>
                                
                                <div className="service-row-details">
                                    <div className="service-detail-group">
                                        <span className="detail-label">BEST FOR</span>
                                        <p className="detail-value">{type.bestFor}</p>
                                    </div>
                                    <div className="service-detail-group">
                                        <span className="detail-label">INCLUDES</span>
                                        <p className="detail-value">{type.includes.join(', ')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="service-row-hover-bg" />
                        </motion.div>
                    );
                })}
            </div>

            <div className="services-footer-cta">
                <div className="footer-cta-container">
                    <div className="footer-cta-left">
                        <h2 className="footer-cta-title">Need a website that looks professional and works for your business?</h2>
                        <p className="footer-cta-desc">Let's create something clean, modern, and built around your goals.</p>
                    </div>
                    <div className="footer-cta-right">
                        <button 
                            className="footer-cta-primary"
                            onClick={() => {
                                playButtonHoverSfx();
                                const contactSection = document.getElementById('contact');
                                if (contactSection) {
                                    contactSection.scrollIntoView({ behavior: 'smooth' });
                                } else {
                                    window.dispatchEvent(new CustomEvent('open-assistant'));
                                }
                            }}
                        >
                            Start a Project
                            <Icon icon="ph:arrow-right" />
                        </button>
                        <button 
                            className="footer-cta-secondary"
                            onClick={() => {
                                playButtonHoverSfx();
                                window.location.href = "mailto:hello@kurowii.com";
                            }}
                        >
                            Get in Touch
                        </button>
                    </div>
                </div>
            </div>

            <div className="services-parallax-wrapper" ref={parallaxRef}>
                <div className="sticky-left-content">
                    <div className="foundation-badge">
                        <span className="badge-dot"></span>
                        <span className="badge-text">THE FOUNDATION</span>
                    </div>
                    
                    <h2 className="sticky-title">
                        Built to a <br />
                        <span className="title-italic">higher standard</span>
                    </h2>

                    <div className="scroll-explore">
                        <span className="explore-text">SCROLL TO EXPLORE</span>
                        <div className="explore-line-wrapper">
                            <motion.div 
                                className="explore-line-progress"
                                style={{ scaleX: progressScaleX, originX: 0 }}
                            />
                            <div className="explore-line-bg" />
                        </div>
                    </div>
                </div>

                <div className="scrolling-right-content">
                    {whatsIncluded.map((item, idx) => {
                        return (
                            <motion.div
                                key={item.id}
                                className={`chapter-item ${visibleIncludes.has(idx) ? 'active' : ''}`}
                                ref={(el) => (includeRefs.current[idx] = el)}
                                data-idx={idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, margin: "-20%" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className="chapter-bg-number">0{item.id}</div>
                                <div className="chapter-header">
                                    <div className="chapter-line"></div>
                                    <span className="chapter-label">CHAPTER — 0{item.id}</span>
                                </div>
                                
                                <h3 className="chapter-title">{item.title}</h3>
                                
                                <div className="chapter-desc-container">
                                    <div className="corner-accent top-left"></div>
                                    <div className="corner-accent top-right"></div>
                                    <div className="corner-accent bottom-left"></div>
                                    <div className="corner-accent bottom-right"></div>
                                    <p className="chapter-desc">{item.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <div className="services-why-wrapper">
                <div className="services-why-left">
                    <span className="why-eyebrow">Why work with me</span>
                    <h3 className="why-title">
                        I treat your project like it is my own.
                    </h3>
                    <p className="why-body">
                        I work directly with you from the first call to the final launch to ensure your website looks professional and functions perfectly. I prioritize clear communication and personal dedication to every detail of your project. I use modern frameworks to build efficient sites while focusing my energy on the custom features that actually grow your business.
                    </p>

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

            <div id="services-process">
                <Process />
            </div>
        </section>
    );
};

export default Services;

