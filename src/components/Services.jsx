import React, { useRef, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { servicesIntro, websiteTypes, whatsIncluded, whyMe } from '../data/services';
import '../styles/Services.css';

const Services = () => {
    const cardRefs = useRef([]);
    const includeRefs = useRef([]);
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
                    if (entry.isIntersecting) {
                        const idx = parseInt(entry.target.dataset.idx);
                        setVisibleIncludes((prev) => new Set([...prev, idx]));
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

    return (
        <section className="services-section" id="home-services">
            {/* Intro description */}
            <div className="services-intro">
                <p className="services-intro-text">{servicesIntro.description}</p>
            </div>

            {/* Website types */}
            <div className="services-types-grid">
                {websiteTypes.map((type, idx) => (
                    <div
                        key={type.id}
                        className={`service-card ${visibleCards.has(idx) ? 'visible' : ''}`}
                        ref={(el) => (cardRefs.current[idx] = el)}
                        data-idx={idx}
                        style={{ transitionDelay: `${idx * 80}ms` }}
                    >
                        <div className="service-card-top">
                            <Icon icon={type.icon} className="service-icon" />
                            <span className="service-number">0{type.id}</span>
                        </div>
                        <h3 className="service-category">{type.category}</h3>
                        <p className="service-tagline">{type.tagline}</p>
                        <p className="service-desc">{type.description}</p>
                        <ul className="service-examples">
                            {type.examples.map((ex, i) => (
                                <li 
                                    key={i} 
                                    className="service-example-item"
                                    style={{ transitionDelay: `${(idx * 80) + (i * 50)}ms` }}
                                >
                                    {ex}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* What's included */}
            <div className="services-includes-wrapper">
                <div className="services-includes-header">
                    <span className="includes-eyebrow">WHAT'S INCLUDED</span>
                    <h3 className="includes-title">Everything you need, nothing you don't.</h3>
                </div>
                <div className="services-includes-grid">
                    {whatsIncluded.map((item, idx) => (
                        <div
                            key={item.id}
                            className={`include-card ${visibleIncludes.has(idx) ? 'visible' : ''}`}
                            ref={(el) => (includeRefs.current[idx] = el)}
                            data-idx={idx}
                            style={{ transitionDelay: `${idx * 60}ms` }}
                        >
                            <Icon icon={item.icon} className="include-icon" />
                            <h4 className="include-title">{item.title}</h4>
                            <p className="include-desc">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Why me */}
            <div className="services-why-wrapper">
                <div className="services-why-left">
                    <span className="why-eyebrow">WHY WORK WITH ME</span>
                    <h3 className="why-title">
                        A web developer who treats your project like it's their own.
                    </h3>
                    <p className="why-body">
                        You won't get passed around to a team you've never met. I work directly with every client, meaning faster communication, better results, and a site that actually reflects your vision — not a generic one from a theme library.
                    </p>
                    <a href="mailto:hello@kurowii.com" className="why-cta-btn">
                        Let's Talk
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </a>
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
        </section>
    );
};

export default Services;
