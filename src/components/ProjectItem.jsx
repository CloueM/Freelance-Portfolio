import React from 'react';
import '../styles/ProjectItem.css';
import { playHoverSound, playSelectSound, playProjectsHoverSound } from '../utils/sound';

const ProjectItem = ({ project }) => {
  const { title, image, liveLink, description } = project;

  return (
    <div className="project-item">
      <div className="project-item-container">
        <div className="project-header">
          <h2 className="project-title">{title}</h2>
          <div className="project-actions">
            {liveLink && (
              <a href={liveLink} target="_blank" rel="noopener noreferrer" className="action-btn live" onMouseEnter={playHoverSound} onMouseDown={playSelectSound}>
                View Live Project <span className="arrow">↗</span>
              </a>
            )}
          </div>
        </div>

        <div className="project-body">
          <div className="project-image-column" onMouseEnter={playProjectsHoverSound} onMouseDown={playProjectsHoverSound}>
            <div className="image-wrapper">
              <img src={image} alt={title} className="project-main-image" />
              <div className="image-overlay"></div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
