import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/FeaturedProjects.css';
import { projectsData } from '../data/projects';
import { playHoverSound, playSelectSound, playProjectsHoverSound } from '../utils/sound';

const FeaturedProjects = () => {
    // Only display featured projects here
    const featuredList = projectsData.filter(project => project.isFeatured);
    const [activeId, setActiveId] = useState(null);

    const handleCardClick = (id) => {
        // Toggle active state for mobile
        if (activeId === id) {
            setActiveId(null);
        } else {
            setActiveId(id);
            playProjectsHoverSound();
        }
    };

    const handleCardKeyDown = (e, id) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick(id);
        }
    };

    return (
        <section id="featured-projects" className="featured-projects-section">
            <div className="featured-header">
                <h2 className="featured-title">Featured Projects</h2>
                <Link to="/projects" className="view-all-btn" onMouseEnter={playHoverSound} onMouseDown={playSelectSound}>
                    View All Projects
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                </Link>
            </div>

            <div className="carousel-container">
                {featuredList.map(project => (
                    <div
                        key={project.id}
                        className={`project-card ${activeId === project.id ? 'active' : ''}`}
                        onClick={() => handleCardClick(project.id)}
                        onKeyDown={(e) => handleCardKeyDown(e, project.id)}
                        onMouseEnter={playProjectsHoverSound}
                        role="button"
                        tabIndex={0}
                        aria-label={`View details for ${project.title}`}
                    >
                        <div className="project-image-wrapper">
                            <img src={project.image} alt={project.title} className="project-image" />
                        </div>

                        <div className="project-overlay">
                            <div className="overlay-content">
                                <h3 className="project-overlay-title">{project.title}</h3>
                                <p className="overlay-description">{project.description}</p>
                                <div className="project-actions">
                                    {project.liveLink && (
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="action-btn live" onClick={(e) => e.stopPropagation()} onMouseEnter={playHoverSound} onMouseDown={playSelectSound}>
                                            View Live <span className="arrow">↗</span>
                                        </a>
                                    )}
                                    {project.githubLink && (
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="action-btn github" title="View Code" onClick={(e) => e.stopPropagation()} onMouseEnter={playHoverSound} onMouseDown={playSelectSound}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="github-icon">
                                                <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/>
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mobile-hand-icon" role="img" aria-label="Tap to view project details">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 2048 2048">
                                <path fill="1E1E1E" d="M1600 896q40 0 75 15t61 41t41 61t15 75v384q0 119-45 224t-124 183t-183 123t-224 46q-144 0-268-55t-226-156l-472-472q-28-28-43-65t-15-76q0-42 16-78t43-64t63-42t78-16q82 0 141 59l107 106V853q-59-28-106-70t-80-95t-52-114t-18-126q0-93 35-174t96-143t142-96T832 0q93 0 174 35t143 96t96 142t35 175q0 93-37 178t-105 149q35 9 63 30t49 52q45-25 94-25q50 0 93 23t69 66q45-25 94-25M512 448q0 75 34 143t94 113V448q0-40 15-75t41-61t61-41t75-15t75 15t61 41t41 61t15 75v256q60-45 94-113t34-143q0-66-25-124t-69-101t-102-69t-124-26t-124 25t-102 69t-69 102t-25 124m1152 640q0-26-19-45t-45-19q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-26 0-45-19t-19-45V448q0-26-19-45t-45-19t-45 19t-19 45v787q0 23-8 42t-23 35t-35 23t-42 9q-22 0-42-8t-37-24l-139-139q-21-21-50-21t-50 21t-22 51q0 29 21 50l472 473q84 84 184 128t219 45q93 0 174-35t142-96t96-142t36-175z" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedProjects;
