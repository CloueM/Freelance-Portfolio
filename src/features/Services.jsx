import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, useSpring, AnimatePresence, useScroll, animate } from 'framer-motion';
import { Icon } from '@iconify/react';
import { servicesIntro, websiteTypes, whatsIncluded, whyMe } from '../services/services';
import Process from './Process';
import { playSelectSound, playServiceHoverSfx, playButtonHoverSfx } from '../utils/sound';
import './Services.css';

const AnimatedStat = ({ stat }) => {
    if (stat === "1:1") {
        return <span className="why-stat">1:1</span>;
    }

    const [count, setCount] = useState(0);
    const [hasIntersected, setHasIntersected] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const targetValue = parseInt(stat.replace(/[^0-9]/g, ''), 10) || 0;
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setHasIntersected(true);
                let startTime = null;
                const duration = 1500; // 1.5s
                
                const animate = (timestamp) => {
                    if (!startTime) startTime = timestamp;
                    const progress = Math.min((timestamp - startTime) / duration, 1);
                    const ease = progress * (2 - progress);
                    setCount(Math.floor(ease * targetValue));
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };
                
                requestAnimationFrame(animate);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [stat]);

    const displayValue = hasIntersected ? count : 0;

    if (stat.includes(':')) {
        const parts = stat.split(':');
        return <span ref={ref} className="why-stat">{parts[0]}:{displayValue}</span>;
    }
    if (stat.includes('%')) {
        return <span ref={ref} className="why-stat">{displayValue}%</span>;
    }
    if (stat.includes('+')) {
        return <span ref={ref} className="why-stat">{displayValue}+</span>;
    }
    return <span ref={ref} className="why-stat">{displayValue}</span>;
};

