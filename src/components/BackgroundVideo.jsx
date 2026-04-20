import React from 'react';

const BackgroundVideo = ({ overlayClassName = "hero-overlay" }) => {
    return (
        <>
            <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="hero-video-bg"
            >
                <source src="/images/background-live.mp4" type="video/mp4" />
            </video>
            <div className={overlayClassName}></div>
        </>
    );
};

export default BackgroundVideo;
