import React, { useState, useRef, useEffect } from "react";
import { AssistantRuntimeProvider, ComposerPrimitive, useThread } from "@assistant-ui/react";
import { Thread } from "@assistant-ui/react-ui";
import { Icon } from "@iconify/react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useGeminiRuntime } from "./geminiRuntime";
import Logo from "../../assets/favicon.svg";
import "./Assistant.css";
import { playMessageSent, playCall, playCallEnded } from "../../utils/sound";

import "@assistant-ui/react-ui/styles/index.css";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const HAS_RECAPTCHA = RECAPTCHA_SITE_KEY && RECAPTCHA_SITE_KEY !== "your_recaptcha_site_key_here";

class AssistantErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("[Assistant] Error caught by boundary:", error, info);
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}



const CustomComposer = ({ runtime }) => {
  const textareaRef = useRef(null);
  const composer = runtime.thread?.composer;
  const [state, setState] = useState(composer?.getState() || {});

  useEffect(() => {
    if (!composer?.subscribe) return;
    return composer.subscribe(() => {
      setState(composer.getState());
    });
  }, [composer]);

  const handleChange = (e) => {
    if (composer?.setText) {
      composer.setText(e.target.value);
    }
    
    // Stable auto-resize
    const target = e.target;
    target.style.height = 'auto';
    const newHeight = Math.min(target.scrollHeight, 160);
    target.style.height = `${newHeight}px`;
  };

  if (!composer) return null;

  return (
    <textarea
      id="assistant-composer-input"
      name="message"
      ref={textareaRef}
      className="aui-composer-input"
      placeholder="Write a message..."
      rows={1}
      value={state.text || ""}
      onInput={handleChange}
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      data-lenis-prevent="true"
      onPointerDown={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      onKeyUp={(e) => e.stopPropagation()}
    />
  );
};

const AssistantChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();
  const executeRecaptchaRef = useRef(null);
  useEffect(() => {
    executeRecaptchaRef.current = executeRecaptcha ?? null;
  }, [executeRecaptcha]);

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
      if (!isOpen) {
        playCall();
        setIsOpen(true);
      }
    };
    window.addEventListener('open-assistant', handleOpen);
    return () => window.removeEventListener('open-assistant', handleOpen);
  }, [isOpen]);

  const runtime = useGeminiRuntime(executeRecaptchaRef);
  const [composerState, setComposerState] = useState(runtime.thread?.composer?.getState() || {});

  useEffect(() => {
    const composer = runtime.thread?.composer;
    if (!composer?.subscribe) return;
    return composer.subscribe(() => {
      setComposerState(composer.getState());
    });
  }, [runtime.thread?.composer]);



  return (
    <div className="assistant-container">
      <button
        id="assistant-toggle-btn"
        className={`assistant-trigger ${isOpen ? "is-open" : ""}`}
        onClick={() => {
          if (isOpen) {
            playCallEnded();
          } else {
            playCall();
          }
          setIsOpen((prev) => !prev);
        }}
        aria-label={isOpen ? "Close assistant" : "Open AI assistant"}
        aria-expanded={isOpen}
        aria-controls="assistant-chat-window"
      >
        <Icon
          icon={isOpen ? "ph:x-bold" : "ph:chat-circle-dots-fill"}
          width="24"
          height="24"
        />
      </button>

      <AssistantErrorBoundary>
        <div
          id="assistant-chat-window"
          className={`assistant-window ${isOpen ? "is-visible" : "is-hidden"}`}
          role="dialog"
          aria-label="AI Portfolio Assistant"
          data-lenis-prevent="true"
        >
          <div className="assistant-header">
            <div className="assistant-header-content">
              <img src={Logo} alt="Assistant Logo" className="assistant-logo-img" />
              <div className="assistant-info">
                <span className="assistant-name">Cloue (AI)</span>
                <span className="assistant-status">Online</span>
              </div>
            </div>
          </div>
          <AssistantRuntimeProvider runtime={runtime}>
            <div className="assistant-thread-container" data-lenis-prevent="true">
              <Thread
                assistantAvatar={{ src: Logo, alt: "Assistant Avatar" }}
                welcome={{
                  message:
                    "Hey! I'm Cloue's AI assistant. Ask me about services, projects, or anything about working together.",
                }}
              />
              
              <div className="assistant-footer-area" data-lenis-prevent="true">
                <div className="assistant-composer-wrapper">
                  <ComposerPrimitive.Root className="aui-composer-root">
                    <CustomComposer runtime={runtime} />
                    <button 
                      className="aui-composer-send"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (composerState.text?.trim()) {
                          runtime.thread.composer.send();
                          playMessageSent();
                        }
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (composerState.text?.trim()) {
                          runtime.thread.composer.send();
                          playMessageSent();
                        }
                      }}
                      disabled={composerState.isEmpty}
                      type="button"
                      aria-label="Send message"
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      <Icon icon="ph:paper-plane-right-fill" width="20" height="20" />
                    </button>
                  </ComposerPrimitive.Root>
                  <div className="assistant-footer-info">
                    <span className="assistant-disclaimer">AI can make mistakes. Check important info.</span>
                    {HAS_RECAPTCHA && (
                      <span className="recaptcha-disclosure">
                        Protected by reCAPTCHA: <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy</a> & <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms</a>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </AssistantRuntimeProvider>
        </div>
      </AssistantErrorBoundary>
    </div>
  );
};


const AssistantWithRecaptcha = () => (
  <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
    <AssistantChat />
  </GoogleReCaptchaProvider>
);

const AssistantWithoutRecaptcha = () => <AssistantChat />;

export const Assistant = () => (
  <AssistantErrorBoundary>
    {HAS_RECAPTCHA ? <AssistantWithRecaptcha /> : <AssistantWithoutRecaptcha />}
  </AssistantErrorBoundary>
);

export default Assistant;
