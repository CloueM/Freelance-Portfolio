import React, { useState } from 'react';
import faqItems from '../data/faq.js';
import { playHoverSound, playSelectSound } from '../utils/sound';
import '../styles/FAQ.css';

const FAQ = () => {
    const [openId, setOpenId] = useState(null);

    const toggle = (id) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <section className="faq-section">
            <div className="faq-container">

                <div className="faq-right">

                    <h2 className="faq-title">FAQ</h2>

                    <div className="faq-list">
                        {faqItems.map((item) => {
                            const isOpen = openId === item.id;
                            return (
                                <div
                                    key={item.id}
                                    className={`faq-item ${isOpen ? 'open' : ''}`}
                                >
                                    <button
                                        className="faq-question"
                                        onClick={() => { playSelectSound(); toggle(item.id); }}
                                        onMouseEnter={playHoverSound}
                                        aria-expanded={isOpen}
                                    >
                                        <span className="faq-question-text">{item.question}</span>
                                        <span className="faq-icon" aria-hidden="true">
                                            {isOpen ? '▼' : '▶'}
                                        </span>
                                    </button>

                                    <div
                                        className="faq-answer-wrapper"
                                        style={{ maxHeight: isOpen ? '500px' : '0px' }}
                                    >
                                        <p className="faq-answer">{item.answer}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FAQ;
