import React, { useState, useEffect, useRef } from 'react';
import assistantPersonas, { predefinedQuestions } from '../data/support.js';
import { playHoverSound, playSelectSound } from '../utils/sound';
import '../styles/FAQ.css';

const FAQ = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    // Persistence: Resume with the last assistant
    const lastPersonaId = sessionStorage.getItem('last_active_persona_id');
    const initialPersona = lastPersonaId 
        ? (assistantPersonas.find(p => p.id === lastPersonaId) || assistantPersonas[0])
        : assistantPersonas[0];

    const [activePersona, setActivePersona] = useState(initialPersona);
    const [isArchieUnlocked, setIsArchieUnlocked] = useState(sessionStorage.getItem('faq_unlocked_archie') === 'true');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isEndingCall, setIsEndingCall] = useState(false);
    const [askedQuestions, setAskedQuestions] = useState(new Set());
    const [isAutoPassing, setIsAutoPassing] = useState(false);
    
    // Control visibility of end call button in video feed
    const [showVideoControls, setShowVideoControls] = useState(false);

    // Track last indices to avoid repetition
    const [lastInactivityIndex, setLastInactivityIndex] = useState(-1);
    const [lastGreetingIndex, setLastGreetingIndex] = useState(parseInt(sessionStorage.getItem('last_greeting_index') || '-1'));

    // Draggable PIP State
    const [pipPos, setPipPos] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStartRef = useRef({ x: 0, y: 0 });
    
    // Inactivity State
    const [consecutiveInactivityCount, setConsecutiveInactivityCount] = useState(0);

    const messagesEndRef = useRef(null);
    const messagesAreaRef = useRef(null);
    const bobbyTimerRef = useRef(null);
    const inactivityTimerRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isAutoPassing]);

    // Draggable Logic for Mobile PIP
    const handleTouchStart = (e) => {
        if (window.innerWidth > 768) return; 
        const touch = e.touches[0];
        setIsDragging(true);
        dragStartRef.current = {
            x: touch.clientX - pipPos.x,
            y: touch.clientY - pipPos.y
        };
    };

    const handleTouchMove = (e) => {
        if (!isDragging || !messagesAreaRef.current) return;
        const touch = e.touches[0];
        
        let rawX = touch.clientX - dragStartRef.current.x;
        let rawY = touch.clientY - dragStartRef.current.y;

        const areaRect = messagesAreaRef.current.getBoundingClientRect();
        const pipWidth = 120;
        const pipHeight = 160;

        const initialX = window.innerWidth - 15 - pipWidth;
        const initialY = 80;

        const currentViewportX = initialX + rawX;
        const currentViewportY = initialY + rawY;

        const clampedViewportX = Math.max(areaRect.left, Math.min(currentViewportX, areaRect.right - pipWidth));
        const clampedViewportY = Math.max(areaRect.top, Math.min(currentViewportY, areaRect.bottom - pipHeight));

        setPipPos({
            x: clampedViewportX - initialX,
            y: clampedViewportY - initialY
        });
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const calculateDelay = (text, personaId) => {
        let multiplier = 30; 
        if (personaId === 'kody') multiplier = 50; 
        if (personaId === 'kevin') multiplier = 28; 
        if (personaId === 'archie') multiplier = 40; 

        return Math.max(1500, text.length * multiplier);
    };

    const resetInactivityTimer = () => {
        if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
        if (!isOpen || isTyping || isConnecting || isEndingCall || isAutoPassing || activePersona.id === 'bobby' || consecutiveInactivityCount >= 2) return;

        inactivityTimerRef.current = setTimeout(() => {
            handleInactivity();
        }, 15000);
    };

    const handleInactivity = () => {
        const lastMsg = messages[messages.length - 1];
        if (lastMsg && lastMsg.type === 'bot' && consecutiveInactivityCount < 2) {
            const msgs = activePersona.inactivityMsgs || ["Are you still there?"];
            let newIndex = Math.floor(Math.random() * msgs.length);
            if (msgs.length > 1 && newIndex === lastInactivityIndex) {
                newIndex = (newIndex + 1) % msgs.length;
            }
            const text = msgs[newIndex];
            setLastInactivityIndex(newIndex);
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                setConsecutiveInactivityCount(prev => prev + 1);
                setMessages(prev => [...prev, { id: Date.now(), type: 'bot', text, personaId: activePersona.id, isInactivity: true }]);
            }, calculateDelay(text, activePersona.id));
        }
    };

    useEffect(() => {
        resetInactivityTimer();
        return () => { if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current); };
    }, [messages, isOpen, isTyping, isConnecting, isEndingCall, isAutoPassing, consecutiveInactivityCount]);

    // Initial greeting and persistence logic
    useEffect(() => {
        if (isOpen && !isEndingCall) {
            // Save active persona for resuming later
            sessionStorage.setItem('last_active_persona_id', activePersona.id);
            
            const hasInteracted = sessionStorage.getItem(`interacted_${activePersona.id}`);
            let greetingText = activePersona.initialGreeting;

            if (hasInteracted && activePersona.repeatGreetings) {
                let newIdx = Math.floor(Math.random() * activePersona.repeatGreetings.length);
                if (activePersona.repeatGreetings.length > 1 && newIdx === lastGreetingIndex) {
                    newIdx = (newIdx + 1) % activePersona.repeatGreetings.length;
                }
                setLastGreetingIndex(newIdx);
                sessionStorage.setItem('last_greeting_index', newIdx.toString());
                greetingText = activePersona.repeatGreetings[newIdx];
            }

            // Mark as interacted for next time
            sessionStorage.setItem(`interacted_${activePersona.id}`, 'true');

            if (activePersona.id === 'bobby') {
                setMessages([{ id: Date.now(), type: 'bot', text: greetingText, personaId: activePersona.id }]);
                if (!isArchieUnlocked) {
                    bobbyTimerRef.current = setTimeout(() => handleEndCallAuto('kevin'), 3000);
                }
            } else {
                setIsTyping(true);
                const delay = calculateDelay(greetingText, activePersona.id);
                setTimeout(() => {
                    setIsTyping(false);
                    setMessages([{ id: Date.now(), type: 'bot', text: greetingText, personaId: activePersona.id }]);
                    setConsecutiveInactivityCount(0); 
                }, delay);
            }
        }
        return () => { if (bobbyTimerRef.current) clearTimeout(bobbyTimerRef.current); };
    }, [isOpen, activePersona, isEndingCall]);

    const handleEndCallAuto = (nextId) => {
        setIsAutoPassing(false);
        setIsEndingCall(true);
        const nextPersona = assistantPersonas.find(p => p.id === nextId);
        
        setTimeout(() => {
            setActivePersona(nextPersona);
            setIsEndingCall(false);
            setIsConnecting(true);
            setAskedQuestions(new Set());
            setConsecutiveInactivityCount(0);
            setLastInactivityIndex(-1);
            setTimeout(() => {
                setIsConnecting(false);
            }, 600);
        }, 1500);
    };

    const handleQuestionClick = (question) => {
        if (isTyping || isConnecting || isEndingCall || activePersona.id === 'bobby' || isAutoPassing) return;

        playSelectSound();
        setConsecutiveInactivityCount(0); 
        setLastInactivityIndex(-1);
        
        const userMsg = { id: Date.now(), type: 'user', text: question.text };
        setMessages(prev => [...prev, userMsg]);

        const newAsked = new Set(askedQuestions);
        newAsked.add(question.id);
        setAskedQuestions(newAsked);

        const responsePool = activePersona.responses[question.id] || ["I'm not sure about that..."];
        const responseText = Array.isArray(responsePool) 
            ? responsePool[Math.floor(Math.random() * responsePool.length)] 
            : responsePool;

        setIsTyping(true);
        const delay = calculateDelay(responseText, activePersona.id);

        setTimeout(() => {
            setIsTyping(false);
            
            let finalResponse = responseText;
            const callCount = parseInt(sessionStorage.getItem('archie_call_count') || '0');
            if (activePersona.id === 'archie' && callCount > 2 && Math.random() > 0.5) {
                const flavors = ["As I mentioned before, ", "Just to reiterate for you, ", "Like I said, Boss Cloue typically ", "In case you missed it earlier: "];
                finalResponse = flavors[Math.floor(Math.random() * flavors.length)] + responseText.charAt(0).toLowerCase() + responseText.slice(1);
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: finalResponse, personaId: activePersona.id }]);

            if (question.id === 'transfer') {
                setTimeout(() => {
                    if (activePersona.id === 'kevin' || activePersona.id === 'kody') triggerAutoPass();
                    else if (activePersona.id === 'archie') triggerPersonaOutro();
                }, 1000);
            } else if (newAsked.size === predefinedQuestions.length) {
                setTimeout(() => triggerPersonaOutro(), 1000);
            }
        }, delay);
    };

    const triggerAutoPass = () => {
        setIsAutoPassing(true);
        const nextId = activePersona.id === 'kevin' ? 'kody' : 'archie';
        setTimeout(() => { handleEndCallAuto(nextId); }, 5000);
    };

    const triggerPersonaOutro = () => {
        let outroText = "";
        if (activePersona.id === 'kevin') outroText = "I've told you everything I know! I'll pass you to Kody now, our Front-End Developer. He's usually busy fixing my messy code, but he's a pro!";
        else if (activePersona.id === 'kody') outroText = "Look, I'm going back to fixing this CSS nightmare Kevin left me. I'm passing you to Archie, our Project Manager. She handles the agency logistics.";
        else if (activePersona.id === 'archie') {
            const finalMsg1 = "I hope that covers everything. If you wish to proceed with a project, you can contact the Boss directly here: hello@kurowii.com";
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, { id: Date.now() + 2, type: 'bot', text: finalMsg1, personaId: 'archie' }]);
                setTimeout(() => {
                    const finalMsg2 = "I'll have to end the call now as the Boss has another client waiting for a consultation. Goodbye!";
                    setIsTyping(true);
                    setTimeout(() => {
                        setIsTyping(false);
                        setMessages(prev => [...prev, { id: Date.now() + 3, type: 'bot', text: finalMsg2, personaId: 'archie' }]);
                        setTimeout(() => {
                            sessionStorage.setItem('faq_unlocked_archie', 'true');
                            setIsArchieUnlocked(true);
                            setIsOpen(false);
                        }, 5000);
                    }, calculateDelay(finalMsg2, 'archie'));
                }, 2000);
            }, calculateDelay(finalMsg1, 'archie'));
            return;
        }

        if (outroText) {
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, { id: Date.now() + 5, type: 'bot', text: outroText, personaId: activePersona.id }]);
                triggerAutoPass();
            }, calculateDelay(outroText, activePersona.id));
        }
    };

    const toggleChat = () => {
        playSelectSound();
        setIsOpen(!isOpen);
        if (!isOpen) {
            setPipPos({ x: 0, y: 0 });
            setConsecutiveInactivityCount(0);
            setLastInactivityIndex(-1);
            setShowVideoControls(false);
        }
    };

    const handleVideoClick = () => {
        if (window.innerWidth <= 768) {
            setShowVideoControls(!showVideoControls);
        }
    };

    return (
        <>
            {!isOpen && (
                <button className="support-call-trigger" onClick={toggleChat} onMouseEnter={playHoverSound} aria-label="Open Support Call">
                    <div className="trigger-icon-wrapper">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M23 7l-7 5 7 5V7z"></path>
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                        </svg>
                    </div>
                    <span className="trigger-pulse"></span>
                </button>
            )}

            <div className={`support-call-modal ${isOpen ? 'open' : ''}`}>
                <div className="call-container">
                    <div 
                        className={`video-feed-section ${isDragging ? 'dragging' : ''} ${showVideoControls ? 'controls-active' : ''}`}
                        onClick={handleVideoClick}
                        style={{ transform: window.innerWidth <= 768 ? `translate(${pipPos.x}px, ${pipPos.y}px)` : 'none' }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div className="video-viewport">
                            {isEndingCall ? (
                                <div className="video-ending">
                                    <div className="end-call-animation"></div>
                                    <p>Re-routing call...</p>
                                </div>
                            ) : isConnecting ? (
                                <div className="video-connecting">
                                    <div className="loader"></div>
                                    <p>Connecting...</p>
                                </div>
                            ) : (
                                <>
                                    <img src={activePersona.video} alt={activePersona.name} className="persona-video" />
                                    <div className="video-overlay">
                                        <div className="video-top-meta">
                                            <div className="live-tag"><span className="dot"></span> LIVE</div>
                                            <div className="signal-status">{activePersona.signal}</div>
                                        </div>
                                        <div className="persona-info">
                                            <h3>{activePersona.name}</h3>
                                            <p className="persona-label">{activePersona.label}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Close Button Inside Video Feed */}
                                    <button 
                                        className="support-call-trigger active"
                                        onClick={(e) => { e.stopPropagation(); toggleChat(); }}
                                        onMouseEnter={playHoverSound}
                                        aria-label="End Call"
                                    >
                                        <div className="trigger-icon-wrapper">
                                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </div>
                                    </button>
                                </>
                            )}
                        </div>

                        {!isArchieUnlocked && (
                            <div className="persona-switcher disabled">
                                <p className="switcher-label">Participants Disconnected</p>
                                <div className="persona-grid">
                                    {assistantPersonas.map((p) => (
                                        <div key={p.id} className={`persona-thumb-static ${activePersona.id === p.id ? 'active' : ''}`}>
                                            <img src={p.video} alt={p.name} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="chat-sidebar-section">
                        <div className="chat-header">
                            <div className="header-text">
                                <h2 className="chat-title">Secure Connection</h2>
                                <div className="chat-subtitle">{activePersona.name} | {activePersona.label}</div>
                            </div>
                        </div>

                        <div className="chat-messages-area" ref={messagesAreaRef}>
                            {messages.map((msg) => (
                                <div key={msg.id} className={`chat-message ${msg.type}`}>
                                    {msg.type === 'bot' && <div className="message-avatar">{activePersona.name[0]}</div>}
                                    <div className="message-content"><div className="message-text">{msg.text}</div></div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="chat-message bot typing">
                                    <div className="message-avatar">{activePersona.name[0]}</div>
                                    <div className="message-content"><div className="typing-dots"><span></span><span></span><span></span></div></div>
                                </div>
                            )}
                            {isAutoPassing && (
                                <div className="system-status-msg">
                                    <div className="status-loader"></div>
                                    <span>Passing the call to someone...</span>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="chat-input-area">
                            <p className="input-label">
                                {activePersona.id === 'bobby' ? 'System restricted...' : isAutoPassing ? 'Rerouting...' : 'Select a question:'}
                            </p>
                            <div className="question-options">
                                {predefinedQuestions.map((q) => (
                                    <button
                                        key={q.id}
                                        className={`question-btn ${askedQuestions.has(q.id) ? 'asked' : ''}`}
                                        onClick={() => handleQuestionClick(q)}
                                        onMouseEnter={playHoverSound}
                                        disabled={isTyping || isConnecting || isEndingCall || activePersona.id === 'bobby' || askedQuestions.has(q.id) || isAutoPassing}
                                    >
                                        {q.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FAQ;
