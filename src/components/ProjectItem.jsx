import React, { useRef, useEffect, useState } from 'react';
import '../styles/ProjectItem.css';
import { playHoverSound, playSelectSound, playProjectsHoverSound } from '../utils/sound';

const ProjectItem = ({ project, index }) => {
  const { title, year, image, liveLink, description, tags } = project;
  const [isVisible, setIsVisible] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    // General entrance animation observer
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.08 }
    );

    // Active area observer for showing/hiding details
    const detailsObserver = new IntersectionObserver(
      ([entry]) => {
        setIsDetailsVisible(entry.isIntersecting);
      },
      {
        // Triggers when the item is within the middle 60% of the viewport
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.1
      }
    );

    if (itemRef.current) {
      visibilityObserver.observe(itemRef.current);
      detailsObserver.observe(itemRef.current);
    }

    return () => {
      visibilityObserver.disconnect();
      detailsObserver.disconnect();
    };
  }, []);

  const handleMouseEnter = () => {
    setIsRevealed(true);
    playProjectsHoverSound();
  };

  const handleMouseLeave = () => {
    setIsRevealed(false);
  };

  const handleImageClick = () => {
    setIsRevealed((prev) => !prev);
  };

  return (
    <div
      className={`project-item ${isVisible ? 'visible' : ''}`}
      ref={itemRef}
      style={{ transitionDelay: `${(index ?? 0) * 80}ms` }}
    >
      {/* Hover shimmer layer */}
      <div className="project-item-shimmer" aria-hidden="true" />

      <div className={`project-item-inner ${isDetailsVisible ? 'details-visible' : ''}`}>
        {/* Left column: meta + image */}
        <div className="project-col-left">
          <div className="project-meta-row">
            <span className="project-index">0{(index ?? 0) + 1}</span>
            <span className="project-year">{year}</span>
          </div>

          <div
            className={`project-image-wrap ${isRevealed ? 'revealed' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleImageClick}
          >
            <img src={image} alt={title} className="project-img" />
            <div className="project-img-overlay" />

            {/* Tap/hover hint */}
            <div className="project-reveal-hint">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                <path fill="#1E1E1E" d="M19.3 12.74L13 11.8V7.5c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5V17l-2.75-1.1C6.17 15.47 5 16.26 5 17.42c0 .36.17.71.45.94l4.28 3.42c.18.14.4.22.62.22H20c.55 0 1-.45 1-1v-6.28a2 2 0 0 0-1.7-1.98" />
                <path fill="#1E1E1E" d="M11.5 4C13.98 4 16 6.02 16 8.5h2C18 4.92 15.08 2 11.5 2S5 4.92 5 8.5h2C7 6.02 9.02 4 11.5 4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right column: title, description, tags, CTA */}
        <div className="project-col-right">
          <h3 className="project-title">{title}</h3>

          <div className={`project-details-dropdown ${isDetailsVisible ? 'expanded' : ''}`}>
            <div className="project-details-inner">
              <div className="project-scope-label">Project Scope</div>
              <p className="project-description">{description}</p>
            </div>
          </div>

          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-cta"
              onMouseEnter={playHoverSound}
              onMouseDown={playSelectSound}
            >
              View Live Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
