import React, { useState, useRef, useEffect, useCallback } from "react";
import { AssistantRuntimeProvider, ComposerPrimitive } from "@assistant-ui/react";
import { Thread } from "@assistant-ui/react-ui";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useGeminiRuntime } from "./geminiRuntime";
import Logo from "../../assets/favicon.svg";
import "./Assistant.css";
import { playMessageSent, playCall, playCallEnded } from "../../utils/sound";

import "@assistant-ui/react-ui/styles/index.css";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const HAS_RECAPTCHA = RECAPTCHA_SITE_KEY && RECAPTCHA_SITE_KEY !== "your_recaptcha_site_key_here";

if (HAS_RECAPTCHA && typeof window !== "undefined") {
  const injectScript = () => {
    if (document.getElementById("grecaptcha-script")) return;
    const script = document.createElement("script");
    script.id = "grecaptcha-script";
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  };
  if (document.readyState === "complete" || document.readyState === "interactive") {
    injectScript();
  } else {
    window.addEventListener("DOMContentLoaded", injectScript);
  }
}

const executeRecaptcha = async (action) => {
  return new Promise((resolve) => {
    if (!HAS_RECAPTCHA) { resolve(null); return; }
    const checkAndExecute = () => {
      if (window.grecaptcha?.execute) {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action })
            .then(resolve)
            .catch(() => resolve(null));
        });
      } else {
        resolve(null);
      }
    };
    if (typeof window === "undefined") { resolve(null); return; }
    if (window.grecaptcha) {
      checkAndExecute();
    } else {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (window.grecaptcha) { clearInterval(interval); checkAndExecute(); }
        else if (attempts >= 30) { clearInterval(interval); resolve(null); }
      }, 100);
    }
  });
};

class AssistantErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error("[Assistant] Error:", error, info); }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const QUICK_SUGGESTIONS = [
  { icon: "ph:code-light", label: "Tech stack", text: "What technologies does Cloue work with?" },
  { icon: "ph:briefcase-light", label: "Background", text: "Tell me about Cloue's experience and education" },
  { icon: "ph:folder-open-light", label: "Projects", text: "What projects has Cloue built?" },
  { icon: "ph:envelope-simple-light", label: "Get in touch", text: "How can I contact Cloue?" },
];

const CustomComposer = ({ runtime, onSend }) => {
  const textareaRef = useRef(null);
  const composer = runtime.thread?.composer;
  const [state, setState] = useState(composer?.getState() || {});
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!composer?.subscribe) return;
    return composer.subscribe(() => setState(composer.getState()));
  }, [composer]);

  const handleChange = (e) => {
    if (composer?.setText) composer.setText(e.target.value);
    const target = e.target;
    target.style.height = "auto";
    const newHeight = Math.min(target.scrollHeight, 160);
    target.style.height = `${newHeight}px`;
  };

  const handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (state.text?.trim()) {
        onSend();
        // Reset height
        if (textareaRef.current) textareaRef.current.style.height = "auto";
      }
    }
  };

  if (!composer) return null;

  return (
    <textarea
      id="assistant-composer-input"
      name="message"
      ref={textareaRef}
      className={`aui-composer-input ${isFocused ? "is-focused" : ""}`}
      placeholder="Ask me anything about Cloue..."
      rows={1}
      value={state.text || ""}
      onInput={handleChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      data-lenis-prevent="true"
      onPointerDown={(e) => e.stopPropagation()}
      onKeyDown={handleKeyDown}
      onKeyUp={(e) => e.stopPropagation()}
    />
  );
};

