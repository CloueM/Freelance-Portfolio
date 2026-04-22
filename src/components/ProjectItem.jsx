import React, { useState } from 'react';
import '../styles/ProjectItem.css';
import { playHoverSound, playSelectSound, playProjectsHoverSound } from '../utils/sound';

const ProjectItem = ({ project }) => {
  const { title, image, liveLink, description } = project;
  const [isRevealed, setIsRevealed] = useState(false);

  const handleInteraction = () => {
    setIsRevealed(!isRevealed);
  };

  const handleMouseEnter = () => {
    setIsRevealed(true);
    playProjectsHoverSound();
  };

  const handleMouseLeave = () => {
    setIsRevealed(false);
  };

  return (
    <div className="project-item">
      <div className="project-header">
        <div className="header-content">
          <h2 className="project-title">{title}</h2>
        </div>
      </div>
      <div className="project-item-container">

        <div className="project-body">
          <div 
            className={`project-image-column ${isRevealed ? 'revealed' : ''}`} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
            onClick={handleInteraction}
          >
            <div className="image-wrapper">
              <img src={image} alt={title} className="project-main-image" />
              <div className="image-overlay"></div>
              
              <div className="finger-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                  <path fill="#1E1E1E" d="M19.3 12.74L13 11.8V7.5c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5V17l-2.75-1.1C6.17 15.47 5 16.26 5 17.42c0 .36.17.71.45.94l4.28 3.42c.18.14.4.22.62.22H20c.55 0 1-.45 1-1v-6.28a2 2 0 0 0-1.7-1.98"/>
                  <path fill="#1E1E1E" d="M11.5 4C13.98 4 16 6.02 16 8.5h2C18 4.92 15.08 2 11.5 2S5 4.92 5 8.5h2C7 6.02 9.02 4 11.5 4"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="project-details-column">
            <div className="details-rows">
              <div className="project-scope-header">
                <h3 className="scope-title">Project Scope</h3>
              </div>

              <div className="description-content">
                <p className="fade-in">
                  {description}
                </p>
              </div>
            </div>

            <div className="project-actions">
              {liveLink && (
                <a href={liveLink} target="_blank" rel="noopener noreferrer" className="action-btn live" onMouseEnter={playHoverSound} onMouseDown={playSelectSound}>
                  View Live Project <span className="arrow">↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