const Services = () => {
    const cardRefs = useRef([]);
    const includeRefs = useRef([]);
    const parallaxRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const blockOuterRef = useRef(null);
    const scrollProgress = useMotionValue(0);

    const progressScaleX = useSpring(scrollProgress, {
        stiffness: 120,
        damping: 25,
        restDelta: 0.001
    });

    const [activeIndex, setActiveIndex] = useState(0);
    const activeIndexRef = useRef(0);
    const scrollAnimationRef = useRef(null);

    // Calculate which card is currently centered in the list container viewport
    const updateActiveCard = useCallback(() => {
        const list = scrollContainerRef.current;
        const cards = cardRefs.current;
        if (!list || !cards || cards.length === 0) return;

        const listRect = list.getBoundingClientRect();
        const listCenter = listRect.left + listRect.width / 2;

        let closestIndex = 0;
        let minDistance = Infinity;

        cards.forEach((card, index) => {
            if (!card) return;
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(cardCenter - listCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        setActiveIndex(closestIndex);
        activeIndexRef.current = closestIndex;
    }, []);

    const animateScrollTo = useCallback((targetLeft) => {
        const list = scrollContainerRef.current;
        if (!list) return;

        if (scrollAnimationRef.current) {
            scrollAnimationRef.current.stop();
        }

        scrollAnimationRef.current = animate(list.scrollLeft, targetLeft, {
            type: 'spring',
            stiffness: 90,
            damping: 20,
            mass: 0.8,
            onUpdate: (latest) => {
                list.scrollLeft = latest;
            }
        });
    }, []);

    const snapScrollTo = useCallback((index) => {
        const list = scrollContainerRef.current;
        const cards = cardRefs.current;
        if (!list || !cards || !cards[index]) return;

        const card = cards[index];
        const targetLeft = card.offsetLeft - (list.clientWidth - card.clientWidth) / 2;

        if (scrollAnimationRef.current) {
            scrollAnimationRef.current.stop();
        }
        list.scrollLeft = targetLeft;
    }, []);

    // Sticky step snap scroll using viewport-relative calculations.
    useEffect(() => {
        const outer = blockOuterRef.current;
        const list = scrollContainerRef.current;
        if (!outer || !list) return;

        const scrollStep = 500; // Scroll distance in pixels required to transition to next card
        const N = websiteTypes.length;
        const totalRange = (N - 1) * scrollStep;

        const recalc = () => {
            if (window.innerWidth <= 768) {
                outer.style.height = 'auto';
                return;
            }
            outer.style.height = `calc(100vh + ${totalRange}px)`;
        };

        const onScroll = (isImmediate = false) => {
            if (window.innerWidth <= 768) return;
            const rect = outer.getBoundingClientRect();
            const scrolled = -rect.top;

            let index = 0;
            if (rect.top <= 0) {
                index = Math.min(
                    N - 1,
                    Math.max(0, Math.round(scrolled / scrollStep))
                );
            }

            const progress = Math.max(0, Math.min(scrolled, totalRange)) / totalRange;
            scrollProgress.set(progress);

            if (index !== activeIndexRef.current || isImmediate) {
                activeIndexRef.current = index;
                setActiveIndex(index);

                if (isImmediate) {
                    snapScrollTo(index);
                } else {
                    const cards = cardRefs.current;
                    const card = cards[index];
                    if (card) {
                        const targetLeft = card.offsetLeft - (list.clientWidth - card.clientWidth) / 2;
                        animateScrollTo(targetLeft);
                    }
                }
            }
        };

        // Initialize positions
        const initRafId = requestAnimationFrame(() => {
            recalc();
            onScroll(true);
        });

        const ro = new ResizeObserver(() => {
            recalc();
            onScroll(true);
        });
        ro.observe(list);

        const handleResize = () => {
            recalc();
            onScroll(true);
        };

        const handleWindowScroll = () => {
            onScroll(false);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleWindowScroll, { passive: true });

        return () => {
            cancelAnimationFrame(initRafId);
            ro.disconnect();
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleWindowScroll);
            if (scrollAnimationRef.current) {
                scrollAnimationRef.current.stop();
            }
        };
    }, [scrollProgress, animateScrollTo, snapScrollTo]);

    const handleListScroll = () => {
        if (window.innerWidth <= 768) {
            const list = scrollContainerRef.current;
            if (list) {
                const horizontalRange = list.scrollWidth - list.clientWidth;
                if (horizontalRange > 0) {
                    scrollProgress.set(list.scrollLeft / horizontalRange);
                }
                updateActiveCard();
            }
        }
    };

    const { scrollYProgress } = useScroll({
        target: parallaxRef,
        offset: ["start start", "end end"]
    });

    const progressScaleX_vertical = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // alias for use in vertical parallax section
    const parallelProgressScaleX = progressScaleX_vertical;

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
            <div className="services-block-outer" ref={blockOuterRef}>
            <div className="services-block">
                <div className="services-intro">
                    <div className="services-intro-left">
                        <h2 className="services-intro-title">Websites built <br /> for <span className="title-italic">results</span></h2>
                    </div>
                    <div className="services-intro-right">
                        <div className="services-desc-wrapper">
                            <p className="services-intro-desc">{servicesIntro.description}</p>
                        </div>
                    </div>
                </div>

                <div className="services-middle-bar">
                    <div className="services-scroll-controls">
                        <span className="services-scroll-label">SCROLL TO EXPLORE</span>
                        <div className="services-scroll-track">
                            <motion.div
                                className="services-scroll-thumb"
                                style={{ scaleX: progressScaleX, originX: 0 }}
                            />
                            <div className="services-scroll-track-bg" />
                        </div>
                    </div>
                </div>

                <div className="services-list" ref={scrollContainerRef} onScroll={handleListScroll}>
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
                            className={`service-row ${visibleCards.has(idx) ? 'visible' : ''} ${activeIndex === idx ? 'active' : ''}`}
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
            </div>
            </div>

            <div className="services-footer-cta">
                <div className="footer-cta-container">
                    <div className="footer-cta-left">
                        <h2 className="footer-cta-title">
                            Let's build something <br />
                            <span className="title-italic">exceptional</span>.
                        </h2>
                    </div>
                    <div className="footer-cta-right">
                        <p className="footer-cta-desc">
                            I collaborate with forward-thinking businesses to design and develop custom, 
                            high-performing websites. By combining clean layout design with optimized code, 
                            I help turn your business goals into a professional online presence built for results.
                        </p>
                        <button 
                            className="footer-cta-btn"
                            onClick={() => {
                                playButtonHoverSfx();
                                window.location.href = "mailto:hello@kurowii.com";
                            }}
                        >
                            <span className="btn-text-wrapper">
                                <span className="btn-text" data-text="Get in Touch">Get in Touch</span>
                            </span>
                            <span className="btn-icon-wrapper">
                                <Icon icon="ph:arrow-up-right" className="btn-icon" />
                            </span>
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
                                style={{ scaleX: parallelProgressScaleX, originX: 0 }}
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
                                    <span className="chapter-label">CHAPTER 0{item.id}</span>
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
                    <div className="why-title-block">
                        <span className="why-eyebrow">Why work with me</span>
                        <h3 className="why-title">
                            Dedicated to <br />
                            <span className="title-italic">standards</span>, <br />
                            not shortcuts.
                        </h3>
                    </div>
                    <div className="why-body-block">
                        <p className="why-body">
                            I work one-on-one with you from initial layout design to deployment, ensuring a high-performance build with zero templates or bloated code. By prioritizing transparent communication and clean engineering, I create tailored digital products that elevate your brand and drive actual business results.
                        </p>
                    </div>
                </div>

                <div className="services-why-right">
                    {whyMe.map((item) => (
                        <div key={item.id} className="why-stat-card">
                            <AnimatedStat stat={item.stat} />
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