const AssistantWindowContent = ({ onClose }) => {
  const [hasMessages, setHasMessages] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const runtime = useGeminiRuntime(executeRecaptcha);
  const [composerState, setComposerState] = useState(runtime.thread?.composer?.getState() || {});

  useEffect(() => {
    const composer = runtime.thread?.composer;
    if (!composer?.subscribe) return;
    return composer.subscribe(() => setComposerState(composer.getState()));
  }, [runtime.thread?.composer]);

  // Track message count
  useEffect(() => {
    const thread = runtime.thread;
    if (!thread?.subscribe) return;
    const unsub = thread.subscribe(() => {
      const state = thread.getState?.();
      const hasUserMsg = state?.messages?.some(m => m.role === "user");
      if (hasUserMsg) setHasMessages(true);
    });
    return unsub;
  }, [runtime.thread]);

  const handleSend = useCallback(() => {
    if (composerState.text?.trim()) {
      runtime.thread.composer.send();
      playMessageSent();
      setHasMessages(true);
    }
  }, [composerState.text, runtime]);

  const handleSuggestionClick = useCallback((text) => {
    if (runtime.thread?.composer?.setText) {
      runtime.thread.composer.setText(text);
      setTimeout(() => {
        runtime.thread.composer.send();
        playMessageSent();
        setHasMessages(true);
      }, 50);
    }
  }, [runtime]);

  const canSend = composerState.text?.trim();

  return (
    <motion.div
      id="assistant-chat-window"
      className="assistant-window"
      role="dialog"
      aria-label="AI Portfolio Assistant"
      data-lenis-prevent="true"
      initial={{ opacity: 0, y: 16, scale: 0.96, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 12, scale: 0.97, filter: "blur(6px)" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="assistant-header">
        <div className="assistant-header-content">
          <div className="assistant-avatar-wrap">
            <img src={Logo} alt="Assistant Logo" className="assistant-logo-img" />
            <span className="assistant-avatar-status" title="Online" />
          </div>
          <div className="assistant-info">
            <span className="assistant-name">Cloue's Assistant</span>
            <span className="assistant-status-text">
              {isTyping ? "Thinking..." : "Online"}
            </span>
          </div>
        </div>
        <button
          className="assistant-close-btn"
          onClick={onClose}
          aria-label="Close chat"
        >
          <Icon icon="ph:x" width="16" />
        </button>
      </div>

      <AssistantRuntimeProvider runtime={runtime}>
        <div className="assistant-thread-container" data-lenis-prevent="true">
          <Thread
            assistantAvatar={{ src: Logo, alt: "Assistant Avatar" }}
          />

          <div className="assistant-footer-area" data-lenis-prevent="true">
            {/* Quick suggestion chips, only shown when no messages */}
            {!hasMessages && (
              <div className="assistant-suggestions" aria-label="Suggested questions">
                {QUICK_SUGGESTIONS.map((s, i) => (
                  <motion.button
                    key={s.label}
                    className="suggestion-chip"
                    onClick={() => handleSuggestionClick(s.text)}
                    onMouseEnter={playMessageSent}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon icon={s.icon} width="14" />
                    {s.label}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Composer */}
            <div className="assistant-composer-wrapper">
              <ComposerPrimitive.Root className="aui-composer-root">
                <CustomComposer runtime={runtime} onSend={handleSend} />
                <motion.button
                  className={`aui-composer-send ${canSend ? "can-send" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSend();
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSend();
                  }}
                  disabled={!canSend}
                  type="button"
                  aria-label="Send message"
                  onPointerDown={(e) => e.stopPropagation()}
                  whileHover={canSend ? { scale: 1.08 } : {}}
                  whileTap={canSend ? { scale: 0.9 } : {}}
                >
                  <Icon icon="ph:paper-plane-right-fill" width="18" height="18" />
                </motion.button>
              </ComposerPrimitive.Root>

              <div className="assistant-footer-info">
                <span className="assistant-disclaimer">AI can make mistakes. Verify important info.</span>
                {HAS_RECAPTCHA && (
                  <span className="recaptcha-disclosure">
                    Protected by reCAPTCHA:{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy</a>
                    {" & "}
                    <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms</a>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </AssistantRuntimeProvider>
    </motion.div>
  );
};

const AssistantChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (window.lenis) window.lenis.start();
    };
  }, [isOpen]);

  useEffect(() => {
    const handleOpen = () => {
      if (!isOpen) { playCall(); setIsOpen(true); }
    };
    window.addEventListener("open-assistant", handleOpen);
    return () => window.removeEventListener("open-assistant", handleOpen);
  }, [isOpen]);

  return (
    <div className="assistant-container">
      {/* Trigger button */}
      <motion.button
        id="assistant-toggle-btn"
        className={`assistant-trigger ${isOpen ? "is-open" : ""}`}
        onClick={() => {
          if (isOpen) playCallEnded();
          else playCall();
          setIsOpen((prev) => !prev);
        }}
        aria-label={isOpen ? "Close assistant" : "Open AI assistant"}
        aria-expanded={isOpen}
        aria-controls="assistant-chat-window"
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? "close" : "open"}
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            <Icon
              icon={isOpen ? "ph:x-bold" : "ph:chat-circle-dots-fill"}
              width="22"
              height="22"
            />
          </motion.div>
        </AnimatePresence>
        {!isOpen && <span className="assistant-trigger-label">Chat</span>}
      </motion.button>

      <AssistantErrorBoundary>
        <AnimatePresence>
          {isOpen && (
            <AssistantWindowContent onClose={() => { playCallEnded(); setIsOpen(false); }} />
          )}
        </AnimatePresence>
      </AssistantErrorBoundary>
    </div>
  );
};

export const Assistant = () => (
  <AssistantErrorBoundary>
    <AssistantChat />
  </AssistantErrorBoundary>
);

export default Assistant;
